import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { 
	IoCalendarOutline, 
	IoTimeOutline, 
	IoLocationOutline,
	IoImageOutline,
	IoCheckmarkCircle,
	IoCloseCircle,
	IoGlobeOutline,
	IoPeopleOutline,
	IoSparkles,
	IoRocket,
	IoHeart,
	IoStar,
	IoMegaphone,
	IoHandLeft,
	IoFlame,
	IoBulb,
	IoRibbon
} from "react-icons/io5";
import { 
	MdEventNote, 
	MdPhotoLibrary,
	MdGroups,
	MdCelebration,
	MdTrendingUp,
	MdPublic
} from "react-icons/md";
import { 
	FaHandsHelping,
	FaUsers,
	FaHeart,
	FaRocket
} from "react-icons/fa";
import AutoComplete from "../Components/GeoLocation/AutoComplete";
import Is_donation from "../Components/DonationModal.jsx/IsDonation";
import "./CreateEventPage.css";

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const keywordOptions = [
	{ value: "activism", label: "Activism" },
	{ value: "advocacy", label: "Advocacy" },
	{ value: "campaigns", label: "Campaigns" },
	{ value: "civil rights", label: "Civil Rights" },
	{ value: "citizenship", label: "Citizenship" },
	{ value: "community organizing", label: "Community Organizing" },
	{ value: "economic justice", label: "Economic Justice" },
	{ value: "environmental activism", label: "Environmental Activism" },
	{ value: "equality", label: "Equality" },
	{ value: "feminism", label: "Feminism" },
	{ value: "gender equality", label: "Gender Equality" },
	{ value: "global issues", label: "Global Issues" },
	{ value: "grassroots movements", label: "Grassroots Movements" },
	{ value: "gun control", label: "Gun Control" },
	{ value: "human rights", label: "Human Rights" },
	{ value: "inclusion", label: "Inclusion" },
	{ value: "lgbt rights", label: "LGBT Rights" },
	{ value: "peace", label: "Peace" },
	{ value: "political activism", label: "Political Activism" },
	{ value: "politics", label: "Politics" },
	{ value: "protest", label: "Protest" },
	{ value: "racial justice", label: "Racial Justice" },
	{ value: "social change", label: "Social Change" },
	{ value: "social justice", label: "Social Justice" },
	{ value: "solidarity", label: "Solidarity" },
	{ value: "voting rights", label: "Voting Rights" },
];

function CreateEventPage() {
	const navigate = useNavigate();
	
	// Form state
	const [formData, setFormData] = useState({
		user_id: null,
		event_title: "",
		event_date: "",
		event_time: "",
		event_location: "",
		lat: 0,
		lng: 0,
		event_details: "",
		event_keyword: [],
		event_photo: "",
		is_virtual: false,
		rsvp: false,
		is_donation: false,
		stripe_id: "",
	});

	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [location, setLocation] = useState("");
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [stripeId, setStripeId] = useState("");
	const [isDonation, setIsDonation] = useState(false);
	
	// UI state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [errors, setErrors] = useState({});

	// Update form data when location or stripe changes
	useEffect(() => {
		setFormData(prev => ({
			...prev,
			event_location: location,
			lat: lat,
			lng: lng,
			stripe_id: stripeId,
			is_donation: isDonation,
		}));
	}, [location, lat, lng, stripeId, isDonation]);

	const handleInputChange = (e) => {
		const { id, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: type === "checkbox" ? checked : value,
		}));
		// Clear error for this field
		if (errors[id]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[id];
				return newErrors;
			});
		}
	};

	const handleKeywordsChange = (selectedOptions) => {
		const values = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
		setSelectedKeywords(selectedOptions || []);
		setFormData(prev => ({
			...prev,
			event_keyword: values,
		}));
	};

	const validateForm = () => {
		const newErrors = {};
		
		if (!formData.event_title.trim()) {
			newErrors.event_title = "Event title is required";
		}
		if (!formData.event_date) {
			newErrors.event_date = "Event date is required";
		}
		if (!formData.event_time) {
			newErrors.event_time = "Event time is required";
		}
		if (!formData.event_location.trim()) {
			newErrors.event_location = "Event location is required";
		}
		if (!formData.event_details.trim()) {
			newErrors.event_details = "Event description is required";
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitError("");
		setSubmitSuccess(false);

		if (!validateForm()) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(`${backend}/events`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to create event");
			}

			const result = await response.json();
			setSubmitSuccess(true);
			
			// Redirect after 2 seconds
			setTimeout(() => {
				navigate("/discover/events");
			}, 2000);
		} catch (error) {
			console.error("Error creating event:", error);
			setSubmitError(error.message || "An error occurred while creating your event. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="create-event-page">
			{/* Decorative Side Icons */}
			<div className="decorative-icons-left">
				<IoSparkles className="decorative-icon icon-1" />
				<IoRocket className="decorative-icon icon-2" />
				<IoHeart className="decorative-icon icon-3" />
				<IoStar className="decorative-icon icon-4" />
				<IoMegaphone className="decorative-icon icon-5" />
				<IoHandLeft className="decorative-icon icon-6" />
			</div>
			<div className="decorative-icons-right">
				<IoFlame className="decorative-icon icon-1" />
				<IoBulb className="decorative-icon icon-2" />
				<IoRibbon className="decorative-icon icon-3" />
				<MdCelebration className="decorative-icon icon-4" />
				<MdTrendingUp className="decorative-icon icon-5" />
				<FaHandsHelping className="decorative-icon icon-6" />
			</div>

			{/* Background Pattern */}
			<div className="background-pattern"></div>
			<div className="background-gradient"></div>

			<div className="create-event-container">
				{/* Header */}
				<div className="create-event-header">
					<div className="header-icons">
						<MdEventNote className="header-icon-left" />
						<IoSparkles className="header-icon-center" />
						<MdCelebration className="header-icon-right" />
					</div>
					<h1 className="create-event-title">
						Create Your Event
					</h1>
					<p className="create-event-subtitle">
						Share your cause and connect with your community
					</p>
					<div className="header-decoration">
						<IoStar className="star-icon" />
						<IoStar className="star-icon" />
						<IoStar className="star-icon" />
					</div>
				</div>

				{/* Success Message */}
				{submitSuccess && (
					<div className="alert alert-success" role="alert">
						<IoCheckmarkCircle className="alert-icon" />
						<div>
							<strong>Success!</strong> Your event has been created successfully.
							Redirecting to events page...
						</div>
					</div>
				)}

				{/* Error Message */}
				{submitError && (
					<div className="alert alert-error" role="alert">
						<IoCloseCircle className="alert-icon" />
						<div>
							<strong>Error:</strong> {submitError}
						</div>
				</div>
			)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="create-event-form" noValidate>
					{/* Basic Information Section */}
					<section className="form-section">
						<div className="section-header">
							<MdEventNote className="section-icon" />
							<h2 className="section-title">Basic Information</h2>
						</div>

						<div className="form-grid">
							<div className="form-group full-width">
								<label htmlFor="event_title" className="form-label">
									Event Title <span className="required">*</span>
								</label>
								<input
									type="text"
									id="event_title"
									className={`form-input ${errors.event_title ? "error" : ""}`}
									placeholder="Enter a compelling event title"
									value={formData.event_title}
									onChange={handleInputChange}
									required
									aria-invalid={errors.event_title ? "true" : "false"}
									aria-describedby={errors.event_title ? "event_title-error" : undefined}
								/>
								{errors.event_title && (
									<span id="event_title-error" className="error-message" role="alert">
										{errors.event_title}
									</span>
								)}
							</div>

							<div className="form-group full-width">
								<label htmlFor="event_details" className="form-label">
									Description <span className="required">*</span>
								</label>
								<textarea
									id="event_details"
									className={`form-input form-textarea ${errors.event_details ? "error" : ""}`}
									placeholder="Describe your event, its purpose, and what attendees can expect..."
									value={formData.event_details}
									onChange={handleInputChange}
									rows={5}
									required
									aria-invalid={errors.event_details ? "true" : "false"}
									aria-describedby={errors.event_details ? "event_details-error" : undefined}
								/>
								{errors.event_details && (
									<span id="event_details-error" className="error-message" role="alert">
										{errors.event_details}
									</span>
								)}
							</div>
						</div>
					</section>

					{/* Date & Time Section */}
					<section className="form-section">
						<div className="section-header">
							<IoCalendarOutline className="section-icon" />
							<h2 className="section-title">Date & Time</h2>
						</div>

						<div className="form-grid">
							<div className="form-group">
								<label htmlFor="event_date" className="form-label">
									<IoCalendarOutline className="label-icon" />
									Event Date <span className="required">*</span>
								</label>
								<input
									type="date"
									id="event_date"
									className={`form-input ${errors.event_date ? "error" : ""}`}
									value={formData.event_date}
									onChange={handleInputChange}
									min={new Date().toISOString().split("T")[0]}
									required
									aria-invalid={errors.event_date ? "true" : "false"}
									aria-describedby={errors.event_date ? "event_date-error" : undefined}
								/>
								{errors.event_date && (
									<span id="event_date-error" className="error-message" role="alert">
										{errors.event_date}
									</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="event_time" className="form-label">
									<IoTimeOutline className="label-icon" />
									Start Time <span className="required">*</span>
								</label>
								<input
									type="time"
									id="event_time"
									className={`form-input ${errors.event_time ? "error" : ""}`}
									value={formData.event_time}
									onChange={handleInputChange}
									required
									aria-invalid={errors.event_time ? "true" : "false"}
									aria-describedby={errors.event_time ? "event_time-error" : undefined}
								/>
								{errors.event_time && (
									<span id="event_time-error" className="error-message" role="alert">
										{errors.event_time}
									</span>
								)}
							</div>
						</div>
					</section>

					{/* Location Section */}
					<section className="form-section">
						<div className="section-header">
							<IoLocationOutline className="section-icon" />
							<h2 className="section-title">Location</h2>
						</div>

						<div className="form-grid">
							<div className="form-group full-width">
								<label htmlFor="event_location" className="form-label">
									<IoLocationOutline className="label-icon" />
									Event Location <span className="required">*</span>
								</label>
								<div className={`location-input-wrapper ${errors.event_location ? "error" : ""}`}>
									<AutoComplete
										setLocation={setLocation}
										setLat={setLat}
										setLng={setLng}
										lat={lat}
										lng={lng}
									/>
								</div>
								{errors.event_location && (
									<span className="error-message" role="alert">
										{errors.event_location}
									</span>
								)}
							</div>

							<div className="form-group">
								<label className="form-label checkbox-label">
									<input
										type="checkbox"
										id="is_virtual"
										className="form-checkbox"
										checked={formData.is_virtual}
										onChange={handleInputChange}
									/>
									<IoGlobeOutline className="label-icon" />
									<span>This is a virtual event</span>
								</label>
							</div>
						</div>
					</section>

					{/* Additional Details Section */}
					<section className="form-section">
						<div className="section-header">
							<MdPhotoLibrary className="section-icon" />
							<h2 className="section-title">Additional Details</h2>
						</div>

						<div className="form-grid">
							<div className="form-group full-width">
								<label htmlFor="event_photo" className="form-label">
									<IoImageOutline className="label-icon" />
									Event Image URL
								</label>
								<input
									type="url"
									id="event_photo"
									className="form-input"
									placeholder="https://example.com/image.jpg"
									value={formData.event_photo}
									onChange={handleInputChange}
								/>
								<small className="form-hint">
									Enter a URL to an image that represents your event
								</small>
							</div>

							<div className="form-group full-width">
								<label htmlFor="event_keyword" className="form-label">
									Keywords
								</label>
								<Select
									isMulti
									options={keywordOptions}
									value={selectedKeywords}
									onChange={handleKeywordsChange}
									className="keyword-select"
									classNamePrefix="select"
									placeholder="Select keywords that describe your event..."
									isClearable
								/>
								<small className="form-hint">
									Select one or more keywords to help people find your event
								</small>
							</div>
						</div>
					</section>

					{/* Event Options Section */}
					<section className="form-section">
						<div className="section-header">
							<IoPeopleOutline className="section-icon" />
							<h2 className="section-title">Event Options</h2>
						</div>

						<div className="form-grid">
							<div className="form-group">
								<label className="form-label checkbox-label">
									<input
										type="checkbox"
										id="rsvp"
										className="form-checkbox"
										checked={formData.rsvp}
										onChange={handleInputChange}
									/>
									<span>Require RSVP</span>
								</label>
								<small className="form-hint">
									Check if attendees need to RSVP for this event
								</small>
							</div>

							<div className="form-group full-width">
								<Is_donation
									isDonation={isDonation}
									setIsDonation={setIsDonation}
									stripeId={stripeId}
									handleStripeId={(e) => setStripeId(e.target.value)}
								/>
							</div>
						</div>
					</section>

					{/* Submit Button */}
					<div className="form-actions">
						<button
							type="submit"
							className="submit-button"
							disabled={isSubmitting}
							aria-busy={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<span className="spinner"></span>
									Creating Event...
								</>
							) : (
								<>
									<IoCheckmarkCircle className="button-icon" />
									Create Event
								</>
							)}
						</button>
						<button
							type="button"
							className="cancel-button"
							onClick={() => navigate("/discover/events")}
							disabled={isSubmitting}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateEventPage;
