import React, { useState, useEffect } from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
	Row,
	Col,
	NavLink,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useAuthDataProvider } from "../../Provider/AuthProv";

function MainNavigationBar() {
	const { user, logout } = useAuthDataProvider();
	const [isResponsive, setIsResponsive] = useState(false);

	const handleLogout = async () => {
		console.log("youve logged out" + token);
		await logout();
	};


	useEffect(() => {
		const handleResize = () => {
			setIsResponsive(window.innerWidth <= 991);
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const regularNavbar = (
		<>
			<Navbar.Toggle
				aria-controls="basic-navbar-nav"
				className="outline-none"
			/>
			<Link to="/search">
				<div className="mx-3">
					<FaSearch className="" style={{ marginRight: "4px" }} />
					Search
				</div>
			</Link>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavDropdown
						title="Get Involved"
						id="basic-nav-dropdown"
						className="mx-3"
					>
						<NavDropdown.Item href="/discover/news">News</NavDropdown.Item>
						<NavDropdown.Item href="/discover/events">Events</NavDropdown.Item>
						<NavDropdown.Item href="/discover/donations">
							Donations
						</NavDropdown.Item>
						<NavDropdown.Item href="/discover/voting">
							Voting Toolkit
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Navbar.Brand
					className="mx-auto display-2"
					style={{ paddingTop: "0", paddingBottom: "0" }}
					href="/"
				>
					<Logo />
				</Navbar.Brand>
				<Nav className="ml-auto">
					<NavDropdown
						title="About us"
						id="basic-nav-dropdown"
						className="mx-3"
					>
						<NavDropdown.Item href="/howitworks" className="">
							How It Works
						</NavDropdown.Item>
						<NavDropdown.Item href="/aboutus" className="">
							About us
						</NavDropdown.Item>
					</NavDropdown>
					{user ? (
						<Nav.Link href="/discover/users/login" className="">
							<div
								onClick={() => handleLogout()}
								style={{
									color: "#630f76",
									borderRadius: "15px",
								}}
							>
								Sign out
							</div>
						</Nav.Link>
					) : (
						<Nav.Link href="/discover/users/login" className="mx-3">
							Sign In
						</Nav.Link>
					)}
					<Link to="/discover/create-event">
						<Button
							variant=""
							className="mx-3 btn rounded-pill start-event-btn"
						>
							Start Event
						</Button>
					</Link>
				</Nav>
			</Navbar.Collapse>
		</>
	);

	const mobileNavbar = (
		<>
			<Navbar.Toggle
				aria-controls="basic-navbar-nav"
				className="outline-none"
			/>
			<Navbar.Brand
				className="mx-auto display-2"
				style={{ paddingTop: "0", paddingBottom: "0" }}
				href="/"
			>
				<Logo />
			</Navbar.Brand>
			<Link to="/search">
				<div className="mx-3">
					<FaSearch className="" style={{ marginRight: "2px" }} />
					Search
				</div>
			</Link>
			<Navbar.Collapse id="basic-navbar-nav">
				<Row className="w-100">
					<Col md={6}>
						<Nav className="ml-auto">
							<Nav.Link href="/howitworks" className="mx-3 mt-3">
								How It Works
							</Nav.Link>
							<Nav.Link href="/discover/users/login" className="mx-3">
								Sign In
							</Nav.Link>
						</Nav>
					</Col>
					<Col md={6}>
						<Nav>
							<Nav.Link href="/discover/news">News</Nav.Link>
							<Nav.Link href="/discover/events">Events</Nav.Link>

							<Nav.Link href="#donations">Donations</Nav.Link>
							<Nav.Link href="/discover/voting">Voting Toolkit</Nav.Link>
						</Nav>
					</Col>
				</Row>
				<Link to="discover/create-event">
					<Button
						variant=""
						className="w-100 m-3 btn rounded-pill start-event-btn"
					>
						Start Event
					</Button>
				</Link>
			</Navbar.Collapse>
		</>
	);

	return (
		<Navbar
			bg="light"
			expand="lg"
			sticky="top"
			className="navbar-shadow scrolling"
		>
			{isResponsive ? mobileNavbar : regularNavbar}
		</Navbar>
	);
}

export default MainNavigationBar;
