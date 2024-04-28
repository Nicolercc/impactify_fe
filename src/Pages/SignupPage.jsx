import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthData } from "../Provider/AuthProv";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import SignUpForm from "../Components/userManagement/SignUpForm";
import signupImg from "../assets/signup-user.png";

const SignUpPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { API, setUser, setToken } = useContext(AuthData);
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

	const handleSignUp = async (userData) => {
		try {
			const response = await API.post(`${backend}/users/register`, userData);
			console.log("Sign-up response:", response.data);
			const { user, token } = response.data;
			setUser(user);
			setToken(token);
			// Storing token in da localStorage
			localStorage.setItem("token", token);

			const from = location.state?.from || "/";
			navigate(from);
		} catch (error) {
			console.error("Sign-up error:", error);
		}
	};

	return (
		<div
			className=" d-flex justify-content-center align-items-center"
			style={{ height: "80vh", width: "100vw" }}
		>
			<div className="p-4">
				<p className="mx-4">Welcome</p>
				<h2 className="mx-4">Create an account</h2>
				<Row className="justify-content-center align-items-center">
					<Col md={6} lg={4}>
						<div className="text-center mb-4">
							<Image src={signupImg} alt="Sign Up" fluid />
						</div>
					</Col>
					<Col md={6} lg={4}>
						<SignUpForm onSubmit={handleSignUp} />
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default SignUpPage;
