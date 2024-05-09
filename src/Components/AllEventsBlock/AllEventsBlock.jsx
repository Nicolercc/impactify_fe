import React, { useEffect, useState } from "react";
import MainContent from "../MainContent";
import Categories from "../CategoriesSection/CategoriesSection";
import MobileMainContent from "../MainContent/MobileMainContent";
import CarouselComponent from "../Carousel/Carousel";

function AllEventsBlock({ backendEvents }) {
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
		<div className="mt-5">
			<Categories />
			{isMobile ? (
				<CarouselComponent backendEvents={backendEvents} />
			) : (
				<MainContent backendEvents={backendEvents} />
			)}
		</div>
	);
}

export default AllEventsBlock;
