import React, { useState, useEffect } from "react";
import Logo from "../Logo";
import "./MaintenancePage.css";

const MaintenancePage = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentFeature, setCurrentFeature] = useState(0);

	const features = [
		{
			icon: "🚀",
			title: "Enhanced Performance",
			description: "Faster load times and smoother interactions",
		},
		{
			icon: "✨",
			title: "New Features",
			description: "Exciting tools to amplify your impact",
		},
		{
			icon: "🔒",
			title: "Improved Security",
			description: "Advanced protection for your data",
		},
		{
			icon: "📱",
			title: "Better Mobile Experience",
			description: "Seamless experience across all devices",
		},
	];

	useEffect(() => {
		setIsVisible(true);

		// Rotate features every 3 seconds
		const featureTimer = setInterval(() => {
			setCurrentFeature((prev) => (prev + 1) % features.length);
		}, 3000);

		return () => clearInterval(featureTimer);
	}, [features.length]);

	return (
		<div className="maintenance-container">
			<div className="maintenance-content">
				<div className="logo-container">
					<Logo />
				</div>

				<div className="maintenance-message">
					<h1 className="maintenance-title">We're Making Something Amazing!</h1>
					<p className="maintenance-description">
						Our team is working around the clock to bring you an enhanced
						experience. We're implementing cutting-edge improvements that will
						revolutionize how you create impact.
					</p>
				</div>

				<div className="status-indicator">
					<div className="status-dot"></div>
					<span className="status-text">System Update in Progress</span>
				</div>

				<div className="feature-showcase">
					<h3 className="features-title">What's Coming Next?</h3>
					<div className="feature-carousel">
						<div className="feature-display">
							<div className="feature-icon-large">
								{features[currentFeature].icon}
							</div>
							<h4 className="feature-title">
								{features[currentFeature].title}
							</h4>
							<p className="feature-description">
								{features[currentFeature].description}
							</p>
						</div>
						<div className="feature-dots">
							{features.map((_, index) => (
								<button
									key={index}
									className={`feature-dot ${index === currentFeature ? "active" : ""}`}
									onClick={() => setCurrentFeature(index)}
									aria-label={`View feature ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="progress-section">
					<div className="progress-bar">
						<div className="progress-fill"></div>
					</div>
					<p className="progress-text">Optimizing your experience...</p>
				</div>

				<div className="action-buttons">
					<button
						className="btn-primary"
						onClick={() => window.location.reload()}
					>
						🔄 Check Status
					</button>
					<button
						className="btn-secondary"
						onClick={() => window.open("mailto:support@impactify.com")}
					>
						📧 Contact Support
					</button>
				</div>

				<div className="social-links">
					<p className="social-text">Stay updated:</p>
					<div className="social-icons">
						<a href="#" className="social-link" aria-label="Twitter">
							<span className="social-icon">🐦</span>
						</a>
						<a href="#" className="social-link" aria-label="LinkedIn">
							<span className="social-icon">💼</span>
						</a>
						<a href="#" className="social-link" aria-label="Instagram">
							<span className="social-icon">📸</span>
						</a>
					</div>
				</div>
			</div>

			<div className="maintenance-animation">
				<div className="floating-shapes">
					<div className="shape shape-1"></div>
					<div className="shape shape-2"></div>
					<div className="shape shape-3"></div>
					<div className="shape shape-4"></div>
				</div>
			</div>
		</div>
	);
};

export default MaintenancePage;
