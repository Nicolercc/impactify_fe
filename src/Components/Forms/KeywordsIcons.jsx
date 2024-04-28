import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { VscLaw } from "react-icons/vsc";
import { MdOutlineVolunteerActivism, MdSocialDistance } from "react-icons/md";
import { IoMegaphone } from "react-icons/io5";
import { RiGovernmentFill, RiCommunityLine } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";
import { FaEnvira, FaHandsHoldingChild } from "react-icons/fa6";
import { IoMdGlobe } from "react-icons/io";
import "./Keywords.css";

function KeywordsIcons() {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleCategoryClick = (category) => {
		if (selectedCategories.includes(category)) {
			setSelectedCategories(
				selectedCategories.filter((item) => item !== category)
			);
		} else {
			setSelectedCategories([...selectedCategories, category]);
		}
	};

	const isCategorySelected = (category) =>
		selectedCategories.includes(category);

	const getColumnClass = (category) => {
		return isCategorySelected(category) ? "selected-column" : "";
	};

	return (
		<div
			style={{
				height: "40vh",
				width: "100%",
				// borderRadius: "15px",
				marginBottom: "30px",
				marginTop: "30px",
				color: "#630f76",
			}}
			className="bg-light rounded"
		>
			<div
				className="d-flex justify-content-center my-4 fs-4 pt-3"
				style={{ fontFamily: "sans-serif" }}
			>
				Select type of event
			</div>
			<Col className="" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
				<Row
					style={{
						height: "16vh",
						marginTop: "10px",
					}}
				>
					<Col
						className={"p-2 text-center " + getColumnClass("Global Issues")}
						onClick={() => handleCategoryClick("Global Issues")}
					>
						<IoMdGlobe className="display-4 mb-2" />
						<div>Global Issues</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Advocacy")}
						onClick={() => handleCategoryClick("Advocacy")}
					>
						<div>
							<IoMegaphone className="display-4 mb-2" />
							<div>Advocacy</div>
						</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Political")}
						onClick={() => handleCategoryClick("Political")}
					>
						<VscLaw className="display-4 mb-2" />
						<div>Political</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Civil rights")}
						onClick={() => handleCategoryClick("Civil rights")}
					>
						<RiGovernmentFill style={{ fontSize: "44px" }} className="m-2" />
						<div>Civil rights</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Racial Justice")}
						onClick={() => handleCategoryClick("Racial Justice")}
					>
						<MdOutlineVolunteerActivism
							style={{ fontSize: "44px" }}
							className="m-2"
						/>
						<div>Racial Justice</div>
					</Col>
				</Row>
				<Row style={{ height: "16vh" }}>
					<Col
						className={"p-2 text-center " + getColumnClass("Environment")}
						onClick={() => handleCategoryClick("Environment")}
					>
						<FaEnvira style={{ fontSize: "44px" }} className="m-2" />
						<div>Environment</div>
					</Col>

					<Col
						className={"p-2 text-center " + getColumnClass("Equality")}
						onClick={() => handleCategoryClick("Equality")}
					>
						<TbHeartHandshake style={{ fontSize: "44px" }} className="my-2" />
						<div>Equality</div>
					</Col>
					<Col
						className={"p-2 text-center  " + getColumnClass("Human rights")}
						onClick={() => handleCategoryClick("Human rights")}
						style={{
							textAlign: "center",
						}}
					>
						<FaHandsHoldingChild
							style={{
								fontSize: "44px",
							}}
							className="m-2 "
						/>
						<div>Human rights</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Community")}
						onClick={() => handleCategoryClick("Community")}
					>
						<RiCommunityLine style={{ fontSize: "44px" }} className="m-2" />
						<div>Community</div>
					</Col>
					<Col
						className={"p-2 text-center " + getColumnClass("Social Justice")}
						onClick={() => handleCategoryClick("Social Justice")}
					>
						<MdSocialDistance style={{ fontSize: "44px" }} className="m-2" />
						<div>Social Justice</div>
					</Col>
				</Row>
			</Col>
		</div>
	);
}

export default KeywordsIcons;
