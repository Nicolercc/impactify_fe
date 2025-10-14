import React, { useEffect, useState } from "react";
import MainContent from "../MainContent";
import Categories from "../CategoriesSection/CategoriesSection";
import MobileMainContent from "../MainContent/MobileMainContent";
import CarouselComponent from "../Carousel/Carousel";
import LoadingState from "../LoadingState/LoadingState";

function AllEventsBlock({ backendEvents }) {
	const [isMobile, setIsMobile] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {git
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 780);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);
		return () => window.removeEventListener("resize", handleResize);
		clearTimeout(timer);
	}, []);
	return (
		<div className="mt-5">
			{loading ? (
				<span className="loader"></span>
			) : isMobile ? (
				<CarouselComponent backendEvents={backendEvents} />
			) : (
				<MainContent backendEvents={backendEvents} />
			)}
		</div>
	);
}

export default AllEventsBlock;
