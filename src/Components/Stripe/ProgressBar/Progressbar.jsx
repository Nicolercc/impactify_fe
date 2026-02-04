import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Progressbar.css";

const Progressbar = ({ donateAmount = 0 }) => {
	const [donationGoal, setDonationGoal] = useState(0);
	const [currentAmount, setCurrentAmount] = useState(0);

	useEffect(() => {
		const safeAmount = Number.isFinite(Number(donateAmount))
			? Number(donateAmount)
			: 0;

		// Simple placeholder logic:
		// goal is slightly above amount, current is the amount itself.
		setDonationGoal(safeAmount > 0 ? safeAmount * 1.2 : 100);
		setCurrentAmount(safeAmount);
	}, [donateAmount]);

	const percentage =
		donationGoal > 0
			? Math.min((currentAmount / donationGoal) * 100, 100)
			: 0;

	return (
		<div className="progress-container mb-3">
			<div className="progress-labels" aria-hidden="true">
				<span className="current">
					Raised: ${currentAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
				</span>
				<span className="goal">
					Goal: ${donationGoal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
				</span>
			</div>

			<ProgressBar
				animated
				now={percentage}
				label={`${percentage.toFixed(0)}%`}
				variant="success"
				className="mt-1 donations-progress-bar"
				role="progressbar"
				aria-valuenow={Math.round(percentage)}
				aria-valuemin={0}
				aria-valuemax={100}
			/>
		</div>
	);
};

export default Progressbar;
