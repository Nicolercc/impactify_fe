import React, { useState } from "react";
import Card from "./Card/Card";
import { Col, Row, Button } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import { useNavigate } from "react-router";

function MainContent({ backendEvents }) {
	const navigate = useNavigate();
	const [selectedEvent, setSelectedEvent] = useState({});
	const [startIndex, setStartIndex] = useState(0);
	const eventsPerPage = 4;

	// Ensure backendEvents is always an array
	const safeBackendEvents = Array.isArray(backendEvents) ? backendEvents : [];

	const handleNext = () => {
		setStartIndex((prevIndex) => prevIndex + eventsPerPage);
	};

	const handlePrev = () => {
		setStartIndex((prevIndex) => Math.max(prevIndex - eventsPerPage, 0));
	};

	const handleContentClick = (eventObj) => {
		console.log("you clicked me", eventObj);
		let selected = safeBackendEvents.find(
			(bkdEnvts) => bkdEnvts.event_id === eventObj.event_id
		);
		setSelectedEvent(selected);
		navigate(`/discover/eventdetails/${eventObj.event_id}`, {
			state: { event: selectedEvent },
		});
	};

	return (
		<div className="mt-5" style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
			<div className="m-4">
				<div className="position-relative d-block">
					<div className="d-flex justify-content-between align-items-center m-3 mb-4">
						<div className="fw-bold fs-3">All Events ({safeBackendEvents.length})</div>
					</div>

					{safeBackendEvents.length === 0 ? (
						<Row>
							<Col xs={12} className="text-center p-5">
								<div className="p-4">
									<p className="fs-5 text-muted">
										No events available at the moment. Please check back later.
									</p>
								</div>
							</Col>
						</Row>
					) : (
						<Row style={{ paddingRight: "0px", paddingLeft: "0px" }} className="g-4">
							{safeBackendEvents.map((eventObj, index) => {
								const eventId =
									eventObj.event_id || eventObj.id || eventObj._id || index;
								const title =
									eventObj.event_title ||
									eventObj.title ||
									eventObj.name ||
									"Untitled Event";
								const imageSrc =
									eventObj.event_photo ||
									eventObj.image ||
									eventObj.image_url ||
									eventObj.photo ||
									eventObj.featureImageUrl ||
									eventObj.featured_image_url ||
									eventObj.logo_url ||
									"https://via.placeholder.com/300x200?text=No+Image";
								const text =
									eventObj.event_details ||
									eventObj.details ||
									eventObj.description ||
									eventObj.summary ||
									"";

								return (
									<Col
										key={`${eventId}-desktop-main-${index}`}
									xs={12}
									sm={6}
										md={4}
									lg={3}
										className="mb-4"
								>
									<Card
											title={title}
											imageSrc={imageSrc}
											text={text}
										onClick={() => handleContentClick(eventObj)}
									/>
								</Col>
								);
							})}
					</Row>
					)}
				</div>
			</div>
		</div>
	);
}

export default MainContent;
