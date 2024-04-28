import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./DonationsLayout.css";
import UkraineImg from "../../assets/nowar1.jpg";
import ClimateImg from "../../assets/vote.svg";
import DonateCode from "../../assets/DonateEvent1.png";
import FactsImg from "../../assets/newfacts.svg";
import { FaArrowRight } from "react-icons/fa";
import ProofHero from "../SocialProof/ProofHero";
import Play from "../../assets/play.svg";
import nowar from "../../assets/nowar.svg";

function DonationsLayout({ backendEvents }) {
	const navigate = useNavigate();
	// console.log("donationeevents", backendEvents);
	const ukraineEvent = backendEvents[7];
	const handleDonationNavigate = () => {
		navigate("discover/donate");
	};
	const handleInfoNavigate = () => {
		navigate("/howitworks");
	};

	const handleFundraiseNavigate = () => {
		navigate("/discover/facts");
	};

	return (
		<Container
			fluid
			style={{
				display: "flex",
				flexDirection: "column",
				rowGap: "10px",
				marginTop: "0px",
				width: "80%",
			}}
			className=""
		>
			{/* <div className="fw-semibold  d-flex justify-content-center fs-2 my-2 mx-4">
				Make a positive impact in your preferred way
			</div> */}
			<Row xs={1} md={12} lg={8} className="">
				<Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
					<div className="item ">
						<div className="top-box-grid">
							<div className="left-grid">
								<img
									src={ClimateImg}
									alt="Ukraine Image"
									className="top-image"
								/>
							</div>
							<div className="right-grid my-4">
								<div
									className=" fs-3 fw-bold my-3"
									style={{ display: "flex", justifyContent: "center" }}
								>
									Voting Information
								</div>
								<div className="body my-2 ">
									At Impactify, we champion voting as a key tool for change.
									Whether you need to register to vote or already registered and
									seeking to connect with local officials, we've got the
									resources to help you make an impact.
								</div>

								<div className="py-2" style={{ paddingLeft: "50px" }}>
									<span
										className=" donate-btn "
										onClick={() => {
											navigate("/discover/voting");
										}}
									>
										Learn more <FaArrowRight className="mx-3 " />
									</span>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<Row
				style={{
					display: "flex",
					columnGap: "10px",
				}}
			>
				<Col
					xs={12}
					md={4}
					lg={4}
					className=""
					style={{
						paddingLeft: "0px",
						paddingRight: "0px",
						display: "flex",
						width: "calc(33.33333333% - 7px) ",
					}}
				>
					<div className="item mid-right item-small ">
						<div
							className="top-half"
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<img
								src={nowar}
								alt="Climate Image"
								className="climate-image "
								style={{ minHeight: "170px", paddingTop: "15px" }}
							/>
						</div>
						<div className="bottom-half">
							<div
								className="fw-bold title fs-4  d-flex justify-content-center  mx-2 "
								style={{ paddingTop: "5px" }}
							>
								Crisis in Ukraine
							</div>
							<div className="mx-2 d-flex justify-content-center ">
								Learn more about the crisis in Ukraine
							</div>

							<span
								className="donate-btn mt-2"
								onClick={() => navigate("discover/donations")}
							>
								Donate now <FaArrowRight className="mx-3 " />
							</span>
						</div>
					</div>
				</Col>
				<Col
					s={12}
					md={4}
					lg={4}
					className=""
					style={{
						paddingLeft: "0px",
						paddingRight: "0px",
						display: "flex",
						width: "calc(33.33333333% - 7px) ",
					}}
				>
					<div className="item mid-left  item-small">
						<div className="top top-half d-flex justify-content-center ">
							<img src={FactsImg} alt="factsImg" className="climate-image " />
						</div>
						<div className="bottom-half">
							<div className="d-flex justify-content-center ">
								<div className="fs-4 fw-bold title pt-2">Fundraising FAQs</div>
							</div>
							<div className=" d-flex justify-content-center ">
								Why should we care and participate?
							</div>

							<span
								className=" donate-btn mt-1"
								onClick={handleFundraiseNavigate}
							>
								Learn more <FaArrowRight className="mx-3" />
							</span>
						</div>
					</div>
				</Col>
				<Col
					s={12}
					md={4}
					lg={4}
					className=""
					style={{
						paddingLeft: "0px",
						paddingRight: "0px",
						display: "flex",
						width: "calc(33.33333333% - 7px) ",
					}}
				>
					<div className="item item-small ">
						<div
							className="top-half"
							style={{ display: "flex", justifyContent: "center" }}
						>
							<img src={Play} alt="Climate Image" className="climate-image" />
						</div>
						<div className="bottom-half ">
							<div className="d-flex justify-content-center m-1">
								<div className=" fw-bold  fs-4 ">How Impactify works</div>
							</div>
							<div className="d-flex justify-content-center"></div>
							<div className="mx-2 ">
								Watch a video to learn more about our purpose
							</div>

							<span
								className=" donate-btn d-flex justify-content-center mt-2"
								onClick={handleInfoNavigate}
							>
								Play <FaArrowRight className="mx-3" />
							</span>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default DonationsLayout;
