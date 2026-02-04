import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Container, Row, Col } from "react-bootstrap";
import { 
	IoRocket, 
	IoNewspaper, 
	IoCalendar, 
	IoHeart, 
	IoCheckmarkCircle,
	IoArrowForward,
	IoPlayCircle,
	IoPauseCircle,
	IoSparkles,
	IoStar,
	IoFlame
} from "react-icons/io5";
import { 
	MdEventNote, 
	MdTrendingUp,
	MdGroups
} from "react-icons/md";
import { FaHandsHelping, FaRocket } from "react-icons/fa";
import socialProof from "../../assets/proofhero.png";
import ImpactVid from "../../assets/ImpactVid.mp4";
import "./ProofHero.css";

const ProofHero = () => {
	const [showVideo, setShowVideo] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef(null);
	const [activeStep, setActiveStep] = useState(0);

	const steps = [
		{
			icon: <IoNewspaper />,
			title: "Stay Informed",
			description: "Discover curated news articles about pressing social issues and stay up-to-date with what matters most.",
			color: "#630f76"
		},
		{
			icon: <IoCalendar />,
			title: "Find Events",
			description: "Browse local and virtual events that align with causes you care about. Connect with like-minded activists.",
			color: "#8b1fa3"
		},
		{
			icon: <MdEventNote />,
			title: "Create Impact",
			description: "Organize your own events, rallies, or community gatherings. Make it easy for others to join your cause.",
			color: "#630f76"
		},
		{
			icon: <IoHeart />,
			title: "Support Causes",
			description: "Make secure donations to verified organizations and track the impact of your contributions.",
			color: "#8b1fa3"
		},
		// {
		// 	icon: <IoCheckmarkCircle />,
		// 	title: "Take Action",
		// 	description: "Use our voting toolkit and resources to participate in the democratic process and drive change.",
		// 	color: "#630f76"
		// }
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % steps.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const handleVideoToggle = () => {
		setShowVideo(!showVideo);
		if (!showVideo) {
			setIsPlaying(true);
		}
	};

	const handlePlayPause = () => {
		if (playerRef.current) {
			if (isPlaying) {
				playerRef.current.getInternalPlayer()?.pause();
			} else {
				playerRef.current.getInternalPlayer()?.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<div className="how-it-works-page">
			{/* Hero Section */}
			<section className="how-hero">
				<div className="hero-background-pattern"></div>
				<Container>
					<div className="hero-content-wrapper">
						<div className="hero-decorative-icons">
							<IoSparkles className="deco-icon icon-1" />
							<IoStar className="deco-icon icon-2" />
							<IoFlame className="deco-icon icon-3" />
						</div>
						<h1 className="how-hero-title">
							How Impactify Works
						</h1>
						<p className="how-hero-subtitle">
							Your complete platform for civic engagement, community organizing, and creating meaningful change.
						</p>
					</div>
				</Container>
			</section>

			{/* Steps Section */}
			<section className="steps-section">
				<Container>
					<div className="steps-header">
						<h2 className="steps-title">Simple Steps to Make an Impact</h2>
						<p className="steps-subtitle">
							From staying informed to taking action, we make it easy to get involved
						</p>
					</div>

					<div className="steps-container">
						{steps.map((step, index) => (
							<div
								key={index}
								className={`step-card ${activeStep === index ? "active" : ""}`}
								onMouseEnter={() => setActiveStep(index)}
							>
								<div className="step-number">{index + 1}</div>
								<div className="step-icon-wrapper" style={{ background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)` }}>
									{step.icon}
								</div>
								<h3 className="step-title">{step.title}</h3>
								<p className="step-description">{step.description}</p>
								{activeStep === index && (
									<div className="step-arrow">
										<IoArrowForward />
									</div>
								)}
							</div>
						))}
					</div>

					{/* Progress Indicator */}
					<div className="progress-indicator">
						{steps.map((_, index) => (
							<div
								key={index}
								className={`progress-dot ${activeStep === index ? "active" : ""}`}
								onClick={() => setActiveStep(index)}
							/>
						))}
					</div>
				</Container>
			</section>

			

			

			{/* Why It Matters Section */}
			<section className="why-matters-section">
				<Container>
					<Row className="align-items-center justify-content-center">
						<Col lg={6} className="d-flex justify-content-center">
							<div className="why-content">
								<h2 className="why-title">Why Impactify Matters</h2>
								<div className="why-points">
									<div className="why-point">
										<IoCheckmarkCircle className="why-icon" />
										<div>
											<h4>Cut Through the Clutter</h4>
											<p>
												We connect you directly with local causes and events that align 
												with your values, eliminating the noise and confusion.
											</p>
										</div>
									</div>
									<div className="why-point">
										<IoCheckmarkCircle className="why-icon" />
										<div>
											<h4>From Intention to Action</h4>
											<p>
												Simplify your journey from wanting to make a difference to 
												actually creating tangible impact in your community.
											</p>
										</div>
									</div>
									<div className="why-point">
										<IoCheckmarkCircle className="why-icon" />
										<div>
											<h4>Centralized Hub</h4>
											<p>
												One platform for hands-on volunteering, impactful micro-donations, 
												and supporting larger-scale initiatives.
											</p>
										</div>
									</div>
									<div className="why-point">
										<IoCheckmarkCircle className="why-icon" />
										<div>
											<h4>Community Unity</h4>
											<p>
												Together, individual efforts create powerful collective action 
												that drives meaningful social change.
											</p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={6} className="d-flex justify-content-center">
							<div className="why-visual">
								<div className="floating-elements">
									<IoRocket className="float-element el-1" />
									<IoStar className="float-element el-2" />
									<IoFlame className="float-element el-3" />
									<MdTrendingUp className="float-element el-4" />
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Video Section */}
			<section className="video-section">
				<Container>
					<div className="video-content-wrapper">
						<div className="video-header">
							<h2 className="video-title">See Impactify in Action</h2>
							<p className="video-subtitle">
								Watch how our platform connects communities and drives positive change
							</p>
						</div>

						<div className="video-container">
							{!showVideo ? (
								<div className="video-preview" onClick={handleVideoToggle}>
									<img
										src={socialProof}
										alt="Impactify Platform Preview"
										className="preview-image"
									/>
									<div className="play-overlay">
										<div className="play-button">
											<IoPlayCircle className="play-icon" />
										</div>
										<p className="play-text">Click to watch video</p>
						</div>
					</div>
							) : (
								<div className="video-player-wrapper">
								<ReactPlayer
									ref={playerRef}
									url={ImpactVid}
										playing={isPlaying}
									controls
										width="100%"
									height="100%"
										className="react-player"
									/>
									<button
										className="video-close-button"
										onClick={handleVideoToggle}
										aria-label="Close video"
									>
										×
									</button>
								</div>
							)}
						</div>
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="how-cta-section">
				<Container>
					<div className="how-cta-content">
						<IoRocket className="how-cta-icon" />
						<h2 className="how-cta-title">Ready to Get Started?</h2>
						<p className="how-cta-description">
							Join thousands of changemakers creating positive impact in their communities
						</p>
						<div className="how-cta-buttons">
							<a href="/discover/create-event" className="how-cta-button primary">
								Create Your First Event
							</a>
							<a href="/discover/events" className="how-cta-button secondary">
								Explore Events
							</a>
						</div>
			</div>
				</Container>
			</section>
		</div>
	);
};

export default ProofHero;
