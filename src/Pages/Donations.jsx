import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { IoHeart, IoSparkles } from "react-icons/io5";
import Progressbar from "../Components/Stripe/ProgressBar/Progressbar";
import Donation1 from "../Components/Stripe/Donation1";
import UkraineBuy from "../Components/Stripe/UkraineBuy";
import CleanUpBuy from "../Components/Stripe/CleanUpBuy";
import ClimateBuy from "../Components/Stripe/ClimateBuy";
import climateUser from "../assets/climateUser.jpg";
import guyUser from "../assets/guyUser.jpg";
import DarynaDon from "../assets/DarynaDon.png";
import LoadingState from "../Components/LoadingState/LoadingState";
import "./Donations.css";

function normalizeDonationsPayload(payload) {
	if (Array.isArray(payload)) return payload;
	if (payload && typeof payload === "object") {
		if (Array.isArray(payload.data)) return payload.data;
		if (Array.isArray(payload.donations)) return payload.donations;
		for (const key of Object.keys(payload)) {
			if (Array.isArray(payload[key])) return payload[key];
		}
	}
	return [];
}

function Donations() {
	const backend = "http://localhost:4000";
	const [donationsData, setDonationsData] = useState([]);
	const [status, setStatus] = useState("loading"); // loading | success | empty | error
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setStatus("loading");
			setErrorMessage("");
			try {
				const response = await axios.get(`${backend}/donations`);
				const normalized = normalizeDonationsPayload(response.data);
				setDonationsData(normalized);
				setStatus(normalized.length > 0 ? "success" : "empty");
			} catch (error) {
				setDonationsData([]);
				setStatus("error");
				setErrorMessage(
					error?.response?.data?.message ||
						error?.message ||
						"Unable to load donations right now."
				);
			}
		};
		fetchData();
	}, [backend]);

	const featuredDonations = useMemo(() => {
		const d0 = donationsData[0] || {};
		const d1 = donationsData[1] || {};
		const d2 = donationsData[2] || {};

		return [
		{
			name: "Beatrice Li",
				tagline: "Climate justice champion",
				description:
					d0.donation_description ||
					"Support grassroots climate action and frontline communities.",
				amount: Number(d0.donation_amount || 0),
			image: climateUser,
			component: <Donation1 />,
		},
		{
			name: "Luca Grey",
				tagline: "Future generations advocate",
				description:
					d1.donation_description ||
					"Help protect our planet through local clean-ups and education.",
				amount: Number(d1.donation_amount || 0),
			image: guyUser,
			component: <ClimateBuy />,
		},
		{
			name: "Daryna Vershinina",
				tagline: "Global solidarity leader",
				description:
					d2.donation_description ||
					"Stand with communities impacted by conflict and displacement.",
				amount: Number(d2.donation_amount || 0),
			image: DarynaDon,
			component: <UkraineBuy />,
		},
	];
	}, [donationsData]);

	if (status === "loading") {
		return <LoadingState message="Loading donation campaigns..." />;
	}

	return (
		<Container fluid className="donations-container">
			<section
				className="donations-hero"
				aria-labelledby="donations-heading"
			>
				<div className="donations-hero-icons" aria-hidden="true">
					<IoSparkles className="donations-hero-icon icon-1" />
					<IoHeart className="donations-hero-icon icon-2" />
					<IoSparkles className="donations-hero-icon icon-3" />
				</div>
				<h1 id="donations-heading" className="donations-title">
					Fuel movements that matter
				</h1>
				<p className="donations-subtitle">
					Your contribution powers real people, real communities, and real change.
				</p>
			</section>

			{status === "error" && (
				<div className="donations-message" role="alert">
					<p>{errorMessage}</p>
				</div>
			)}

			{status === "empty" && (
				<div className="donations-message">
					<p>
						We don&apos;t have active donation campaigns right now. Check back soon to
						support new impact projects.
					</p>
				</div>
			)}

			{status === "success" && (
				<Row className="donations-row" as="section" aria-label="Featured donation campaigns">
					{featuredDonations.map((donation, index) => (
						<Col
							key={index}
							xs={12}
							md={6}
							lg={4}
							className="donation-col"
						>
							<Card className="donation-card" as="article">
								<div className="donation-card-top">
									<div className="donation-pill">
										<span className="donation-pill-dot" />
										<span className="donation-pill-text">Give once or monthly</span>
									</div>
									<div className="donation-stripe-wrapper">
										{donation.component}
									</div>
			</div>

							<div className="donation-info">
									<header className="donor-header">
								<div className="donor-image-wrapper">
									<img
										src={donation.image}
										alt={`${donation.name} profile`}
										className="donor-image"
									/>
								</div>
										<div className="donor-meta">
											<p className="donor-name">{donation.name}</p>
											<p className="donor-tagline">{donation.tagline}</p>
										</div>
									</header>

								<div className="donation-description-wrapper">
										<p className="donation-description">
											{donation.description}
										</p>
								</div>

								<div className="progress-wrapper">
									<Progressbar donateAmount={donation.amount} />
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>
			)}
		</Container>
	);
}

export default Donations;
