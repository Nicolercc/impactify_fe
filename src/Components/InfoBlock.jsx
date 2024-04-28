import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { GiWorld, GiVote } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { BsFillSearchHeartFill } from "react-icons/bs";

import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

function InfoBlock() {
	return (
		<div className=" ">
			<Col className="bg-light  pb-5">
				<Row className="d-flex justify-content-center">
					<div
						className="p-5 fw-bold fs-2 d-flex justify-content-center"
						style={{ color: "#630f76" }}
					>
						ALL THE TOOLS YOU NEED TO GROW A COMMUNITY & GET INVOLVED
					</div>
				</Row>

				<Row className="d-flex justify-content-center pb-3">
					<Col sm={9} xs={10} className="text-center">
						<div className="categories-container d-flex justify-content-center">
							<div className="category-item mx-3">
								<Link
									to="/discover/news"
									className="d-block text-decoration-none"
								>
									<IoNewspaper style={{ fontSize: "5vh", color: "#9973a0" }} />
									<div className="header-and-link hover-underline">News</div>
									<div>
										Read about the latest events happening around the world
									</div>
								</Link>
							</div>
							<div className="category-item mx-3">
								<Link
									to="/discover/create-event"
									className="d-block text-decoration-none"
								>
									<MdOutlineEventAvailable
										style={{ fontSize: "5vh", color: "#9973a0" }}
									/>
									<div className="header-and-link">Create</div>
									<div>
										Attract those with the same interest as you and start your
										own community
									</div>
								</Link>
							</div>
							<div className="category-item mx-3">
								<Link
									to="/discover/events"
									className="d-block text-decoration-none"
								>
									<FaPersonCircleCheck
										style={{ fontSize: "5vh", color: "#9973a0" }}
									/>
									<div className="header-and-link">Attend</div>
									<div>Meet like-minded individuals and stand for a cause</div>
								</Link>
							</div>
							<div className="category-item mx-3">
								<Link
									to="/discover/donations"
									className="d-block text-decoration-none"
								>
									<BiDonateHeart
										style={{ fontSize: "5vh", color: "#9973a0" }}
									/>
									<div className="header-and-link">Donate</div>
									<div>Help causes you resonate with</div>
								</Link>
							</div>
							<div className="category-item mx-3">
								<Link to="/search" className="d-block text-decoration-none">
									<BsFillSearchHeartFill
										style={{ fontSize: "5vh", color: "#9973a0" }}
									/>
									<div className="header-and-link">Find</div>
									<div>Search for information or ways to get active</div>
								</Link>
							</div>
							<div className="category-item mx-3">
								<Link
									to="/discover/voting"
									className="d-block text-decoration-none"
								>
									<GiVote style={{ fontSize: "5vh", color: "#9973a0" }} />
									<div className="header-and-link">Vote</div>
									<div>Everything you need for this upcoming voting season</div>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</div>
	);
}

export default InfoBlock;
