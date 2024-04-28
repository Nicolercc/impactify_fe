import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Progressbar.css";

const Progressbar = ({ donateAmount }) => {
	const [donationGoal, setDonationGoal] = useState(175.00);
	const [verifiedFunds, setVerifiedFunds] = useState(0);
	const [currentAmount, setCurrentAmount] = useState(50);
	//WEBHOOK INTERGRATION FETCH HERE FOR VerifiedFunds/CURRENT AMOUNT FROM STRIPE

	useEffect(() => {
		setDonationGoal(donateAmount + 10.00);
	}, [donateAmount]);

	const percentage = Math.min((currentAmount / donationGoal) * 100, 100);

	return (
		<div className="progress-container mb-4 ">
			<span class=" mx-4 ">Current:{currentAmount} </span>
			<span class="">Goal: {donationGoal}</span>
			<ProgressBar
				animated
				now={percentage}
				label={`${percentage.toFixed(0)}%`}
				variant="success"
				style={{ width: "30vh", height: "110%", backgroundColor: "#BC9EC1" }}
				className="mt-2"
			/>
		</div>
	);
};

export default Progressbar;
