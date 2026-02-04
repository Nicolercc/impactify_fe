import React, { useMemo } from "react";
import MainContent from "../MainContent";
import { IoSparkles, IoCalendarOutline, IoPeopleOutline } from "react-icons/io5";
import { MdTrendingUp } from "react-icons/md";
import "./AllEventsBlock.css";

function AllEventsBlock({ backendEvents }) {
	// Ensure backendEvents is always an array - normalize if needed
	const safeEvents = useMemo(() => {
		if (Array.isArray(backendEvents)) {
			return backendEvents;
		}
		// If it's an object, try to find the array
		if (backendEvents && typeof backendEvents === "object") {
			if (Array.isArray(backendEvents.data)) {
				return backendEvents.data;
			}
			// Search for any array property
			for (const key in backendEvents) {
				if (Array.isArray(backendEvents[key])) {
					return backendEvents[key];
				}
			}
		}
		return [];
	}, [backendEvents]);

	return (
		<div className="all-events-block">
			<div className="all-events-hero">
				<div className="all-events-hero-icons" aria-hidden="true">
					<IoSparkles className="hero-icon icon-1" />
					<IoCalendarOutline className="hero-icon icon-2" />
					<MdTrendingUp className="hero-icon icon-3" />
					<IoPeopleOutline className="hero-icon icon-4" />
				</div>

				<h2 className="all-events-title">
					Discover Upcoming Events
				</h2>
				<p className="all-events-subtitle">
					Explore what’s happening near you and jump into the causes you care about.
				</p>
			</div>

			<MainContent backendEvents={safeEvents} />
		</div>
	);
}

export default AllEventsBlock;
