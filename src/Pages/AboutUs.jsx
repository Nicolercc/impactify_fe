import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { 
	IoRocket, 
	IoPeople, 
	IoHeart, 
	IoGlobe,
	IoCheckmarkCircle,
	IoStar,
	IoFlame,
	IoHandLeft,
	IoMegaphone,
	IoBulb,
	IoCalendar
} from "react-icons/io5";
import { 
	MdGroups, 
	MdTrendingUp, 
	MdPublic,
	MdCelebration,
	MdVerified
} from "react-icons/md";
import { FaHandsHelping, FaUsers, FaRocket } from "react-icons/fa";
import "./AboutUs.css";

function AboutUs() {
	const stats = [
		{ icon: <IoPeople />, number: "10K+", label: "Active Users" },
		{ icon: <IoCalendar />, number: "5K+", label: "Events Created" },
		{ icon: <IoHeart />, number: "$2M+", label: "Raised for Causes" },
		{ icon: <IoGlobe />, number: "50+", label: "Cities Reached" },
	];

	const values = [
		{
			icon: <IoHandLeft />,
			title: "Empowerment",
			description: "We empower individuals and communities to create meaningful change through accessible tools and resources."
		},
		{
			icon: <IoPeople />,
			title: "Community",
			description: "Building strong, connected communities that support each other in driving positive social impact."
		},
		{
			icon: <IoCheckmarkCircle />,
			title: "Transparency",
			description: "We believe in open communication, honest reporting, and accountability in everything we do."
		},
		{
			icon: <IoHeart />,
			title: "Impact",
			description: "Every action matters. We measure success by the real-world change we help create together."
		},
		{
			icon: <IoBulb />,
			title: "Innovation",
			description: "Continuously evolving our platform to meet the changing needs of activists and organizers."
		},
		{
			icon: <IoGlobe />,
			title: "Inclusivity",
			description: "Creating a platform where everyone, regardless of background, can participate and make a difference."
		},
	];

	return (
		<div className="about-us-page">
			{/* Hero Section */}
			<section className="about-hero">
				<div className="hero-background"></div>
				<Container>
					<div className="hero-content">
						<div className="hero-icons">
							<IoRocket className="hero-icon" />
							<IoStar className="hero-icon" />
							<IoFlame className="hero-icon" />
						</div>
						<h1 className="hero-title">
							Empowering Communities to Create Change
						</h1>
						<p className="hero-subtitle">
							Impactify is a platform dedicated to connecting passionate individuals 
							with opportunities to make a real difference in their communities and beyond.
						</p>
					</div>
				</Container>
			</section>

			{/* Mission & Vision Section */}
			<section className="mission-vision-section">
				<Container>
					<Row className="g-4">
						<Col md={6}>
							<div className="mission-card">
								<div className="card-icon-wrapper">
									<IoRocket className="card-icon" />
								</div>
								<h2 className="card-title">Our Mission</h2>
								<p className="card-description">
									To democratize civic engagement by providing accessible tools and 
									platforms that enable anyone to organize events, raise awareness, 
									and drive positive social change in their communities.
								</p>
							</div>
						</Col>
						<Col md={6}>
							<div className="vision-card">
								<div className="card-icon-wrapper">
									<IoGlobe className="card-icon" />
								</div>
								<h2 className="card-title">Our Vision</h2>
								<p className="card-description">
									A world where every individual has the power and resources to create 
									meaningful impact, where communities are strengthened through collective 
									action, and where positive change is accessible to all.
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Stats Section */}
			<section className="stats-section">
				<Container>
					<h2 className="section-title">Our Impact</h2>
					<Row className="g-4">
						{stats.map((stat, index) => (
							<Col xs={6} md={3} key={index}>
								<div className="stat-card">
									<div className="stat-icon">{stat.icon}</div>
									<div className="stat-number">{stat.number}</div>
									<div className="stat-label">{stat.label}</div>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Values Section */}
			<section className="values-section">
				<Container>
					<div className="section-header">
						<h2 className="section-title">Our Values</h2>
						<p className="section-subtitle">
							The principles that guide everything we do
						</p>
					</div>
					<Row className="g-4">
						{values.map((value, index) => (
							<Col md={6} lg={4} key={index}>
								<div className="value-card">
									<div className="value-icon-wrapper">
										{value.icon}
									</div>
									<h3 className="value-title">{value.title}</h3>
									<p className="value-description">{value.description}</p>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* What We Do Section */}
			<section className="what-we-do-section">
				<Container>
					<Row className="align-items-center">
						<Col lg={6}>
							<div className="content-wrapper">
								<h2 className="section-title">What We Do</h2>
								<div className="feature-list">
									<div className="feature-item">
										<IoCheckmarkCircle className="feature-icon" />
										<div>
											<h4>Event Organization</h4>
											<p>Create, promote, and manage events that bring communities together for a cause.</p>
										</div>
									</div>
									<div className="feature-item">
										<IoCheckmarkCircle className="feature-icon" />
										<div>
											<h4>Fundraising Support</h4>
											<p>Enable secure donations and fundraising campaigns for important causes.</p>
										</div>
									</div>
									<div className="feature-item">
										<IoCheckmarkCircle className="feature-icon" />
										<div>
											<h4>News & Information</h4>
											<p>Stay informed with curated news and updates on social issues and activism.</p>
										</div>
									</div>
									<div className="feature-item">
										<IoCheckmarkCircle className="feature-icon" />
										<div>
											<h4>Voting Resources</h4>
											<p>Provide tools and information to help people participate in the democratic process.</p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={6}>
							<div className="visual-elements">
								<div className="floating-icon icon-1">
									<MdGroups />
								</div>
								<div className="floating-icon icon-2">
									<FaHandsHelping />
								</div>
								<div className="floating-icon icon-3">
									<IoMegaphone />
								</div>
								<div className="floating-icon icon-4">
									<MdCelebration />
								</div>
								<div className="floating-icon icon-5">
									<MdTrendingUp />
								</div>
								<div className="floating-icon icon-6">
									<FaRocket />
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="cta-section">
				<Container>
					<div className="cta-content">
						<IoRocket className="cta-icon" />
						<h2 className="cta-title">Ready to Make an Impact?</h2>
						<p className="cta-description">
							Join thousands of changemakers who are creating positive impact in their communities.
						</p>
						<div className="cta-buttons">
							<a href="/discover/create-event" className="cta-button primary">
								Create Your First Event
							</a>
							<a href="/discover/events" className="cta-button secondary">
								Explore Events
							</a>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}

export default AboutUs;

