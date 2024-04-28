import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
	FacebookShareButton,
	EmailShareButton,
	TwitterShareButton,
} from "react-share";
import RelatedEvents from "../RelatedEvents";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import loader from "../LoadingState/LoadingState";
import axios from "axios";
import "./NewsDetails.css";
const NewsDetails = () => {
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const [relatedEvents, setReleatedEvents] = useState([]);
	const [selectedEvent, setSeletedEvent] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const { news, article } = location.state;

	useEffect(() => {
		const fetchEvents = async () => {
			let fetchEventsData = [];

			try {
				const resposeBackend = await axios.get(`${backend}/events`);
				fetchEventsData = resposeBackend.data.data;
				console.log(resposeBackend);

				setReleatedEvents(fetchEventsData);
			} catch (error) {
				console.error("Error Fetching Backend Events:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, [news, article]);

	// console.log(relatedEvents);

	const handleReleatedClick = (eventObj) => {
		let selected = relatedEvents.find(
			(releated) => releated.event_id === eventObj.event_id
		);
		setSeletedEvent(selected);
		navigate(`/discover/eventdetails/${eventObj.event_id}`, {
			state: { event: selectedEvent },
		});
	};

	const formatDate = (dateString) => {
		const options = { month: "long", day: "numeric" };
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", options);
	};

	// Function to format the event time
	const formatTime = (timeString) => {
		const options = { hour: "numeric", minute: "2-digit", hour12: true };
		const time = new Date(`1970-01-01T${timeString}`);
		return time.toLocaleTimeString("en-US", options);
	};

	// console.log(article)
	const paragraphs = news?.news_content.split(/\n\n/);
	const articleText = article?.content.repeat(16);
	// console.log(articleText)
	return (
		<div className=" " styles={{}}>
			{loading ? (
				<div className="loader-wrapper">
					<div className="loader"></div>
				</div>
			) : (
				<>
					<div className="d-flex  news-details-container my-4" style={{}}>
						<Row>
							{/* <hr /> */}
							<Col md={6} sm={10} lg={8}>
								<div>
									<h4 className=" d-flex fs-2 mb-2 ">
										{news?.news_title || article.title}
									</h4>
									<div className="my-3">
										<span className="mx-2">By {news?.news_author}</span>
									</div>
								</div>
								<div style={{}}>
									<div className="">
										<img
											src={news?.news_image || article.urlToImage}
											style={{
												borderRadius: "15px",
												maxWidth: "100%",
												maxHeight: "100%",
											}}
											className=""
											alt="News"
										/>
									</div>
									<div className="share-icons mt-3">
										<div to="#" style={{ color: "#630f76" }}>
											<FacebookShareButton url="Impactify.com">
												<FaFacebookF className="mx-2" />
											</FacebookShareButton>
										</div>
										<div to="#" style={{ color: "#630f76" }}>
											<TwitterShareButton url="Impactify.com">
												<FaTwitter className="mx-2" />
											</TwitterShareButton>
										</div>
										<div to="#" style={{ color: "#630f76" }}>
											<EmailShareButton url="Impactify.com">
												<MdEmail className="mx-2" />
											</EmailShareButton>
										</div>
									</div>
									<hr style={{ width: "54vw" }} />

									{!article ? (
										paragraphs.map((paragraph, index) => (
											<p
												key={index}
												className=" my-3"
												style={{ marginRight: "28px" }}
											>
												{paragraph}
											</p>
										))
									) : (
										<p>{articleText}</p>
									)}
								</div>
							</Col>
							<Col md={2} sm={10} lg={3}>
								<div className="" style={{ marginTop: "9.5vh" }}>
									<div className="d-flex justify-content-center fw-semibold fs-4 ">
										Related Events
									</div>
									<div className="purple-underline mb-4" style={{}}></div>

									{relatedEvents.slice(4, 8).map((eventObj, index) => (
										<div
											key={index}
											className="box mx-4 card mb-3"
											onClick={() => {
												handleReleatedClick(eventObj);
											}}
										>
											<img
												src={eventObj.event_photo}
												alt={`Event ${index + 1}`}
												className="releated-event-image p-3"
												style={{
													borderRadius: "25px",
												}}
											/>

											<div
												key={index}
												className="mx-4 bottom"
												onClick={() => {
													handleReleatedClick(eventObj);
												}}
											>
												<div
													className="row mb-2 d-flex justify-content-center"
													style={{ paddingLeft: "15px" }}
												>
													<div className="col-4">
														<div className="">
															{formatDate(eventObj.event_date)}
														</div>
													</div>
													<div className="col-6">
														<div className="">
															{formatTime(eventObj.event_time)}
														</div>
													</div>
												</div>
												<div className="col-12 text-center">
													<div className="pb-3 event-title fw-semibold">
														{eventObj.event_title}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</Col>
						</Row>
					</div>
				</>
			)}
		</div>
	);
};

export default NewsDetails;
