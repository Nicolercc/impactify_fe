import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";

function CarouselComponent({ backendEvents }) {
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const handleContentClick = (eventObj) => {
		console.log("you clicked me", eventObj);
		let selected = backendEvents.find(
			(bkdEnvts) => bkdEnvts.event_id === eventObj.event_id
		);
		navigate(`/discover/eventdetails/${eventObj.event_id}`, {
			state: { event: selected },
		});
	};

	return (
		<div className="" style={{ padding: "30px" }}>
			<div
				style={{ padding: "10px" }}
				className="d-flex justify-content-center"
			>
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					interval={null}
					indicators={true}
					className="custom-carousel"
				>
					{backendEvents.map((event, index) => (
						<Carousel.Item
							key={index}
							onClick={() => handleContentClick(event)}
						>
							<img
								className="d-block  image-sizing"
								style={{ width: "100%", height: "100%" }}
								src={event.event_photo}
								alt={event.event_title}
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
								<h3>{event.event_title}</h3>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
}

export default CarouselComponent;
