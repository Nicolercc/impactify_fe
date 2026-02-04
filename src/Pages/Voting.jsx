import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VoterTools from "../Components/CivicApi/VoterTools";
import CivicInfo from "../Components/CivicApi/CivicInfo";
import "../Components/CivicApi/CivicInfo.css";

const Voting = () => {
	return (
		<main className="civic-layout">
			<Container className="civic-container py-5">
				<Row className="justify-content-center mb-4">
					<Col md={10} lg={8}>
						<header className="civic-hero">
							<h1 className="civic-hero-title">Get ready to vote</h1>
							<p className="civic-hero-subtitle">
								Register, check your status, and see who represents you — all in one
								place, on any device.
							</p>
						</header>
					</Col>
				</Row>

				<VoterTools />
				<CivicInfo />
			</Container>
		</main>
	);
};

export default Voting;


