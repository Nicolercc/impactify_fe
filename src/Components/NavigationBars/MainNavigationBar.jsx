import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button, NavLink } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import {
	IoNewspaper,
	IoCalendar,
	IoHeart,
} from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useAuthDataProvider } from "../../Provider/AuthProv";
import "./HomeNavigationBar.css";

function MainNavigationBar() {
	const { user, logout } = useAuthDataProvider();

	const [getInvolvedExpanded, setGetInvolvedExpanded] = useState(false);

	const getInvolvedTimeoutRef = useRef(null);

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

	// Cleanup timeouts
	useEffect(() => {
		return () => {
			if (getInvolvedTimeoutRef.current) {
				clearTimeout(getInvolvedTimeoutRef.current);
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
					
						
							
					
						<NavLink href="/howitworks" className="">
						
							<span className="dropdown-text">About us</span>
						
					</NavLink>

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
		</Navbar>
	);
}

export default MainNavigationBar;
