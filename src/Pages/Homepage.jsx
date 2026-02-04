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
import CarouselComponent from "../Components/Carousel/Carousel";
import MobileImg from "../assets/Mobile.png";
// import "./Homepage.css";

function Homepage({ backendEvents }) {
	const [isResponsive, setIsResponsive] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Debug: Log what Homepage receives
	useEffect(() => {
		console.log("Homepage - received backendEvents:", backendEvents);
		console.log("Homepage - is array?", Array.isArray(backendEvents));
		console.log("Homepage - length:", backendEvents?.length);
	}, [backendEvents]);

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
			setIsMobile(window.innerWidth <= 780);
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

	const innerStyles = {
		//xs and xl are the only ones  that work
		xs: {
			padding: "10px",
			fontSize: "14px",
		},
		sm: {
			padding: "20px",
			fontSize: "16px",
		},
		md: {
			padding: "30px",
			fontSize: "18px",
		},
		lg: {
			padding: "40px",
			fontSize: "50px",
		},
		xl: {
			padding: "50px",

			// fontSize: "22px",
		},
	};

	const getCurrentInnerStyle = () => {
		switch (adaptiveWidth) {
			case "xs":
				return innerStyles.xs;
			case "sm":
				return innerStyles.sm;
			case "md":
				return innerStyles.md;
			case "lg":
				return innerStyles.lg;
			case "xl":
				return innerStyles.xl;
			default:
				return {};
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			<Parallax
				pages={4.4}
				ref={parallaxRef}
				innerStyle={getCurrentInnerStyle()}
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
						}}
					></div>
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
					offset={0.6}
					speed={0}
					factor={1.1}
					style={{
						backgroundColor: "white",
						borderRadius: "30px",
					}}
					className=" d-flex justify-content-center "
				>
					{/* {isMobile ? (
						<div>
							<CarouselComponent backendEvents={backendEvents} />
							Jessica
						</div>
					) : ( */}
					<AllEventsBlock backendEvents={backendEvents} />
					{/* )} */}
				</ParallaxLayer>
				{/* page 2 */}
				<ParallaxLayer
					offset={1.5}
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
							backgroundImage: `url(${isMobile ? MobileImg : Voice})`,
						}}
					></div>
				</ParallaxLayer>
				{/* page 3 */}
				<ParallaxLayer
					offset={2.43}
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
					className=" d-flex  justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<div className="py-10">
						<DonationsLayout backendEvents={backendEvents} />
					</div>
				</ParallaxLayer>

				<ParallaxLayer offset={4.01} factor={1.1}>
					<Footer />
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

export default Homepage;
