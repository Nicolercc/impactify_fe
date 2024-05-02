import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

function CarouselComponent({ backendEvents }) {
	const [index, setIndex] = useState(0);
	console.log(backendEvents);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<div className="" style={{ padding: "30px" }}>
			<div className="fw-bold fs-4 my-3 d-flex justify-content-center">
				Most popular events
			</div>
			<div style={{ padding: "10px" }}>
				<Carousel activeIndex={index} onSelect={handleSelect} indicators={true}>
					{backendEvents.map((event, index) => (
						<Carousel.Item key={index}>
							<img
								className="d-block w-100 image-sizing"
								style={{ borderRadius: "20px" }}
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
									borderRadius: "20px",
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
