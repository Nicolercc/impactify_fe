import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiWorld } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlinePolicy, MdAllInbox } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import "./Categories.css";

function CategoriesSection({ onSelectCategory }) {
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const handleClick = (category) => {
		onSelectCategory(category);

		switch (category) {
			case "Local":
				navigate("/discover/events");
				break;
			case "Coming Up":
				navigate("/");
				break;
			case "Global Issues":
				navigate("/discover/news");
				break;
			case "Politics":
				navigate("/");
				break;
			case "Community":
				navigate("/discover/events");
				break;
			case "Donation":
				navigate("/discover/donations");
				break;
			case "All":
				navigate("/");
				break;
			default:
				console.log("Unknown category:", category);
		}
	};

	return (
		<div className="">
			<Row className=" d-flex justify-content-center">
				<div className="py-4 mb-3 fs-3 d-flex justify-content-center ">
					Explore what's popular
				</div>

				<Col sm={10} xs={7} className="text-center">
					<div className="categories-container d-flex justify-content-center">
						<Row>
							<div
								className={`mx-3 categories-container ${
									selectedCategory === "Local" ? "selected" : ""
								}`}
								onClick={() => handleClick("Local")}
							>
								<IoLocationOutline
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Local</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "Coming Up" ? "selected" : ""
								}`}
								onClick={() => handleClick("Coming Up")}
							>
								<IoCalendarOutline
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Coming up</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "Global Issues" ? "selected" : ""
								}`}
								onClick={() => handleClick("Global Issues")}
							>
								<GiWorld style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Global</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "Politics" ? "selected" : ""
								}`}
								onClick={() => handleClick("Politics")}
							>
								<MdOutlinePolicy
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Politics</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "Community" ? "selected" : ""
								}`}
								onClick={() => handleClick("Community")}
							>
								<FaPeopleGroup style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Community</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "Donation" ? "selected" : ""
								}`}
								onClick={() => handleClick("Donation")}
							>
								<BiDonateHeart style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Donation</div>
							</div>
						</Row>
						<Row>
							<div
								className={`mx-3 ${
									selectedCategory === "All" ? "selected" : ""
								}`}
								onClick={() => handleClick("All")}
							>
								<MdAllInbox style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">All</div>
							</div>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default CategoriesSection;
