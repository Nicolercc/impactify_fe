import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventForm from "../Components/Forms/EventForm";
import User_loginMod from "../Components/UserModals/User_loginMod";
import { useAuthDataProvider } from "../Provider/AuthProv";
import createImg from "../assets/createImg.png";

function CreateEventPage() {
	
	const { isAuthenticated, user, token } = useAuthDataProvider() 
	const [showLogin, setShowLogin] = useState(!isAuthenticated);
	// const { user, token } = useContext(AuthData);

	const handleClose = () => setShowLogin(false);
	console.log(user, token);

	return (
		<>
			{showLogin && <User_loginMod show={showLogin} onHide={handleClose} />}
			{!showLogin && (
				<div
					className=" d-flex justify-content-center my-5"
					style={{ paddingRight: "5%", paddingLeft: "5%" }}
				>
					<Row>
						<div
							className="d-flex justify-content-center fs-2 mb-3"
							style={{ fontFamily: "serif" }}
						>
							Create an event and grow your community
						</div>
						<Col sm={10} md={5} lg={6}>
							<img
								src={createImg}
								alt="Create Image"
								style={{ height: "70%", width: "100%" }}
							/>
						</Col>
						<Col sm={10} md={7} lg={6}>
							<EventForm user={user} />
						</Col>
					</Row>
				</div>
			)}
		</>
	);
}

export default CreateEventPage;
