import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Progressbar from "../Components/Stripe/ProgressBar/Progressbar";
import axios from "axios";
import Donation1 from "../Components/Stripe/Donation1";
import UkraineBuy from "../Components/Stripe/UkraineBuy";
import CleanUpBuy from "../Components/Stripe/CleanUpBuy";
import ClimateBuy from "../Components/Stripe/ClimateBuy";
import climateUser from "../assets/climateUser.jpg";
import guyUser from "../assets/guyUser.jpg";
import ukraineUser from "../assets/ukraineUser.jpg";
import loader from "../Components/LoadingState/LoadingState";
import DarynaDon from '../assets/DarynaDon.png'
import "./Donations.css";

function Donations() {
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const [donationsData, setDonationsData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${backend}/donations`);
				const donations = response.data;
				console.log(donations);
				setDonationsData(donations);
			} catch (error) {
				console.error("Error Fetching Backend Events:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="loader-wrapper">
				<div className="loader"></div>
			</div>
		);
	}
	console.log(donationsData);
	const donate1 = donationsData[0]?.donation_description;
	const donate1Amount = donationsData[0]?.donation_amount;
	const donate2 = donationsData[1]?.donation_description;
	const donate2Amount = donationsData[1]?.donation_amount;
	const donate3 = donationsData[2]?.donation_description;
	const donate3Amount = donationsData[2]?.donation_amount;

	return (
		<div fluid className="donations-container">
			<div className="d-flex justify-content-center display-6 mb-2">
				Featured Donations
			</div>
			<p className="d-flex justify-content-center mb-4">
				Get active by supporting causes you resonate with.
			</p>

			<Row className="d-flex justify-content-center">
				<Col xs={12} md={6} lg={4}>
					<Card
						className="card"
						style={{
							borderRadius: "15px",
							marginBottom: "33px",
							alignItems: "center",
							// maxHeight: "478px",
							// minHeight: "478px",
						}}
					>
						<Donation1 />
						<div className="donation-info mt-2">
							<p className="fw-semibold mt-2 d-flex justify-content-center ">
							Beatrice Li
							</p>
							<div className="d-flex justify-content-center ">
								<img
									src={climateUser}
									alt="userpic"
									className="img-fluid p-2"
									style={{
										width: "65%",
										height: "28vh",
										borderRadius: "15px",
									}}
								/>
							</div>
							<div className="m-4 ">
								<p>{donate1}</p>
							</div>
							<div className="d-flex justify-content-center ">
								<div className=" d-flex justify-content-center">
									<Progressbar donateAmount={donate1Amount} />
								</div>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={12} md={6} lg={4}>
					<Card
						className="card"
						style={{
							borderRadius: "15px",

							alignItems: "center",
							// maxHeight: "478px",
							// minHeight: "478px",
						}}
					>
						<ClimateBuy />
						<div className="donation-info">
							<p className="fw-semibold mt-2 d-flex justify-content-center ">
								Luca Grey
							</p>
							<div className=" d-flex justify-content-center">
								<img
									src={guyUser}
									alt="userpic"
									className="img-fluid "
									style={{ width: "80%", borderRadius: "15px" }}
								/>
							</div>
							<div className="m-4 ">
								<p>{donate2}</p>
							</div>
							<div className=" d-flex justify-content-center">
								<Progressbar donateAmount={donate2Amount} />
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={12} md={6} lg={4}>
					<Card
						className="card"
						style={{
							borderRadius: "15px",
							// maxHeight: "478px",
							// minHeight: "478px",
							alignItems: "center",
						}}
					>
						<UkraineBuy />
						<div className="donation-info">
							<p className="fw-semibold mt-2 d-flex justify-content-center ">
							Daryna Vershinina
							</p>
							<div className=" d-flex justify-content-center">
								<img
									src={DarynaDon}
									alt="userpic"
									className="img-fluid p-2"
									style={{ width: "60%", height: "28vh", borderRadius: "15px" }}
								/>
							</div>
							<p className="m-3">{donate3}</p>
							<div className=" d-flex justify-content-center">
								<Progressbar donateAmount={donate3Amount} />
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Donations;
