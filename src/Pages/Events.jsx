import React, { useMemo, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Card from "../Components/Card/Card";
import CardNew from "../Components/Card/CardNew";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import MainContent from "../Components/MainContent";
import CategoriesSection from "../Components/CategoriesSection/CategoriesSection";

const Events = ({ backendEvents }) => {
	const [clickedEvent, setClickedEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [eventsData, setEventsData] = useState([]);
	const [mobilizeEvents, setMobilizeEvents] = useState([]);
	const [imageEvents, setImageEvents] = useState(null);
	// const [fetchedEvent, setFetchedEvent] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [allEvents, setAllEvents] = useState([]);
	const navigate = useNavigate();

	const backend = "http://localhost:4000";

	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			let fetchEventsData = [];
			let fetchedImageEvents = [];
			try {
				const resposeBackend = await axios.get(`${backend}/events`);
				console.log("Events.jsx - Full API Response:", resposeBackend.data);
				console.log(
					"Events.jsx - response.data type:",
					typeof resposeBackend.data,
				);
				console.log(
					"Events.jsx - response.data.data:",
					resposeBackend.data?.data,
				);
				console.log(
					"Events.jsx - response.data.data type:",
					typeof resposeBackend.data?.data,
				);
				console.log(
					"Events.jsx - response.data.data keys:",
					resposeBackend.data?.data
						? Object.keys(resposeBackend.data.data)
						: "N/A",
				);

				// Try different response structures
				let events = null;
				if (Array.isArray(resposeBackend.data?.data)) {
					// Structure: {data: [...]}
					events = resposeBackend.data.data;
					console.log("Events.jsx - Found array directly in data.data");
				} else if (Array.isArray(resposeBackend.data?.data?.data)) {
					// Structure: {data: {data: [...]}}
					events = resposeBackend.data.data.data;
					console.log("Events.jsx - Found array in data.data.data");
				} else if (Array.isArray(resposeBackend.data?.data?.events)) {
					// Structure: {data: {events: [...]}}
					events = resposeBackend.data.data.events;
					console.log("Events.jsx - Found array in data.data.events");
				} else if (Array.isArray(resposeBackend.data)) {
					// Structure: [...]
					events = resposeBackend.data;
					console.log("Events.jsx - Found array directly in data");
				} else {
					// If data is an object, try to find an array property
					const dataObj = resposeBackend.data?.data || resposeBackend.data;
					console.log("Events.jsx - Searching in dataObj:", dataObj);
					if (
						dataObj &&
						typeof dataObj === "object" &&
						!Array.isArray(dataObj)
					) {
						// Look for any array property in the object
						for (const key in dataObj) {
							console.log(
								`Events.jsx - Checking key "${key}":`,
								dataObj[key],
								"isArray:",
								Array.isArray(dataObj[key]),
							);
							if (Array.isArray(dataObj[key])) {
								events = dataObj[key];
								console.log(
									`Events.jsx - Found array in property "${key}":`,
									events,
									"Length:",
									events.length,
								);
								break;
							}
						}
					}
				}

				fetchEventsData = Array.isArray(events) ? events : [];
				console.log("Events.jsx - Final processed events:", fetchEventsData);
				console.log("Events.jsx - Final events count:", fetchEventsData.length);
				if (fetchEventsData.length > 0) {
					console.log("Events.jsx - First event sample:", fetchEventsData[0]);
				}
				setEventsData(fetchEventsData);
			} catch (error) {
				console.error("Error Fetching Backend Events:", error);
				setEventsData([]); // Set to empty array on error
			}
			try {
				const responseMoblize = await axios.get(
					"https://api.mobilize.us/v1/events",
					{
						params: {
							location: "New York",
						},
					},
				);

				const events = responseMoblize.data.data;
				fetchedImageEvents = events
					.filter((event) => event.featured_image_url)
					.map(
						({
							id,
							title,
							sponsor: { logo_url, created_date: sponsorCreatedDate } = {},
							summary,
							description,
							feature_image_url,
						}) => ({
							id,
							title,
							logo_url,
							sponsorCreatedDate,
							summary,
							details: description,
							featureImageUrl: feature_image_url,
							location: false,
						}),
					);
				setMobilizeEvents(events);
				setImageEvents(fetchedImageEvents);
			} catch (error) {
				console.error("Error fetching Mobilze events", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, []);
	console.log(imageEvents);

	useEffect(() => {
		// Ensure eventsData is always an array before spreading
		const safeEventsData = Array.isArray(eventsData) ? eventsData : [];
		setAllEvents([...safeEventsData]);
	}, [eventsData]);

	const handleCardClick = (eventObj) => {
		const eventId = eventObj?.event_id || eventObj?.id || eventObj?._id;
		if (!eventId) return;

		// Prefer navigating with the object we already have (more reliable than re-finding).
		setClickedEvent(eventObj);
		navigate(`/discover/eventdetails/${eventId}`, {
			state: { event: eventObj },
		});
		// navigate('/discover/test')
	};

	const handleImageLoad = () => {
		setLoading(false);
	};

	const filteredEvents = useMemo(() => {
		const list = Array.isArray(allEvents) ? allEvents : [];
		if (!selectedCategory || selectedCategory === "all") return list;

		return list.filter((event) => {
			const raw =
				event?.event_keywords ??
				event?.event_keyword ??
				event?.event_keywords ??
				[];
			const keywords = Array.isArray(raw)
				? raw
				: typeof raw === "string"
					? raw.split(",").map((s) => s.trim()).filter(Boolean)
					: [];

			return keywords
				.map((k) => String(k).toLowerCase())
				.includes(String(selectedCategory).toLowerCase());
		});
	}, [allEvents, selectedCategory]);

	return (
		<div className="" style={{ marginLeft: "5%", marginRight: "5%" }}>
			{loading ? (
				<div className="loader-wrapper">
					<div className="loader"></div>
				</div>
			) : (
				<Col>
					<Row className="my-4 pb-4">
						<CategoriesSection
							value={selectedCategory}
							onSelectCategory={setSelectedCategory}
							title="Explore events by category"
							subtitle="Tap a category to instantly filter the list."
						/>
					</Row>
					<Row className="d-flex justify-content-center">
						{filteredEvents.map((eventObj, index) => (
							<Col
								key={`${eventObj.id || index + "A"}-events-${index}` || index}
								sm={6}
								md={3}
								className="pb-3"
							>
								<CardNew
									className="border-0"
									cardObj={eventObj}
									tag={"Event"}
									cardClick={() => handleCardClick(eventObj)}
								/>
							</Col>
						))}
					</Row>
				</Col>
			)}
		</div>
	);
};
export default Events;
