import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

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

	// const navigateCategories = (category) => {
	//     console.log('Category pressed:', category);
	//     switch (category) {
	//         case 'Local':
	// 			console.log("you clicked me")
	//             return navigate('/discover/events');
	//         case 'Coming Up':
	//             return navigate('/');
	//         case 'Global Issues':
	//             return navigate('/discover/news');
	//         case 'Politics':
	//             return navigate('/');
	//         case 'Community':
	//             return navigate('/discover/events');
	//         case 'Donation':
	//             return navigate('/discover/donations');
	//         case 'All':
	//             return navigate('/');
	//         default:
	//             console.log('Unknown category:', category);

	//     }
	// };

	const handleClick = (category) => {
		console.log("HERE I AM");
		onSelectCategory(category);
		navigateCategories(category);
	};

	const testClick = (category) => {
		console.log("ME" + category);
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
								to={"discover/events"}
								key={"Popular-1"}
								className={`mx-3 categories-container `}
							>
								<IoLocationOutline
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Local</div>
							</div>
						</Row>
						<Row>
							<div
								key={"Popular-2"}
								className={`mx-3 ${
									selectedCategory === "Coming Up" ? "selected" : ""
								}`}
								// onClick={() => handleClick("Coming Up")}
							>
								<IoCalendarOutline
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Coming up</div>
							</div>
						</Row>
						<Row>
							<div
								to={"discover/news"}
								key={"Popular-3"}
								className={`mx-3 ${
									selectedCategory === "Global Issues" ? "selected" : ""
								}`}
								// onClick={() => handleClick("Global Issues")}
							>
								<GiWorld style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Global</div>
							</div>
						</Row>
						<Row>
							<div
								key={"Popular-4"}
								className={`mx-3 ${
									selectedCategory === "Politics" ? "selected" : ""
								}`}
								// onClick={() => handleClick("Politics")}
							>
								<MdOutlinePolicy
									style={{ fontSize: "44px", color: "#630f76" }}
								/>
								<div className="fs-6 fw-semibold">Politics</div>
							</div>
						</Row>
						<Row>
							<div
								key={"Popular-5"}
								className={`mx-3 ${
									selectedCategory === "Community" ? "selected" : ""
								}`}
								// onClick={() => handleClick("Community")}
							>
								<FaPeopleGroup style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Community</div>
							</div>
						</Row>
						<Row>
							<Link
								to={"discover/donations"}
								key={"Popular-6"}
								className={`mx-3 ${
									selectedCategory === "Donation" ? "selected" : ""
								}`}
								// onClick={() => handleClick("Donation")}
							>
								<BiDonateHeart style={{ fontSize: "44px", color: "#630f76" }} />
								<div className="fs-6 fw-semibold">Donation</div>
							</Link>
						</Row>
						<Row>
							<div
								key={"Popular-7"}
								className={`mx-3 ${
									selectedCategory === "All" ? "selected" : ""
								}`}
								// onClick={() => handleClick("All")}
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
