import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

function CarouselComponent({ backendEvents }) {
	const [index, setIndex] = useState(0);
	console.log(backendEvents);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const data = [
		{
			src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
			title: "March to DC: Rally for Change - Join Sarah's Movement!",
		},
		{
			src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
			title: "Community Cleanup: Let's Make Our Neighborhood Shine ",
		},
		{
			src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
			title: "Global Solidarity Summit: Uniting for a Fairer, More Just World!",
		},
	];

	return (
		<div className="" style={{ padding: "40px" }}>
			<div className="fw-bold fs-4 my-3 d-flex justify-content-center">
				Most popular events
			</div>
			<div style={{ padding: "10px" }}>
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					indicators={false}
				>
					{backendEvents.map((event, index) => (
						<Carousel.Item key={index}>
							<img
								className="d-block w-100 image-sizing"
								style={{ borderRadius: "20px" }}
								src={event.event_photo}
								alt={event.event_title}
							/>
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
