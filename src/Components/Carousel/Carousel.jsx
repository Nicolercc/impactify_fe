import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";

function CarouselComponent({ backendEvents }) {
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	// Ensure backendEvents is always an array
	const safeBackendEvents = Array.isArray(backendEvents) ? backendEvents : [];

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const handleContentClick = (eventObj) => {
		console.log("you clicked me", eventObj);
		const eventId = eventObj.event_id || eventObj.id || eventObj._id;
		let selected = safeBackendEvents.find(
			(bkdEnvts) =>
				(bkdEnvts.event_id || bkdEnvts.id || bkdEnvts._id) === eventId
		);
		navigate(`/discover/eventdetails/${eventId}`, {
			state: { event: selected || eventObj },
		});
	};

	return (
		<div className="" style={{ padding: "30px" }}>
			<div
				style={{ padding: "10px" }}
				className="d-flex justify-content-center"
			>
				{safeBackendEvents.length > 0 && (
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					interval={null}
					indicators={true}
					className="custom-carousel"
				>
						{safeBackendEvents.map((event, index) => {
							const imageSrc =
								event.event_photo ||
								event.image ||
								event.image_url ||
								event.photo ||
								event.featureImageUrl ||
								event.featured_image_url ||
								event.logo_url ||
								"https://via.placeholder.com/800x400?text=No+Image";
							const title =
								event.event_title ||
								event.title ||
								event.name ||
								"Untitled Event";

							return (
						<Carousel.Item
							key={index}
							onClick={() => handleContentClick(event)}
						>
							<img
								className="d-block  image-sizing"
								style={{ width: "100%", height: "100%" }}
										src={imageSrc}
										alt={title}
							/>
							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									backgroundColor: "rgba(0, 0, 0, 0.5)",
								}}
							></div>
							<Carousel.Caption>
										<h3>{title}</h3>
							</Carousel.Caption>
						</Carousel.Item>
							);
						})}
				</Carousel>
				)}
			</div>
		</div>
	);
}

export default CarouselComponent;
