import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useAuthDataProvider } from "../../Provider/AuthProv";
function MainNavigationBar({ scrolling = false }) {
	// const history = useHistory(); // hook to access the history instance
	const { user, logout } = useAuthDataProvider();

	const [getInvolvedExpanded, setGetInvolvedExpanded] = useState(false);
	const [aboutUsExpanded, setAboutUsExpanded] = useState(false);

	const handleLogout = async () => {
		console.log("youve logged out" + token);
		await logout(); // Call the logout function
		// history.push('/discover/users/login')
	};

	const handleGetInvolvedMouseEnter = () => {
		setGetInvolvedExpanded(true);
	};

	const handleGetInvolvedMouseLeave = () => {
		setGetInvolvedExpanded(false);
	};

	const handleAboutUsMouseEnter = () => {
		setAboutUsExpanded(true);
	};

	const handleAboutUsMouseLeave = () => {
		setAboutUsExpanded(false);
	};

	return (
		<Navbar
			bg="light"
			expand="lg"
			sticky="top"
			className={`navbar-shadow navbar-wrapper ${
				scrolling ? "scrolling" : "not-scrolling"
			}`}
			style={{ width: scrolling ? "100%" : "60rem" }}
		>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />

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
						id="get-involved-dropdown"
						className="mx-3"
						show={getInvolvedExpanded}
						onMouseEnter={handleGetInvolvedMouseEnter}
						onMouseLeave={handleGetInvolvedMouseLeave}
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
					className="mx-auto"
					style={{ paddingTop: "0", paddingBottom: "0" }}
					href="/"
				>
					<Logo />
				</Navbar.Brand>

				<Nav className="ml-auto">
					<NavDropdown
						title="About us"
						id="about-us-dropdown"
						className="mx-3"
						show={aboutUsExpanded}
						onMouseEnter={handleAboutUsMouseEnter}
						onMouseLeave={handleAboutUsMouseLeave}
					>
						<NavDropdown.Item href="/howitworks" className="">
							How It Works
						</NavDropdown.Item>
						<NavDropdown.Item href="/aboutus" className="">
							About us
						</NavDropdown.Item>
					</NavDropdown>
					{!user ? (
						<Nav.Link href="/discover/users/login" className="">
							<div
								onClick={handleLogout}
								style={{
									// backgroundColor: "#BC9EC1",
									// borderColor: "#4E2855",
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
					<Button
						variant=""
						href="/discover/create-event"
						className="mx-3  rounded-pill start-event-btn"
					>
						Start Event
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavigationBar;

/* <Nav.Link href="/discover/users/login" className="mx-3">
						Sign In
					</Nav.Link> */
