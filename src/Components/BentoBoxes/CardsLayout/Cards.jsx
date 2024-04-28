import React from "react";
import "./Cards.css";
import CardComponent from "../../Card/Card";
import { Col, Container, Row } from "react-bootstrap";

function Cards() {
	const donationCards = [
		{
			title: "Donate to Education Fund",
			imageSrc: "education.jpg",
			text: "Help children access quality education.",
		},
		{
			title: "Support Clean Water Initiative",
			imageSrc: "clean-water.jpg",
			text: "Provide clean and safe drinking water to communities in need.",
		},
		{
			title: "Donate to Animal Welfare",
			imageSrc: "animal-welfare.jpg",
			text: "Support animal shelters and rescue efforts.",
		},
		{
			title: "Help Fight Hunger",
			imageSrc: "fight-hunger.jpg",
			text: "Provide meals to those facing food insecurity.",
		},
		{
			title: "Support Healthcare Initiatives",
			imageSrc: "healthcare.jpg",
			text: "Provide medical care and supplies to those in need.",
		},
	];

	return (
		<Container fluid style={{}}>
			<Row
				className="justify-content-center align-items-center mt-3"
				style={{}}
			>
				<Col xs={10} md={5} lg={4} className="">
					<div className="full-size-square">card</div>
				</Col>
				<Col xs={10} md={2} lg={2}>
					<Row>
						<div className="little-square mx-"> card</div>
					</Row>
					<Row>
						<div className="little-square"> card</div>
					</Row>
				</Col>
				<Col xs={10} md={2} lg={2} className="mx-3">
					<Row>
						<div className="little-square"> card</div>
					</Row>
					<Row>
						<div className="little-square"> card</div>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Cards;
