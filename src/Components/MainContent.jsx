import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import { useNavigate } from "react-router";
import LoadingState from "./LoadingState/LoadingState";
import "./MainContent.css";

function MainContent({ backendEvents }) {
	const navigate = useNavigate();
	const [selectedEvent, setSelectedEvent] = useState({});
	const [startIndex, setStartIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Responsive events per page: 1 on mobile, 4 on desktop
	const eventsPerPage = isMobile ? 1 : 4;

	// Detect mobile screen size
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Ensure backendEvents is always an array to prevent crashes
	const safeBackendEvents = Array.isArray(backendEvents) ? backendEvents : [];

	// Calculate pagination info
	const currentPage = Math.floor(startIndex / eventsPerPage) + 1;
	const totalPages = Math.ceil(safeBackendEvents.length / eventsPerPage);
	const showingFrom = safeBackendEvents.length > 0 ? startIndex + 1 : 0;
	const showingTo = Math.min(
		startIndex + eventsPerPage,
		safeBackendEvents.length,
	);
	const totalEvents = safeBackendEvents.length;

	const handleNext = () => {
		setStartIndex((prevIndex) => {
			const nextIndex = prevIndex + eventsPerPage;
			// On mobile, move one at a time; on desktop, move by 4
			return nextIndex >= safeBackendEvents.length ? prevIndex : nextIndex;
		});
	};

	const handlePrev = () => {
		setStartIndex((prevIndex) => {
			const newIndex = prevIndex - eventsPerPage;
			return Math.max(newIndex, 0);
		});
	};

	const handleContentClick = (eventObj) => {
		console.log("you clicked me", eventObj);
		const eventId = eventObj.event_id || eventObj.id;
		let selected = safeBackendEvents.find(
			(bkdEnvts) => (bkdEnvts.event_id || bkdEnvts.id) === eventId,
		);
		setSelectedEvent(selected || eventObj);
		navigate(`/discover/eventdetails/${eventId}`, {
			state: { event: selected || eventObj },
		});
	};

	return (
		<div className="main-content-container">
			<div className="main-content-wrapper">
				{/* Header Section */}
				<div className="events-header">
					<div className="events-title">
						{
							safeBackendEvents.length > 0
							// ? `Featured Events`
							// : 'Discover Upcoming Events'
						}
					</div>

					{/* Pagination Controls - Always show if there are multiple events */}
					{safeBackendEvents.length > 1 && (
						<div className="pagination-controls">
							{/* Counter */}
							<div className="events-counter">
								<span className="counter-text">
									{isMobile
										? `${showingFrom} of ${totalEvents}`
										: `${showingFrom}-${showingTo} of ${totalEvents}`}
								</span>
							</div>

							{/* Navigation Arrows */}
							<div className="navigation-arrows">
								<button
									className="nav-arrow prev-arrow"
									onClick={handlePrev}
									disabled={startIndex === 0}
									aria-label="Previous events"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M15 18L9 12L15 6"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								<button
									className="nav-arrow next-arrow"
									onClick={handleNext}
									disabled={
										startIndex + eventsPerPage >= safeBackendEvents.length
									}
									aria-label="Next events"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 18L15 12L9 6"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Events Grid */}
				{safeBackendEvents.length === 0 ? (
					<LoadingState variant="inline" size="small" message="Loading events..." />
				) : (
					<div className="events-grid">
						{safeBackendEvents
							.slice(startIndex, startIndex + eventsPerPage)
							.map((eventObj, index) => {
								// Handle field name variations
								const eventId = eventObj.event_id || eventObj.id || index;
								const title =
									eventObj.event_title || eventObj.title || "Untitled Event";
								const imageSrc =
									eventObj.event_photo ||
									eventObj.image ||
									eventObj.image_url ||
									eventObj.logo_url ||
									"https://via.placeholder.com/300x200?text=No+Image";
								const text =
									eventObj.event_details ||
									eventObj.details ||
									eventObj.description ||
									eventObj.summary ||
									"";

								return (
									<div
										key={`${eventId}-main-${index}`}
										className="event-card-wrapper"
									>
										<Card
											title={title}
											imageSrc={imageSrc}
											text={text}
											onClick={() => handleContentClick(eventObj)}
										/>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);
}

export default MainContent;
