import React, { useMemo, useState } from "react";
import {
	MdAllInbox,
	MdOutlinePolicy,
	MdEco,
	MdGroups,
	MdVolunteerActivism,
	MdHowToVote,
	MdDiversity3,
} from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import "./Categories.css";

const DEFAULT_EVENT_CATEGORIES = [
	{ id: "all", label: "All", Icon: MdAllInbox },
	{ id: "activism", label: "Activism", Icon: MdVolunteerActivism },
	{ id: "community", label: "Community", Icon: MdGroups },
	{ id: "politics", label: "Politics", Icon: MdOutlinePolicy },
	{ id: "environment", label: "Environment", Icon: MdEco },
	{ id: "equality", label: "Equality", Icon: MdDiversity3 },
	{ id: "voting", label: "Voting", Icon: MdHowToVote },
];

function CategoriesSection({
	title = "Explore by category",
	subtitle = "Filter events to find what matters to you.",
	categories,
	value,
	defaultValue = "all",
	onChange,
	onSelectCategory, // backwards-compatible prop name
}) {
	const items = useMemo(
		() => (Array.isArray(categories) && categories.length ? categories : DEFAULT_EVENT_CATEGORIES),
		[categories],
	);

	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState(defaultValue);
	const selected = isControlled ? value : internalValue;

	const handleSelect = (nextId) => {
		if (!isControlled) setInternalValue(nextId);
		onChange?.(nextId);
		onSelectCategory?.(nextId);
	};

	return (
		<section className="categories-section" aria-label="Event categories">
			<div className="categories-header">
				<div className="categories-title-row">
					<IoSparkles className="categories-title-icon" aria-hidden="true" />
					<h2 className="categories-title">{title}</h2>
				</div>
				{subtitle ? <p className="categories-subtitle">{subtitle}</p> : null}
							</div>

			<div className="categories-chips" role="tablist" aria-label="Filter events by category">
				{items.map(({ id, label, Icon }) => {
					const active = selected === id;
					return (
						<button
							key={id}
							type="button"
							role="tab"
							aria-selected={active}
							className={`categories-chip ${active ? "active" : ""}`}
							onClick={() => handleSelect(id)}
						>
							<Icon className="categories-chip-icon" aria-hidden="true" />
							<span className="categories-chip-label">{label}</span>
							<span className="categories-chip-glow" aria-hidden="true" />
						</button>
					);
				})}
							</div>
		</section>
	);
}

export default CategoriesSection;
