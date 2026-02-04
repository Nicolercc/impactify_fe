import React from "react";
import "./LoadingState.css";

/**
 * Reusable Loading Component
 * @param {string} variant - 'spinner' | 'skeleton' | 'fullscreen' | 'inline'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} message - Optional loading message
 * @param {boolean} fullScreen - Whether to show full screen overlay
 */
function LoadingState({ 
	variant = 'spinner', 
	size = 'medium', 
	message = null,
	fullScreen = false 
}) {
	if (variant === 'skeleton') {
		return (
			<div className={`loading-skeleton ${size}`} role="status" aria-label="Loading">
				<div className="skeleton-item"></div>
				<div className="skeleton-item"></div>
				<div className="skeleton-item"></div>
			</div>
		);
	}

	if (variant === 'fullscreen' || fullScreen) {
		return (
			<div className="loader-fullscreen" role="status" aria-label="Loading">
				<div className={`loader loader-${size}`}></div>
				{message && <p className="loader-message">{message}</p>}
			</div>
		);
	}

	return (
		<div className={`loader-wrapper ${variant === 'inline' ? 'loader-inline' : ''}`} role="status" aria-label="Loading">
			<div className={`loader loader-${size}`}></div>
			{message && <p className="loader-message">{message}</p>}
		</div>
	);
}

export default LoadingState;
