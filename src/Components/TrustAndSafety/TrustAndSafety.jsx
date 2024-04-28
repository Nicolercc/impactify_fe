/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./TrustAndSafety.css";
import useScrollPosition from "/src/Hooks/ScrollPositionProvider";

function TrustAndSafety() {
	// const scrolling = useScrollPosition();

	return (
		<div style={{}} className=" my-4  ts-container">
			<div className="trust-content ">
				<span className="title fw-bold fs-3">
					Impactify is a trusted online fundraising for small scale events.
				</span>
				<span className="body  mb-3 d-block fs-4">
					Through robust security features and transparent policies, we're
					dedicated to ensuring your safety while empowering you to make a
					difference in the world.
				</span>
			</div>
		</div>
	);
}

export default TrustAndSafety;
