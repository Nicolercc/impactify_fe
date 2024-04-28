import React, { useContext, useState } from "react";
import { AuthData } from "../Provider/AuthProv";
import LoginForm from "../Components/userManagement/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import loginbg from "../assets/loginshort.png";
import signupImg from "../assets/welcome.png";
import "./LoginPage.css";

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation(null);

	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const { API, setUser, setToken } = useContext(AuthData);
	const [loginError, setLoginError] = useState("");

	const handleLogin = async (userData) => {
		try {
			const response = await API.post(`${backend}/users/login`, userData);
			console.log("Login response:", response.data);

			const { user, token } = response.data;
			console.log(user);
			setUser(user);
			setToken(token);
			localStorage.setItem("token", token);
			setLoginError("");

			const from = location.state?.from || "/";
			navigate(from);
		} catch (error) {
			setLoginError(
				"Failed to log in. Please check your username and password."
			);
			console.error("Login error:", error);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{
				height: "100vh",
				width: "100vw",
				// border: "solid 2px",
			}}
		>
			<div className="p-4">
				<Row
					className="justify-content-center align-items-center"
					style={{
						height: "60vh",
						width: "100vw",
						// border: "solid 2px",
					}}
				>
					<Col md={6} lg={4}>
						<div className="text-center mb-4">
							<Image src={signupImg} alt="Sign Up" fluid />
						</div>
					</Col>
					<Col md={6} lg={4}>
						<div
							className="fs-4
						 d-flex justify-content-center
						 m-4
						 "
						>
							{" "}
							Sign into Impactify
						</div>
						<LoginForm onSubmit={handleLogin} loginError={loginError} />
					</Col>
				</Row>
				<Row>
					<div
						style={{
							height: "40vh",
							width: "100vw",
							// border: "solid 2px",
							backgroundImage: `url(${loginbg})`,
						}}
					></div>
				</Row>
			</div>
		</div>
	);
};

export default LoginPage;
