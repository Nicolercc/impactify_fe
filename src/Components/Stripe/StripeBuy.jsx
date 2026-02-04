import React, { useState, useEffect } from "react";

const StripeBuy = ({ buyButtonId, label = "Donate now", description, onError }) => {
	const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE;
	const [stripeAvailable, setStripeAvailable] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		// Check if Stripe is available
		const checkStripe = () => {
			const hasStripeElement = customElements.get('stripe-buy-button');
			const hasStripeScript = document.querySelector('script[src*="stripe"]') || window.Stripe;
			
			if (stripePublishKey && buyButtonId && (hasStripeElement || hasStripeScript)) {
				setStripeAvailable(true);
				setHasError(false);
			} else {
				// Wait a bit for script to load
				setTimeout(() => {
					const stillHasElement = customElements.get('stripe-buy-button');
					const stillHasScript = window.Stripe;
					
					if (stillHasElement || stillHasScript) {
						setStripeAvailable(true);
						setHasError(false);
					} else {
						setStripeAvailable(false);
						setHasError(true);
						if (onError) onError();
					}
				}, 2000);
			}
		};

		checkStripe();

		// Listen for custom element registration
		const observer = new MutationObserver(() => {
			if (customElements.get('stripe-buy-button')) {
				setStripeAvailable(true);
				setHasError(false);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	}, [buyButtonId, stripePublishKey, onError]);

	const canUseStripe = Boolean(stripePublishKey && buyButtonId && stripeAvailable && !hasError);

	if (!canUseStripe) {
		return null; // Let parent component handle fallback
	}

	return (
		<div className="stripe-buy-wrapper" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
			<stripe-buy-button
				buy-button-id={buyButtonId}
				publishable-key={stripePublishKey}
				style={{ display: 'block' }}
			/>
		</div>
	);
};

export default StripeBuy;
