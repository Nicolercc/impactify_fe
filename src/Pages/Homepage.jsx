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
import { useAdaptiveTriggers } from "../Hooks/AdaptiveConfig";
import CarouselComponent from "../Components/Carousel/Carousel";
import MobileImg from "../assets/Mobile.png";

function Homepage({ backendEvents }) {
	const [isResponsive, setIsResponsive] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// const adaptiveWidth = useAdaptiveTriggers({
	// 	onExtraSmallEnter: () => {},
	// 	onSmallEnter: () => {},
	// 	onMediumEnter: () => {},
	// 	onLargeEnter: () => {},
	// 	onExtraLargeEnter: () => {},
	// });

	const { parallaxConfig } = useAdaptiveTriggers() || {};

	// Safely destructure parallax config with defaults
	const {
		parallax = { pages: 4.3 },
		firstPage = { offset: 0.7, speed: 0, factor: 1.1 },
		secondPage = { offset: 1.6, speed: 0, factor: 1 },
		thirdPage = { offset: 2.526, speed: 0, factor: 0.5 },
		fourthPage = { offset: 2.88, speed: 0, factor: 1.4 },
		footer = { offset: 4, factor: 1 },
	} = parallaxConfig || {};

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
		// Determine screen size based on window width
		const width = window.innerWidth;
		if (width < 576) {
			return innerStyles.xs;
		} else if (width < 768) {
			return innerStyles.sm;
		} else if (width < 992) {
			return innerStyles.md;
		} else if (width < 1200) {
			return innerStyles.lg;
		} else {
			return innerStyles.xl;
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			<Parallax
				pages={parallax.pages}
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
					offset={firstPage.offset}
					speed={firstPage.speed}
					factor={firstPage.factor}
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
					offset={secondPage.offset}
					speed={secondPage.speed}
					factor={secondPage.factor}
					className=" d-flex justify-content-center"
					style={{ background: `blue` }}
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
					offset={thirdPage.offset}
					speed={thirdPage.speed}
					factor={thirdPage.factor}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "blue", marginTop: "-2rem"  }}
				>
					<InfoBlock />
				</ParallaxLayer>
				{/* page 4 */}
				<ParallaxLayer
					offset={fourthPage.offset}
					speed={fourthPage.speed}
					factor={fourthPage.factor}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
				>
					<div className="py-10">
						<DonationsLayout backendEvents={backendEvents} />
					</div>
				</ParallaxLayer>

				<ParallaxLayer offset={footer.offset} factor={footer.factor}>
					<Footer />
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

export default Homepage;
