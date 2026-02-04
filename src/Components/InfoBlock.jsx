import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./InfoBlock.css";

function InfoBlock() {
	const scrollContainerRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

	const checkScrollPosition = () => {
		if (!scrollContainerRef.current) return;
		
		const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
		setShowLeftArrow(scrollLeft > 0);
		setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		checkScrollPosition();
		container.addEventListener("scroll", checkScrollPosition);
		
		const handleResize = () => {
			setIsMobile(window.innerWidth < 576);
			checkScrollPosition();
		};
		
		window.addEventListener("resize", handleResize);

		return () => {
			container.removeEventListener("scroll", checkScrollPosition);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			// Scroll by approximately one card width + gap
			const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
			scrollContainerRef.current.scrollBy({
				left: -scrollAmount,
				behavior: "smooth",
			});
		}
	};

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			// Scroll by approximately one card width + gap
			const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};
	const categories = [
		{
			to: "/discover/news",
			icon: IoNewspaper,
			title: "News",
			description: "Stay informed with the latest updates",
		},
		{
			to: "/discover/events",
			icon: FaPersonCircleCheck,
			title: "Attend",
			description: "Connect with like-minded individuals",
		},
		{
			to: "/discover/create-event",
			icon: MdOutlineEventAvailable,
			title: "Create",
			description: "Build your community around shared interests",
		},
		{
			to: "/discover/donations",
			icon: BiDonateHeart,
			title: "Donate",
			description: "Support causes that matter to you",
		},
		{
			to: "/search",
			icon: BsFillSearchHeartFill,
			title: "Discover",
			description: "Find opportunities to make an impact",
		},
		{
			to: "/discover/voting",
			icon: GiVote,
			title: "Vote",
			description: "Make your voice heard this election",
		},
	];

	// For mobile, show only first 4 categories in a 2x2 grid
	const displayCategories = isMobile ? categories.slice(0, 4) : categories;

	return (
		<Container fluid className="info-block-container">
			<Row className="justify-content-center">
				<Col xs={12} className="text-center">
					<h2 className="info-title">Tools to Empower Your Civic Engagement</h2>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col xs={12}>
					<div className="categories-scroll-wrapper">
						{showLeftArrow && (
							<button
								className="scroll-arrow scroll-arrow-left"
								onClick={scrollLeft}
								aria-label="Scroll left"
								type="button"
							>
								<IoIosArrowBack />
							</button>
						)}
						<div 
							className="categories-scroll-container" 
							ref={scrollContainerRef}
							role="region" 
							aria-label="Category cards"
						>
							{displayCategories.map((category, index) => {
								const IconComponent = category.icon;
								return (
									<div key={index} className="category-card">
										<Link to={category.to} className="category-link">
											<div className="category-icon-wrapper">
												<IconComponent className="category-icon" aria-hidden="true" />
											</div>
											<h3 className="category-title">{category.title}</h3>
											<p className="category-description">
												{category.description}
											</p>
										</Link>
									</div>
								);
							})}
						</div>
						{showRightArrow && (
							<button
								className="scroll-arrow scroll-arrow-right"
								onClick={scrollRight}
								aria-label="Scroll right"
								type="button"
							>
								<IoIosArrowForward />
							</button>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default InfoBlock;
