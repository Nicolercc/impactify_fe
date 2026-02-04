import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import {
	IoNewspaper,
	IoCalendar,
	IoHeart,
	IoCheckmarkCircle,
} from "react-icons/io5";
import { MdInfo, MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useAuthDataProvider } from "../../Provider/AuthProv";
import "./HomeNavigationBar.css";

function MainNavigationBar() {
	const { user, logout } = useAuthDataProvider();

	const [getInvolvedExpanded, setGetInvolvedExpanded] = useState(false);
	const [aboutUsExpanded, setAboutUsExpanded] = useState(false);

	const getInvolvedTimeoutRef = useRef(null);
	const aboutUsTimeoutRef = useRef(null);

	// Improved dropdown with delay for better UX
	const handleGetInvolvedMouseEnter = () => {
		if (getInvolvedTimeoutRef.current) {
			clearTimeout(getInvolvedTimeoutRef.current);
		}
		setGetInvolvedExpanded(true);
	};

	const handleGetInvolvedMouseLeave = () => {
		getInvolvedTimeoutRef.current = setTimeout(() => {
			setGetInvolvedExpanded(false);
		}, 200);
	};

	const handleAboutUsMouseEnter = () => {
		if (aboutUsTimeoutRef.current) {
			clearTimeout(aboutUsTimeoutRef.current);
		}
		setAboutUsExpanded(true);
	};

	const handleAboutUsMouseLeave = () => {
		aboutUsTimeoutRef.current = setTimeout(() => {
			setAboutUsExpanded(false);
		}, 200);
	};

	// Cleanup timeouts
	useEffect(() => {
		return () => {
			if (getInvolvedTimeoutRef.current) {
				clearTimeout(getInvolvedTimeoutRef.current);
			}
			if (aboutUsTimeoutRef.current) {
				clearTimeout(aboutUsTimeoutRef.current);
			}
		};
	}, []);

	return (
		<Navbar
			bg="light"
			expand="lg"
			sticky="top"
			className="navbar-shadow navbar-wrapper home-navbar scrolling"
		>
			<Navbar.Toggle
				aria-controls="basic-navbar-nav"
				aria-label="Toggle navigation"
				className="navbar-toggle-custom"
			/>

			<Link to="/search" className="search-link-custom">
				<FaSearch className="search-icon" />
				<span className="search-text">Search</span>
			</Link>

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto nav-left">
					<NavDropdown
						title="Get Involved"
						id="get-involved-dropdown"
						className="nav-dropdown-custom"
						show={getInvolvedExpanded}
						onMouseEnter={handleGetInvolvedMouseEnter}
						onMouseLeave={handleGetInvolvedMouseLeave}
						onFocus={handleGetInvolvedMouseEnter}
						onBlur={handleGetInvolvedMouseLeave}
					>
						<NavDropdown.Item
							href="/discover/news"
							className="dropdown-item-custom"
						>
							<IoNewspaper className="dropdown-icon" />
							<span className="dropdown-text">News</span>
						</NavDropdown.Item>
						<NavDropdown.Item
							href="/discover/events"
							className="dropdown-item-custom"
						>
							<IoCalendar className="dropdown-icon" />
							<span className="dropdown-text">Events</span>
						</NavDropdown.Item>
						<NavDropdown.Item
							href="/discover/donations"
							className="dropdown-item-custom"
						>
							<IoHeart className="dropdown-icon" />
							<span className="dropdown-text">Donations</span>
						</NavDropdown.Item>
						<NavDropdown.Item
							href="/discover/voting"
							className="dropdown-item-custom"
						>
							<MdHowToVote className="dropdown-icon" />
							<span className="dropdown-text">Voting Toolkit</span>
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>

				<Navbar.Brand
					className="navbar-brand-custom"
					href="/"
					aria-label="Impactify Home"
				>
					<Logo />
				</Navbar.Brand>

				<Nav className="ml-auto nav-right">
					<NavDropdown
						title="About us"
						id="about-us-dropdown"
						className="nav-dropdown-custom"
						show={aboutUsExpanded}
						onMouseEnter={handleAboutUsMouseEnter}
						onMouseLeave={handleAboutUsMouseLeave}
						onFocus={handleAboutUsMouseEnter}
						onBlur={handleAboutUsMouseLeave}
					>
						<NavDropdown.Item
							href="/howitworks"
							className="dropdown-item-custom"
						>
							<IoCheckmarkCircle className="dropdown-icon" />
							<span className="dropdown-text">How It Works</span>
						</NavDropdown.Item>
						<NavDropdown.Item href="/aboutus" className="dropdown-item-custom">
							<MdInfo className="dropdown-icon" />
							<span className="dropdown-text">About us</span>
						</NavDropdown.Item>
					</NavDropdown>

					{/* <Nav.Link href="/discover/users/login" className="nav-link-custom sign-in-link">
						Sign In
					</Nav.Link> */}

					<Link to="/discover/create-event">
						<Button variant="primary" className="start-event-btn-custom">
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
							<Nav.Link href="/howitworks" className=" mt-3">
								How It Works
							</Nav.Link>
							<Nav.Link href="/discover/users/login" className="">
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
