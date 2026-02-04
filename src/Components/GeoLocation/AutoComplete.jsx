import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const AutoComplete = ({ setLocation, setLat, setLng, lat, lng }) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	});

	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});

	const handleInput = (event) => {
		setValue(event.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			setValue(description, false);
			clearSuggestions();

			getGeocode({ address: description }).then((results) => {
				const { lat, lng } = getLatLng(results[0]);
				setLat(lat);
				setLng(lng);
				setLocation(description);
				console.log("📍 Coordinates: ", { lat, lng });
			});
		};

	console.log(`The lat: ${lat}, the lng: ${lng}, and location :${value}`);

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li
					className="dropdown-item-hover"
					style={{ color: "#4E2855" }}
					key={place_id}
					onClick={handleSelect(suggestion)}
				>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<div ref={ref} style={{ width: "100%", position: "relative" }}>
			<input
				type="text"
				value={value}
				onChange={handleInput}
				placeholder="Search for a location..."
				disabled={!ready}
				className="form-control"
				style={{
					width: "100%",
					padding: "0.875rem 1rem",
					fontSize: "0.9375rem",
					color: "#1a1a1a",
					background: "#ffffff",
					border: "2px solid #e9ecef",
					borderRadius: "8px",
					transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
					fontFamily: "inherit",
				}}
				onFocus={(e) => {
					e.target.style.borderColor = "#630f76";
					e.target.style.boxShadow = "0 0 0 3px rgba(99, 15, 118, 0.1)";
				}}
				onBlur={(e) => {
					e.target.style.borderColor = "#e9ecef";
					e.target.style.boxShadow = "none";
				}}
			/>
			{status === "OK" && (
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: "0.5rem 0 0",
						background: "#ffffff",
						border: "1px solid #e9ecef",
						borderRadius: "8px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						maxHeight: "200px",
						overflowY: "auto",
						zIndex: 1000,
						position: "absolute",
						width: "100%",
					}}
				>
					{renderSuggestions()}
				</ul>
			)}
		</div>
	);
};

export default AutoComplete;
