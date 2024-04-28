import React, { useEffect, useRef, useState, useContext } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Container, Button, Navbar } from "react-bootstrap";
import MainContent from "../Components/MainContent";
import TrustAndSafety from "../Components/TrustAndSafety/TrustAndSafety";
import HeroImage from "../assets/HeroImage.jpg";
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
import ParallaxConfig from "../Hooks/ParallaxConfig";
import "./Homepage.css";

function Homepage({ backendEvents }) {
	const { user } = useContext(AuthData);
	console.log("Homepage events:", backendEvents);
	const [isResponsive, setIsResponsive] = useState(false);
	const adaptiveWidth = useAdaptiveTriggers({
		onExtraSmallEnter: () => setIsResponsive(true),
		onSmallEnter: () => setIsResponsive(true),
		onMediumEnter: () => setIsResponsive(true),
		onLargeEnter: () => setIsResponsive(true),
		onExtraLargeEnter: () => setIsResponsive(true),
	});

	console.log(adaptiveWidth);

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

	const getPageSettings = () => {
		switch (adaptiveWidth) {
			case "xs":
				return ParallaxConfig.xs;
			case "s":
				return ParallaxConfig.s;
			case "m":
				return ParallaxConfig.m;
			case "l":
				return ParallaxConfig.l;
			case "xl":
				return ParallaxConfig.xl;
			default:
				return ParallaxConfig.xl; // Default to extra large
		}
	};

	const pageSettings = getPageSettings();

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			<Parallax
				pages={pageSettings.parallax ? pageSettings.parallax.pages : 4.3}
				ref={parallaxRef}
				className="parallax-container"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundImage: `url(${HeroImage})`,
					backgroundSize: "100vw 90vh",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div
					className="btn top-50 start-50 translate-middle my-5 btn-class position-abosolu"
					// style={{ zIndex: "10 !important" }}
				>
					{/* <Button
						variant=""
						style={{
							color: "#ffffff",
							cursor: "pointer",
							position: "absolute",
							top: "55%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							zIndex: 10,
						}}
					>
						Start Event
					</Button> */}
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
					offset={pageSettings.firstPage ? pageSettings.firstPage.offset : 0.7}
					speed={pageSettings.firstPage ? pageSettings.firstPage.speed : 0}
					factor={pageSettings.firstPage ? pageSettings.firstPage.factor : 1.1}
					style={{ backgroundColor: "white", borderRadius: "30px" }}
					className=" d-flex justify-content-center"
				>
					<AllEventsBlock backendEvents={backendEvents} />
				</ParallaxLayer>
				{/* page 2 */}
				<ParallaxLayer
					offset={
						pageSettings.secondPage ? pageSettings.secondPage.offset : 1.6
					}
					speed={pageSettings.secondPage ? pageSettings.secondPage.speed : 0}
					factor={pageSettings.secondPage ? pageSettings.secondPage.factor : 1}
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
					offset={pageSettings.thirdPage ? pageSettings.thirdPage.offset : 2.45}
					speed={pageSettings.thirdPage ? pageSettings.thirdPage.speed : 0}
					factor={pageSettings.thirdPage ? pageSettings.thirdPage.factor : 0.5}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<InfoBlock />
				</ParallaxLayer>
				{/* page 4 */}
				<ParallaxLayer
					offset={
						pageSettings.fourthPage ? pageSettings.fourthPage.offset : 2.87
					}
					speed={pageSettings.fourthPage ? pageSettings.fourthPage.speed : 0}
					factor={
						pageSettings.fourthPage ? pageSettings.fourthPage.factor : 1.4
					}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<DonationsLayout backendEvents={backendEvents} />
				</ParallaxLayer>

				<ParallaxLayer
					offset={pageSettings.footer ? pageSettings.footer.offset : 4.1}
					factor={pageSettings.footer ? pageSettings.footer.factor : 1}
				>
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
