import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetailsPage.css";
import { Button, Form, Modal } from "react-bootstrap";
import StripeBuy from "../Components/Stripe/StripeBuy";
import defaultImage from "../assets/NoImage.jpg";
import { GoQuestion } from "react-icons/go";
import { IoHeart, IoCalendarOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import LoadingState from "../Components/LoadingState/LoadingState";

function EventDetailsPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const { event: eventFromState } = location.state || {};
	const backend = "http://localhost:4000";
	const [event, setEvent] = useState(eventFromState || {});
	const [loading, setLoading] = useState(true);
	const [showThankYouModal, setShowThankYouModal] = useState(false);
	const [checked, setChecked] = useState(false);
	const [buyButtonId, setBuyButtonId] = useState(null);
	const [stripeError, setStripeError] = useState(false);
	const [stripeLoaded, setStripeLoaded] = useState(false);
	const [registeredGuest, setRegisteredGuest] = useState({
		firstname: "",
		lastname: "",
		email: "",
		mobile: "",
	});

	// Fetch event from backend
	useEffect(() => {
		const fetchEvent = async () => {
			if (!id) {
				setLoading(false);
				return;
			}

			if (eventFromState && Object.keys(eventFromState).length > 0) {
				setEvent(eventFromState);
			}

			try {
				const response = await axios.get(`${backend}/events/${id}`);
				let eventData = null;
				
				if (Array.isArray(response.data)) {
					eventData = response.data.find(
						(e) => (e.event_id || e.id || e._id)?.toString() === id.toString()
					);
				} else if (response.data?.data) {
					eventData = response.data.data;
				} else if (response.data?.event) {
					eventData = response.data.event;
				} else if (response.data && typeof response.data === "object") {
					eventData = response.data;
				}

				if (eventData) {
					setEvent(eventData);
				}
			} catch (error) {
				console.error("Error fetching event:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEvent();
	}, [id, backend]);

	// Safely extract event data with fallbacks
	const event_id = event?.event_id || event?.id || event?._id || id;
	const title = event?.event_title || event?.title || event?.name || "Event";
	const date = event?.event_date || event?.date;
	const time = event?.event_time || event?.time;
	const event_details = event?.event_details || event?.details || event?.description || "";
	const locationName = event?.event_location || event?.location || event?.locationName || "";
	const image = event?.event_photo || event?.photo || event?.image || event?.logo_url || event?.featured_image_url;
	const stripe_id = event?.stripe_id || event?.stripeId;

	useEffect(() => {
		if (stripe_id) {
			setBuyButtonId(stripe_id.toString());
		}

		// Check if Stripe script is loaded
		const checkStripe = () => {
			const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE;
			
			if (stripe_id && stripePublishKey) {
				// Check if Stripe custom element is available
				const hasCustomElement = customElements.get('stripe-buy-button');
				const hasStripeScript = document.querySelector('script[src*="stripe"]');
				
				if (hasCustomElement) {
					setStripeLoaded(true);
					setStripeError(false);
				} else if (hasStripeScript) {
					// Script is loading, wait for custom element
					setTimeout(() => {
						if (customElements.get('stripe-buy-button')) {
							setStripeLoaded(true);
							setStripeError(false);
						} else {
							// Stripe failed to load, show fallback immediately
							setStripeError(true);
							setStripeLoaded(false);
						}
					}, 2000);
				} else {
					// No Stripe script found, use fallback immediately
					setStripeError(true);
					setStripeLoaded(false);
				}
			} else {
				// No Stripe config, use fallback immediately
				setStripeError(true);
				setStripeLoaded(false);
			}
		};

		// Initial check
		checkStripe();

		// Periodic check for custom element registration
		const intervalId = setInterval(() => {
			if (stripe_id && customElements.get('stripe-buy-button') && !stripeLoaded) {
				setStripeLoaded(true);
				setStripeError(false);
			}
		}, 1000);

		// Watch for error messages and immediately switch to fallback if found
		const checkForErrors = () => {
			const supportSection = document.querySelector('.event-support-section');
			const stripeWrapper = document.querySelector('#stripe-wrapper-check');
			
			if (!supportSection) return;

			// Check all text content in the support section
			const allText = supportSection.textContent?.toLowerCase() || '';
			const errorKeywords = ['something went wrong', 'went wrong', 'error occurred', 'unable to load', 'failed to load', 'an error', 'there was an error'];
			
			// Specifically target and remove ErrorButton elements from entire page
			const errorButtons = document.querySelectorAll('.ErrorButton-textContainer, .ErrorButton-text, [class*="ErrorButton-textContainer"], [class*="ErrorButton-text"], div.ErrorButton-textContainer, span.ErrorButton-text');
			errorButtons.forEach(el => {
				el.style.display = 'none';
				el.style.visibility = 'hidden';
				el.style.opacity = '0';
				el.style.height = '0';
				el.style.width = '0';
				el.style.overflow = 'hidden';
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				el.style.pointerEvents = 'none';
				el.textContent = '';
				// Remove from DOM
				try {
					el.remove();
				} catch (e) {
					// If remove fails, hide it completely
					if (el.parentElement) {
						el.parentElement.removeChild(el);
					}
				}
			});
			
			// If we find an error message, immediately switch to fallback
			if (errorKeywords.some(keyword => allText.includes(keyword))) {
				setStripeError(true);
				setStripeLoaded(false);
				
				// Hide the entire stripe wrapper
				if (stripeWrapper) {
					stripeWrapper.style.display = 'none';
					stripeWrapper.style.visibility = 'hidden';
					stripeWrapper.style.opacity = '0';
					stripeWrapper.style.height = '0';
					stripeWrapper.style.overflow = 'hidden';
				}
				
				// Remove any error text from all elements
				const allElements = supportSection.querySelectorAll('*');
				allElements.forEach(el => {
					const text = el.textContent?.toLowerCase() || '';
					if (errorKeywords.some(keyword => text.includes(keyword))) {
						el.style.display = 'none';
						el.style.visibility = 'hidden';
						el.style.opacity = '0';
						el.style.height = '0';
						el.style.width = '0';
						el.style.overflow = 'hidden';
						el.style.position = 'absolute';
						el.style.left = '-9999px';
						el.textContent = '';
					}
				});

				// Also remove text nodes directly
				const walker = document.createTreeWalker(
					supportSection,
					NodeFilter.SHOW_TEXT,
					null
				);
				
				let node;
				while (node = walker.nextNode()) {
					const text = node.textContent?.toLowerCase() || '';
					if (errorKeywords.some(keyword => text.includes(keyword))) {
						node.textContent = '';
						if (node.parentElement) {
							node.parentElement.style.display = 'none';
						}
					}
				}
			}

			// Also check Stripe button shadow DOM
			const stripeButtons = document.querySelectorAll('stripe-buy-button');
			stripeButtons.forEach(button => {
				try {
					const shadowRoot = button.shadowRoot;
					if (shadowRoot) {
						const shadowText = shadowRoot.textContent?.toLowerCase() || '';
						if (errorKeywords.some(keyword => shadowText.includes(keyword))) {
							setStripeError(true);
							setStripeLoaded(false);
							button.style.display = 'none';
							button.style.visibility = 'hidden';
							button.style.opacity = '0';
							button.style.height = '0';
							if (stripeWrapper) {
								stripeWrapper.style.display = 'none';
							}
						}
					}
				} catch (e) {
					// Shadow DOM access failed
				}
			});
		};

		// Function to aggressively remove ErrorButton elements
		const removeErrorButtons = () => {
			const errorButtons = document.querySelectorAll(
				'.ErrorButton-textContainer, .ErrorButton-text, [class*="ErrorButton-textContainer"], [class*="ErrorButton-text"], div.ErrorButton-textContainer, span.ErrorButton-text'
			);
			errorButtons.forEach(el => {
				el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
				el.textContent = '';
				try {
					el.remove();
				} catch (e) {
					if (el.parentElement) {
						el.parentElement.removeChild(el);
					}
				}
			});
		};

		// Check for errors frequently and immediately
		const errorCheckInterval = setInterval(() => {
			checkForErrors();
			removeErrorButtons();
		}, 100);
		
		// Run checks at multiple intervals
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 50);
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 100);
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 500);
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 1000);
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 2000);
		setTimeout(() => { checkForErrors(); removeErrorButtons(); }, 3000);

		return () => {
			clearInterval(intervalId);
			clearInterval(errorCheckInterval);
		};
	}, [stripe_id, stripeLoaded]);

	const formatDate = (dateValue) => {
		if (!dateValue) return "Date not available";
		try {
			let date;
			if (typeof dateValue === "number") {
				date = new Date(dateValue * 1000);
			} else if (typeof dateValue === "string") {
				date = new Date(dateValue);
			} else {
				return dateValue.toString();
			}
			if (isNaN(date.getTime())) {
				const dateMatch = dateValue.toString().match(/(\d{4}-\d{2}-\d{2})/);
				if (dateMatch) {
					date = new Date(dateMatch[1]);
				} else {
					return dateValue.toString();
				}
			}
			return date.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		} catch (error) {
			return dateValue?.toString() || "Date not available";
		}
	};

	const formatTime = (timeValue) => {
		if (!timeValue) return "Time not specified";
		try {
			if (typeof timeValue === "string") {
				const timeMatch = timeValue.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
				if (timeMatch) {
					const hours = parseInt(timeMatch[1], 10);
					const minutes = timeMatch[2];
					const ampm = hours >= 12 ? "PM" : "AM";
					const displayHours = hours % 12 || 12;
					return `${displayHours}:${minutes} ${ampm}`;
				}
				const time = new Date(`1970-01-01T${timeValue}`);
				if (!isNaN(time.getTime())) {
					return time.toLocaleTimeString("en-US", {
						hour: "numeric",
						minute: "2-digit",
						hour12: true,
					});
				}
			}
			return timeValue.toString();
		} catch (error) {
			return timeValue?.toString() || "Time not specified";
		}
	};

	const imageSrc = image || defaultImage;
	const eventDate = date ? formatDate(date) : "Date not available";
	const eventTime = time ? formatTime(time) : "Time not specified";

	// Handler functions
	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setRegisteredGuest((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e) => {
		setChecked(e.target.checked);
	};

	const handleEventRegister = async () => {
		if (!event_id) {
			alert("Event information is missing. Please try again.");
			return;
		}
		try {
			const registrationData = {
				event_id,
				firstname: registeredGuest.firstname,
				lastname: registeredGuest.lastname,
				email: registeredGuest.email,
				mobile: registeredGuest.mobile,
				sms_opt_in: checked,
			};
			await axios.post(`${backend}/events/${event_id}/register`, registrationData);
			setShowThankYouModal(true);
		} catch (error) {
			console.error("Error registering for event:", error);
			alert("Registration failed. Please try again.");
		}
	};

	const handleCloseOut = () => {
		setShowThankYouModal(false);
		navigate("/discover/events");
	};

	const handleImageError = (e) => {
		e.target.src = defaultImage;
	};

	const handleSupportClick = () => {
		// Open a mailto link or redirect to a contact page
		const subject = encodeURIComponent(`Support for Event: ${title}`);
		const body = encodeURIComponent(`Hello,\n\nI would like to support the event: ${title}\n\nPlease contact me with more information.\n\nThank you!`);
		window.location.href = `mailto:support@impactify.com?subject=${subject}&body=${body}`;
	};

	// If no event data after loading, show error
	if (!loading && (!event || Object.keys(event).length === 0)) {
		return (
			<div className="event-details-error">
				<div className="error-content">
					<h2>Event not found</h2>
					<p>This event may have been removed or the link is invalid.</p>
					<Button className="error-btn" onClick={() => navigate("/discover/events")}>
						Back to Events
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="event-details-page">
			{loading ? (
				<LoadingState message="Loading event details..." />
			) : (
				<>
					{/* Hero Section */}
					<div className="event-hero">
						<div className="event-hero-image-wrapper">
							<img 
								src={imageSrc} 
								alt={title || "Event"} 
								className="event-hero-image" 
								onError={handleImageError}
							/>
							<div className="event-hero-overlay"></div>
						</div>
						<div className="event-hero-content">
							<h1 className="event-hero-title">{title}</h1>
						</div>
					</div>

					<div className="event-details-container">
						<div className="event-content-grid">
							{/* Main Content Column */}
							<div className="event-details-column">
								{/* Info Cards */}
								<div className="event-info-grid">
									<div className="event-info-card">
										<IoLocationOutline className="event-info-icon" />
										<div className="event-info-content">
											<h3 className="event-info-label">Location</h3>
											<p className="event-info-value">{locationName || "Location not specified"}</p>
										</div>
									</div>

									<div className="event-info-card">
										<IoCalendarOutline className="event-info-icon" />
										<div className="event-info-content">
											<h3 className="event-info-label">Date</h3>
											<p className="event-info-value">{eventDate}</p>
										</div>
									</div>

									<div className="event-info-card">
										<IoTimeOutline className="event-info-icon" />
										<div className="event-info-content">
											<h3 className="event-info-label">Time</h3>
											<p className="event-info-value">{eventTime}</p>
										</div>
									</div>
								</div>

								{/* About Section */}
								<div className="event-about-section">
									<h2 className="event-section-title">About this event</h2>
									<div className="event-description">
										<p>{event_details || "No description available for this event."}</p>
									</div>
								</div>

								{/* Accessibility Section */}
								<div className="event-accessibility-section">
									<div className="accessibility-card">
										<GoQuestion className="accessibility-icon" />
										<div className="accessibility-content">
											<h3 className="accessibility-title">Accessibility</h3>
											<p className="accessibility-text">
												Have accessibility questions? Reply to your registration
												email to confirm your requirements or request more
												information.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Registration Sidebar */}
							<aside className="event-registration-column">
								{/* Support/Donation Section */}
								{stripe_id && (
									<div className="event-support-section">
										<div className="support-card">
											<IoHeart className="support-icon" />
											<h3 className="support-title">Support this event</h3>
											{!stripeError && stripeLoaded && buyButtonId ? (
												<div className="stripe-wrapper" id="stripe-wrapper-check">
													<div className="stripe-container">
														<StripeBuy 
															buyButtonId={buyButtonId} 
															label="Donate to support this event"
															onError={() => {
																setStripeError(true);
																setStripeLoaded(false);
															}}
														/>
													</div>
													<button 
														className="support-fallback-btn support-fallback-alternative"
														onClick={handleSupportClick}
													>
														Or contact us to donate
													</button>
												</div>
											) : (
												<>
													<button 
														className="support-fallback-btn"
														onClick={handleSupportClick}
													>
														<IoHeart style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
														Support this event
													</button>
													<p className="support-fallback-text">
														Click to contact us about supporting this event
													</p>
												</>
											)}
										</div>
									</div>
								)}

								{/* Registration Form */}
								<div className="event-registration-card">
									<h2 className="registration-title">Register to Attend</h2>
									<Form className="registration-form">
										<div className="form-row">
											<Form.Group controlId="firstName" className="form-group">
												<Form.Control
													type="text"
													placeholder="First name"
													value={registeredGuest.firstname}
													name="firstname"
													onChange={handleTextChange}
													className="form-input"
													required
												/>
											</Form.Group>
											<Form.Group controlId="lastName" className="form-group">
												<Form.Control
													type="text"
													placeholder="Last name"
													value={registeredGuest.lastname}
													name="lastname"
													onChange={handleTextChange}
													className="form-input"
													required
												/>
											</Form.Group>
										</div>

										<Form.Group controlId="email" className="form-group">
											<Form.Control
												type="email"
												placeholder="Email address"
												value={registeredGuest.email}
												name="email"
												onChange={handleTextChange}
												className="form-input"
												required
											/>
										</Form.Group>

										<Form.Group controlId="mobile" className="form-group">
											<Form.Control
												type="tel"
												placeholder="Mobile number"
												value={registeredGuest.mobile}
												name="mobile"
												onChange={handleTextChange}
												className="form-input"
											/>
										</Form.Group>

										{/* <Form.Group controlId="smsUpdates" className="sms-checkbox-group">
											<Form.Check
												type="checkbox"
												label="I want to receive occasional automated text messages from Impactify with updates about how to stay involved, such as recommended events and other actions. Message and data rates may apply. Message frequency varies. Text STOP to cancel or HELP for help. By opting in you agree to our SMS Shortcode Terms of Service."
												checked={checked}
												onChange={handleCheckboxChange}
												className="form-checkbox"
											/>
										</Form.Group> */}

										<button
											type="button"
											className="register-btn"
											onClick={handleEventRegister}
										>
											Register for Event
										</button>

										<div className="form-footer">
											<p className="form-footer-text">
												By registering, you agree to our{" "}
												<a href="#" className="form-link">Terms of Service</a> and{" "}
												<a href="#" className="form-link">Privacy Policy</a>.
											</p>
										</div>

										<div className="form-contact-section">
											<a href="#" className="form-contact-link">
												Contact organization
											</a>
										</div>
									</Form>
								</div>
							</aside>
						</div>
					</div>

					{/* Thank You Modal */}
					<Modal
						show={showThankYouModal}
						onHide={() => setShowThankYouModal(false)}
						centered
						className="thank-you-modal"
					>
						<Modal.Header closeButton className="modal-header-custom">
							<Modal.Title>Thank You!</Modal.Title>
						</Modal.Header>
						<Modal.Body className="modal-body-custom">
							<div className="thank-you-content">
								<IoHeart className="thank-you-icon" />
								<p>Thank you for registering! We're excited to have you join us.</p>
							</div>
						</Modal.Body>
						<Modal.Footer className="modal-footer-custom">
							<Button className="modal-close-btn" onClick={handleCloseOut}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</div>
	);
}

export default EventDetailsPage;
