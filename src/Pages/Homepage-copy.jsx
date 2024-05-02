import React, { useEffect, useRef, useState, useContext } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import HeroImage from "../assets/hero2.webp";
import MainNavigationBar from "../Components/NavigationBars/HomeNavigationBar";
import useScrollPosition from "../Hooks/ScrollPositionProvider";
import MobileNavigation from "../Components/NavigationBars/MainNavigationBar";
import DonationsLayout from "../Components/BentoBoxes/DonationsLayout";
import Footer from "../Components/Footer/Footer";
import AllEventsBlock from "../Components/AllEventsBlock/AllEventsBlock";
import InfoBlock from "../Components/InfoBlock";
import Voice from "../assets/newimg.svg";
import { AuthData } from "../Provider/AuthProv";
import { useAdaptiveTriggers } from "../Hooks/AdaptiveConfig";
import DesktopHomepage from "./Homepage/DesktopHomepage";
import MobileHomepage from "./Homepage/MobileHomepage";
// import "./Homepage.css";

function Homepage({ backendEvents }) {
	console.log("Homepage events:", backendEvents);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 780);
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			{isMobile ? (
				<MobileHomepage backendEvents={backendEvents} />
			) : (
				<DesktopHomepage backendEvents={backendEvents} />
			)}
		</div>
	);
}

export default Homepage;
