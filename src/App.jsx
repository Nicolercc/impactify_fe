import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailsPage from "./Pages/EventDetailsPage";
import News from "./Pages/News";
import Events from "./Pages/Events";
import NewsDetailsPage from "./Pages/NewsDetailsPage";
import CreateEventPage from "./Pages/CreateEventPage";
import Donations from "./Pages/Donations";
import StripeDonation from "./Components/Stripe/StripeDonation";
import MainNavigationBar from "./Components/NavigationBars/MainNavigationBar";
import Homepage from "./Pages/Homepage";
import useScrollPosition from "./Hooks/ScrollPositionProvider";
import StripePaymentEvent from "./Components/Stripe/StripePaymentEvent";
import StripeBuy from "./Components/Stripe/StripeBuy";
import ProofHero from "./Components/SocialProof/ProofHero";
import ThankYou from "./Pages/ThankYou/ThankYou";
import CardNew from "./Components/Card/CardNew";
import SearchResultPage from "./Pages/SearchResultPage";
import Footer from "./Components/Footer/Footer";
import SignUpPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CivicInfo from "./Components/CivicApi/CivicInfo";
import Voting from "./Pages/Voting";
import NewsApi from "./Components/NewsApi/NewsApi";
import SearchPage from "./Pages/Search/SearchPage";
import FundraiseFacts from "./Pages/Fundraise/FundraiseFacts";
import DetailsTest from "./Pages/Test/DetailsTest";
import VoterInfoW from "./Components/CivicApi/VoterInfoW";
import LoadingState from "./Components/LoadingState/LoadingState";
import "./App.css";
import BACKEND_URL from "./config/backend";

function App() {
	const backend = BACKEND_URL;
	const [backendEvents, setBackendEvents] = useState([]);
	const [backendNews, setBackendNews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				// ==========================================
				// 🔥 FETCH EVENTS
				// ==========================================
				console.log("=== FETCHING EVENTS ===");
				console.log("Backend URL:", `${backend}/events`);

				const eventsResponse = await axios.get(`${backend}/events`);

				console.log("✅ Events Response received");
				console.log(
					"Full response:",
					JSON.stringify(eventsResponse.data, null, 2),
				);

				// Extract events array - handle ALL possible nested structures
				let events = [];

				// Helper function to recursively find arrays
				const findArray = (obj, depth = 0) => {
					if (depth > 5) return null; // Prevent infinite recursion
					if (Array.isArray(obj) && obj.length > 0) return obj;
					if (obj && typeof obj === "object" && !Array.isArray(obj)) {
						// Check common property names first
						const commonKeys = ["data", "events", "items", "results", "list"];
						for (const key of commonKeys) {
							if (Array.isArray(obj[key]) && obj[key].length > 0) {
								return obj[key];
							}
						}
						// Then check all properties
						for (const key in obj) {
							const result = findArray(obj[key], depth + 1);
							if (result) return result;
						}
					}
					return null;
				};

				// Try direct array first
				if (
					Array.isArray(eventsResponse.data) &&
					eventsResponse.data.length > 0
				) {
					events = eventsResponse.data;
					console.log("✅ Events found directly in response.data");
				}
				// Try common nested structures
				else if (
					eventsResponse.data?.data?.data &&
					Array.isArray(eventsResponse.data.data.data)
				) {
					events = eventsResponse.data.data.data;
					console.log("✅ Events found in response.data.data.data");
				} else if (
					eventsResponse.data?.data &&
					Array.isArray(eventsResponse.data.data)
				) {
					events = eventsResponse.data.data;
					console.log("✅ Events found in response.data.data");
				} else if (
					eventsResponse.data?.events &&
					Array.isArray(eventsResponse.data.events)
				) {
					events = eventsResponse.data.events;
					console.log("✅ Events found in response.data.events");
				}
				// Use recursive search as last resort
				else {
					const found = findArray(eventsResponse.data);
					if (found) {
						events = found;
						console.log("✅ Events found by recursive search");
					} else {
						console.error("❌ Could not find events array in response");
						console.error("Response structure:", eventsResponse.data);
						console.error(
							"Available keys:",
							Object.keys(eventsResponse.data || {}),
						);
					}
				}

				// Ensure we have a valid array
				events = Array.isArray(events) ? events : [];

				console.log(`📊 Total events extracted: ${events.length}`);
				if (events.length > 0) {
					console.log("📋 First event:", events[0]);
					console.log("📋 Event fields:", Object.keys(events[0]));
				}

				// CRITICAL: Set the events state
				setBackendEvents(events);
				console.log(
					"✅ backendEvents state updated with",
					events.length,
					"events",
				);

				// ==========================================
				// 📰 FETCH NEWS
				// ==========================================
				console.log("=== FETCHING NEWS ===");
				const newsResponse = await axios.get(`${backend}/news`);

				let news = [];

				if (Array.isArray(newsResponse.data)) {
					news = newsResponse.data;
				} else if (newsResponse.data && typeof newsResponse.data === "object") {
					if (Array.isArray(newsResponse.data.news)) {
						news = newsResponse.data.news;
					} else if (Array.isArray(newsResponse.data.data)) {
						news = newsResponse.data.data;
					}
				}

				console.log(`📰 Total news: ${news.length}`);
				setBackendNews(news);
			} catch (error) {
				console.error("❌ Error fetching data:", error);
				console.error("Error details:", error.response?.data || error.message);
				setError(error.message);

				// Set empty arrays on error so app doesn't crash
				setBackendEvents([]);
				setBackendNews([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [backend]);

	// ==========================================
	// 🎯 DEBUG OUTPUT - Shows current state
	// ==========================================
	console.log("=== APP STATE ===");
	console.log("Loading:", loading);
	console.log("Error:", error);
	console.log("Backend Events:", backendEvents);
	console.log("Backend Events Length:", backendEvents.length);
	console.log("==================");

	// Show loading state
	if (loading) {
		return <LoadingState variant="fullscreen" message="Loading Impactify..." />;
	}

	// Optional: Show error state
	// if (error) {
	// 	return <div style={{padding: '50px', textAlign: 'center', color: 'red'}}>
	// 		Error: {error}
	// 	</div>;
	// }

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Homepage backendEvents={backendEvents} />
						</>
					}
				/>
				<Route
					path="/*"
					element={
						<>
							<MainNavigationBar />
							<Content
								backendEvents={backendEvents}
								backendNews={backendNews}
							/>
							<Footer className="footer" />
						</>
					}
				/>
			</Routes>
		</Router>
	);
}

function Content({ backendEvents, backendNews }) {
	return (
		<div>
			<Routes>
				<Route
					path="/discover/news-details/:id"
					element={<NewsDetailsPage />}
				/>
				<Route path="/search-results" element={<SearchResultPage />} />
				<Route
					path="/discover/news"
					element={<News backendNews={backendNews} />}
				/>
				<Route
					path="/discover/events"
					element={<Events backendEvents={backendEvents} />}
				/>
				<Route path="/discover/donations" element={<Donations />} />
				<Route path="/discover/users/login" element={<LoginPage />} />
				<Route path="/discover/users/signup" element={<SignUpPage />} />
				<Route path="/discover/thankyou" element={<ThankYou />} />
				<Route path="/discover/create-event" element={<CreateEventPage />} />
				<Route path="/discover/eventdetails/:id" element={<EventDetailsPage />} />
				<Route path="/discover/facts" element={<FundraiseFacts />} />
				<Route path="/discover/voting" element={<Voting />} />
				<Route
					path="/discover/create-event/donation"
					element={<StripeDonation />}
				/>
				<Route path="/search" element={<SearchPage />} />
				<Route path="/howitworks" element={<ProofHero />} />
			</Routes>
		</div>
	);
}

export default App;
