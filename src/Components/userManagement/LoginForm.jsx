import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";
import "./LoginForm.css";

const LoginForm = ({ onSubmit, loginError }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ username, password });
	};

	return (
		<div className="">
			<div className="">
				<Form onSubmit={handleSubmit} className="login-form">
					<div className="d-flex">
						<div className="flex-grow-1 mx-2">
							<Form.Group controlId="Username">
								<InputField
									type="text"
									placeholder="Username"
									name="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Form.Group>
						</div>
						<div className="flex-grow-1 mx-2">
							<Form.Group controlId="password">
								<InputField
									type="text"
									placeholder="Password"
									name="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
						</div>
					</div>
					{loginError && <ErrorMessage message={loginError} />}
					<div className="m-3 justify-content-center d-flex">
						<Button variant="primary" type="submit">
							Login
						</Button>
					</div>
					<div className="mt-4">
						Don't have an account?{" "}
						<a href="/discover/users/signup" style={{ color: "#630F76" }}>
							Register
						</a>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
