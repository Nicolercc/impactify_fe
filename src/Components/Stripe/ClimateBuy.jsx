import React from "react";

const ClimateBuy = () => {
	const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE;
	const climateBuyButton = import.meta.env.VITE_CLIMATE_EVENT;

	return (
		<div className="mt-4 mx-5">
			<stripe-buy-button
				buy-button-id={climateBuyButton}
				publishable-key={stripePublishKey}
				
			></stripe-buy-button>
		</div>
	);
};

export default ClimateBuy;
