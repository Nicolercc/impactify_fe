import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailsPage from "./Pages/EventDetailsPage";
import News from "./Pages/News";
import Events from "./Pages/Events";
import "./App.css";
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
import VoterModal from "./Components/CivicApi/VoterModal";
import NewsApi from "./Components/NewsApi/NewsApi";
import SearchPage from "./Pages/Search/SearchPage";
import FundraiseFacts from "./Pages/Fundraise/FundraiseFacts";
import DetailsTest from "./Pages/Test/DetailsTest";
import VoterInfoW from "./Components/CivicApi/VoterInfoW";

function App() {
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const [backendEvents, setBackendEvents] = useState([]);
	const [backendNews, setBackendNews] = useState([]);
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`${backend}/events`);
				let events = response.data.data;
				setBackendEvents(events);
			} catch (error) {
				console.error("Error Fetching Backend Events:", error);
			}

			try {
				const response = await axios.get(`${backend}/news`);
				let events = response.data.data;
				setBackendNews(events);
			} catch (error) {
				console.error("Error Fetching Backend Events:", error);
			}
		};
		fetchEvents();
	}, []);

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
							<Content backendEvents={backendEvents} />
							<Footer className="footer" />
						</>
					}
				/>
			</Routes>
		</Router>
	);
}

function Content({ backendEvents }) {
	return (
		<div>
			<Routes>
				<Route
					path="/discover/news-details/:id"
					element={<NewsDetailsPage />}
				/>
				<Route path="/search-results" element={<SearchResultPage />} />
				<Route path="/discover/news" element={<News />} />
				<Route
					path="/discover/events"
					element={<Events backendEvents={backendEvents} />}
				/>
				<Route path="/discover/donations" element={<Donations />} />
				<Route path="/discover/users/login" element={<LoginPage />} />
				<Route path="/discover/users/signup" element={<SignUpPage />} />
				<Route path="/discover/thankyou" element={<ThankYou />} />
				<Route path="/discover/create-event" element={<CreateEventPage />} />
				<Route path="/discover/eventdetails/:id" element={<DetailsTest />} />
				<Route path="/discover/facts" element={<FundraiseFacts />} />
				<Route path="/discover/voting" element={<VoterModal />} />
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
