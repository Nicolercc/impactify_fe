import React, { useEffect, useRef, useState, useContext } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Container, Button, Navbar } from "react-bootstrap";
import MainContent from "../Components/MainContent";
import TrustAndSafety from "../Components/TrustAndSafety/TrustAndSafety";
import HeroImage from "../assets/hero2.webp";
import MainNavigationBar from "../Components/NavigationBars/HomeNavigationBar";
import useScrollPosition from "../Hooks/ScrollPositionProvider";
import TrustBlock from "../Components/Midsection/TrustBlock";
import MobileNavigation from "../Components/NavigationBars/MainNavigationBar";
import ProofHero from "../Components/SocialProof/ProofHero";
import DonationsLayout from "../Components/BentoBoxes/DonationsLayout";
import CardLayout from "../Components/BentoBoxes/CardsLayout/Cards";
import Footer from "../Components/Footer/Footer";
import AllEventsBlock from "../Components/AllEventsBlock/AllEventsBlock";
import InfoBlock from "../Components/InfoBlock";
import factsImg from "../assets/facts1.jpg";
import tag1 from "../assets/Tag1.jpg";
import Voice from "../assets/newimg.svg";
import Midsection from "../assets/Midsection.svg";
import { AuthData } from "../Provider/AuthProv";
import { useAdaptiveTriggers } from "../Hooks/AdaptiveConfig";
import "./Homepage.css";

function Homepage({ backendEvents }) {
	const { user } = useContext(AuthData);
	console.log("Homepage events:", backendEvents);
	const [isResponsive, setIsResponsive] = useState(false);

	const adaptiveWidth = useAdaptiveTriggers({
		onSmallEnter: () =>
			console.log("its small, apply small parallax props now"),
		onExtraSmallEnter: () =>
			console.log("its extra small, apply extra small parallax props now"),
		onMediumEnter: () =>
			console.log("its medium, apply medium parallax props now"),
		onLargeEnter: () =>
			console.log("its large, apply large parallax props now"),
		onExtraLargeEnter: () =>
			console.log("its extra large, apply extra large parallax props now"),
	});

	//console.log(adaptiveWidth);

	useEffect(() => {
		const handleResize = () => {
			setIsResponsive(window.innerWidth <= 991);
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// try onMouseOver for animations
	const parallaxRef = useRef(null);
	const scrolling = useScrollPosition({
		element: parallaxRef,
	});

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			<Parallax
				pages={4.4}
				ref={parallaxRef}
				className="parallax-container"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundImage: `url(${HeroImage})`,
					backgroundSize: "100vw 80vh",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div>
					<div
						variant=""
						style={{
							color: "#ffffff",
							cursor: "pointer",
							position: "absolute",
							top: "12%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							// zIndex: 10,
						}}
					>
						{/* Start Event */}
					</div>
				</div>

				{/* navigation */}
				<ParallaxLayer
					horizontal
					sticky={{ start: 0, end: 4 }}
					style={{
						height: "unset",
						display: !isResponsive ? "flex" : null,
						justifyContent: "center",
					}}
				>
					{isResponsive ? (
						<MobileNavigation scrolling={scrolling} />
					) : (
						<MainNavigationBar scrolling={scrolling} />
					)}
				</ParallaxLayer>
				{/* page 1 */}
				<ParallaxLayer
					offset={0.7}
					speed={0}
					factor={1.1}
					style={{
						backgroundColor: "white",
						borderRadius: "30px",
					}}
					className=" d-flex justify-content-center "
				>
					<AllEventsBlock backendEvents={backendEvents} />
				</ParallaxLayer>
				{/* page 2 */}
				<ParallaxLayer
					offset={1.64}
					speed={0}
					factor={1}
					className=" d-flex justify-content-center"
					style={{ background: `white` }}
				>
					<div
						style={{
							height: "92%",
							width: "100%",
							backgroundRepeat: "no-repeat",
							backgroundSize: "100%",
							backgroundImage: `url(${Voice})`,
						}}
					></div>
				</ParallaxLayer>
				{/* page 3 */}
				<ParallaxLayer
					offset={2.47}
					speed={0}
					factor={0.5}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<InfoBlock />
				</ParallaxLayer>
				{/* page 4 */}
				<ParallaxLayer
					offset={2.9}
					speed={0}
					factor={1.2}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<DonationsLayout backendEvents={backendEvents} />
				</ParallaxLayer>

				<ParallaxLayer offset={4.01} factor={1.1}>
					<Footer />
				</ParallaxLayer>
			</Parallax>
			{/* {isResponsive && (
				<div className="sticky-footer">
					<Button
						className="btn"
						variant=""
						style={{
							color: "#ffffff",
							cursor: "pointer",
						}}
					>
						Start Event
					</Button>
				</div>
			)} */}
		</div>
	);
}

export default Homepage;
