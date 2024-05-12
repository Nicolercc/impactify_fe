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

	const {
		parallaxConfig: {
			parallax,
			firstPage,
			secondPage,
			thirdPage,
			fourthPage,
			footer,
		},
	} = useAdaptiveTriggers() || {};

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

	return (
		<div className="d-flex justify-content-center align-items-center parallax-container">
			<Parallax
				pages={parallax.pages}
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
					offset={thirdPage.offset}
					speed={thirdPage.speed}
					factor={thirdPage.factor}
					className=" d-flex justify-content-center"
					style={{ backgroundColor: "white" }}
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
					<DonationsLayout backendEvents={backendEvents} />
				</ParallaxLayer>

				<ParallaxLayer offset={footer.offset} factor={footer.factor}>
					<Footer />
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

export default Homepage;
