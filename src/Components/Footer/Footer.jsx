import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { 
	FaFacebook, 
	FaTwitter, 
	FaInstagram, 
	FaLinkedin,
	FaEnvelope 
} from "react-icons/fa";
import { 
	IoNewspaper, 
	IoCalendar, 
	IoHeart, 
	IoCheckmarkCircle,
	IoInformationCircle,
	IoHelpCircle,
	IoMail
} from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import Logo from "../Logo";
import "./Footer.css";

function Footer() {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (email) {
			// Handle subscription logic here
			setSubscribed(true);
			setTimeout(() => {
				setSubscribed(false);
				setEmail("");
			}, 3000);
		}
	};

	return (
		<footer className="footer-modern">
			<Container>
				<div className="footer-content">
					{/* Main Footer Content */}
					<Row className="footer-main">
						{/* Brand Column */}
						<Col xs={12} md={6} lg={4} className="footer-brand-col">
							<div className="footer-brand">
								<Logo />
								<p className="footer-tagline">
									Empowering communities to create positive change through civic engagement and collective action.
								</p>
								<div className="footer-social">
									<a 
										href="https://facebook.com" 
										target="_blank" 
										rel="noopener noreferrer"
										className="social-link"
										aria-label="Facebook"
									>
										<FaFacebook />
									</a>
									<a 
										href="https://twitter.com" 
										target="_blank" 
										rel="noopener noreferrer"
										className="social-link"
										aria-label="Twitter"
									>
										<FaTwitter />
									</a>
									<a 
										href="https://instagram.com" 
										target="_blank" 
										rel="noopener noreferrer"
										className="social-link"
										aria-label="Instagram"
									>
										<FaInstagram />
									</a>
									<a 
										href="https://linkedin.com" 
										target="_blank" 
										rel="noopener noreferrer"
										className="social-link"
										aria-label="LinkedIn"
									>
										<FaLinkedin />
									</a>
								</div>
							</div>
						</Col>

						{/* Links Columns */}
						<Col xs={6} md={3} lg={2} className="footer-links-col">
							<h5 className="footer-section-title">Get Involved</h5>
							<ul className="footer-links">
								<li>
									<Link to="/discover/news" className="footer-link">
										<IoNewspaper className="footer-link-icon" />
										<span>News</span>
									</Link>
									</li>
									<li>
									<Link to="/discover/events" className="footer-link">
										<IoCalendar className="footer-link-icon" />
										<span>Events</span>
									</Link>
									</li>
									<li>
									<Link to="/discover/donations" className="footer-link">
										<IoHeart className="footer-link-icon" />
										<span>Donations</span>
									</Link>
									</li>
									<li>
									<Link to="/discover/voting" className="footer-link">
										<MdHowToVote className="footer-link-icon" />
										<span>Voting Toolkit</span>
									</Link>
									</li>
								</ul>
							</Col>

						<Col xs={6} md={3} lg={2} className="footer-links-col">
							<h5 className="footer-section-title">About</h5>
							<ul className="footer-links">
									<li>
									<Link to="/aboutus" className="footer-link">
										<IoInformationCircle className="footer-link-icon" />
										<span>About Us</span>
									</Link>
									</li>
									<li>
									<Link to="/howitworks" className="footer-link">
										<IoCheckmarkCircle className="footer-link-icon" />
										<span>How It Works</span>
									</Link>
									</li>
									<li>
									<Link to="/discover/facts" className="footer-link">
										<IoHelpCircle className="footer-link-icon" />
										<span>FAQs</span>
									</Link>
									</li>
									<li>
									<a href="mailto:contact@impactify.com" className="footer-link">
										<IoMail className="footer-link-icon" />
										<span>Contact Us</span>
										</a>
									</li>
								</ul>
							</Col>

						{/* Newsletter Column */}
						<Col xs={12} md={12} lg={4} className="footer-newsletter-col">
							<h5 className="footer-section-title">Stay Connected</h5>
							<p className="footer-newsletter-desc">
								Get the latest updates on events, news, and opportunities to make an impact.
							</p>
							<form onSubmit={handleSubscribe} className="footer-newsletter-form">
								<div className="newsletter-input-group">
									<IoMail className="newsletter-icon" />
								<input
									type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email"
										className="newsletter-input"
										required
										aria-label="Email address"
								/>
								<button
									type="submit"
										className="newsletter-button"
										disabled={subscribed}
								>
										{subscribed ? "Subscribed!" : "Subscribe"}
								</button>
								</div>
								{subscribed && (
									<p className="newsletter-success">
										Thank you for subscribing!
									</p>
								)}
							</form>
						</Col>
					</Row>

					{/* Footer Bottom */}
					<div className="footer-bottom">
						<Row className="align-items-center">
							<Col xs={12} md={6} className="footer-copyright">
								<p>
									© {new Date().getFullYear()} Impactify. All rights reserved.
								</p>
							</Col>
							<Col xs={12} md={6} className="footer-legal">
								<div className="footer-legal-links">
									<Link to="/privacy" className="footer-legal-link">
										Privacy Policy
									</Link>
									<span className="footer-divider">•</span>
									<Link to="/terms" className="footer-legal-link">
										Terms of Service
									</Link>
									<span className="footer-divider">•</span>
									<Link to="/cookies" className="footer-legal-link">
										Cookie Policy
									</Link>
						</div>
					</Col>
				</Row>
			</div>
				</div>
			</Container>
		</footer>
	);
}

export default Footer;
