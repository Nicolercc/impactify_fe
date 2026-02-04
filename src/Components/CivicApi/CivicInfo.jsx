import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "./CivicInfo.css";

const CivicInfo = () => {
	const [usersLocation, setUsersLocation] = useState("");
	const [civicOfficials, setCivicOfficials] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const googleApiKey = import.meta.env.VITE_X_GOOGLE_API_KEY;

	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
	});

	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					try {
						const results = await getGeocode({
							location: { lat: latitude, lng: longitude },
						});
						const address = results[0].formatted_address;
						setUsersLocation(address);
						setValue(address, false);
					} catch (error) {
						console.error("Error converting geolocation to address:", error);
					}
				},
				(error) => {
					console.error("Error obtaining user location", error);
				}
			);
		}
	}, [setValue]);

	useEffect(() => {
		const fetchData = async () => {
			if (!usersLocation) return;

			if (!googleApiKey) {
				setError(
					"We couldn’t reach the civic info service from this browser. You can still use official resources below."
				);
				setCivicOfficials([]);
				return;
			}

			setLoading(true);
			setError("");
			try {
				const civicUrl = `https://www.googleapis.com/civicinfo/v2/representatives?key=${googleApiKey}&address=${encodeURIComponent(usersLocation)}`;
				const civicResponse = await axios.get(civicUrl);
				setCivicOfficials(civicResponse.data.officials || []);
			} catch (err) {
				console.error("Error fetching civic data:", err);
				setError(
					"We couldn’t load your representatives right now. You can still look them up using the links below."
				);
				setCivicOfficials([]);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [usersLocation, googleApiKey]);

	const handleInput = (e) => {
		setValue(e.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			setValue(description, false);
			clearSuggestions();
			getGeocode({ address: description })
				.then((results) => {
					const { lat, lng } = getLatLng(results[0]);
					console.log("📍 Coordinates: ", { lat, lng });
					setUsersLocation(description);
				})
				.catch((error) => {
					console.error("Error getting geocode:", error);
				});
		};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li
					key={place_id}
					onClick={handleSelect(suggestion)}
					className="civic-suggestion-item"
				>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<section>
			<Container className="civic-container py-5">
				<Row className="justify-content-center">
					<Col md={8} lg={7}>
						<header className="civic-hero">
							<h2 className="civic-hero-title">See who represents you</h2>
							<p className="civic-hero-subtitle">
								Search your address to find local, state, and federal officials
								who speak for your community.
							</p>
						</header>
					</Col>
				</Row>

				<Row className="justify-content-center">
					<Col md={8} lg={7}>
						<Form.Group controlId="voter_address" ref={ref} className="mb-4">
							<Form.Label className="civic-label">
								Enter your address
							</Form.Label>
							<Form.Control
								type="text"
								value={value}
								onChange={handleInput}
								disabled={!ready}
								placeholder="Start typing your street address"
								className="civic-input"
							/>
							{status === "OK" && (
								<ul className="civic-suggestions">{renderSuggestions()}</ul>
							)}
						</Form.Group>
					</Col>
				</Row>

				<Row className="row-cols-1 row-cols-md-3 g-4 justify-content-center mt-2">
					{loading && (
						<Col md={8} lg={7}>
							<p className="civic-empty">Looking up your representatives…</p>
						</Col>
					)}

					{!loading && !error && civicOfficials.length === 0 && (
						<Col md={8} lg={7}>
							<p className="civic-empty">
								Search an address above to see your representatives.
							</p>
						</Col>
					)}

					{error && (
						<Col md={8} lg={7}>
							<p className="civic-error">{error}</p>
							<p className="civic-links">
								You can also look up your elected officials on{" "}
								<a
									href="https://www.usa.gov/elected-officials"
									target="_blank"
									rel="noopener noreferrer"
								>
									usa.gov
								</a>
								.
							</p>
						</Col>
					)}

					{civicOfficials.map((official, index) => {
						const email =
							official.emails && official.emails.length > 0
								? official.emails[0]
								: null;
						const party = official.party || "Non‑partisan or not listed";
						const primaryChannel =
							official.channels && official.channels.length > 0
								? official.channels[0]
								: null;

						return (
							<Col key={index}>
								<Card className="civic-official-card h-100">
									<Card.Body>
										<Card.Title className="civic-official-name">
											{official.name}
										</Card.Title>
										<Card.Subtitle className="mb-2 civic-official-party">
											{party}
										</Card.Subtitle>
										{email && (
											<Card.Text className="civic-official-line">
												Email:{" "}
												<a href={`mailto:${email}`}>{email}</a>
											</Card.Text>
										)}
										{primaryChannel && (
											<Card.Text className="civic-official-line">
												{primaryChannel.type}: {primaryChannel.id}
											</Card.Text>
										)}
										{official.urls && official.urls.length > 0 && (
											<Card.Link
												href={official.urls[0]}
												target="_blank"
												rel="noopener noreferrer"
												className="civic-official-link"
											>
												More about this office
											</Card.Link>
										)}
									</Card.Body>
                                </Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</section>
	);
};

export default CivicInfo;

{
	/* <div>
			<Form.Group
				className="mb-3 d-flex justify-content-center"
				controlId="event_location"
				ref={ref}
			>
				<div className="">
					<Form.Label className="m-4 display-6 d-flex justify-content-center">
						Find all the representatives around you
					</Form.Label>
					<Form.Control
						type="text"
						value={value}
						className="search-bar"
						onChange={handleInput}
						disabled={!ready}
						placeholder="What's your address?"
					/>
					{status === "OK" && <ul>{renderSuggestions()}</ul>}
				</div>
			</Form.Group>

			<div>
				{/* card */
}
// 		{civicOfficials.map((official, index) => (
// 			<div key={index}>
// 				<div>Party: {official.party}</div>
// 				<div>Name: {official.name}</div>
// 				<div>Email: {official.email ? official.email : "N/A"}</div>
// 				<div>
// 					Channel ID:{" "}
// 					{official.channels && official.channels.length > 0
// ? official.channels[0].id
// 						: "N/A"}
// 				</div>
// 				<p>
// 					FOR MORE INFO:{" "}
// 					<a href={official.url ? official.url : "#"}>
// 						{official.url ? official.url : "Unavailable"}
// 					</a>
// 				</p>
// 			</div>
// 		))}
// 	</div>
// </div> */}
