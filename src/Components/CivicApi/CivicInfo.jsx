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
import VoterModal from "./VoterModal";

const CivicInfo = () => {
	const [civicData, setCivicData] = useState(null);
	const [usersLocation, setUsersLocation] = useState("");
	const [civicOfficials, setCivicOfficials] = useState([]);
	const [pollingData, setPollingData] = useState(null);

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
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, [setValue]);

	useEffect(() => {
		const fetchData = async () => {
			if (usersLocation) {
				try {
					const civicUrl = `https://www.googleapis.com/civicinfo/v2/representatives?key=${googleApiKey}&address=${encodeURIComponent(usersLocation)}`;
					const civicResponse = await axios.get(civicUrl);
					setCivicData(civicResponse || []);
					setCivicOfficials(civicResponse.data.officials || []);

					const pollingUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(usersLocation)}&key=${googleApiKey}`;
					const pollingResponse = await axios.get(pollingUrl);
					console.log(pollingResponse);
					setPollingData(pollingResponse || []);
				} catch (error) {
					console.error("Error fetching data:", error);
				}
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
					style={{ cursor: "pointer", listStyleType: "none" }}
				>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<Container className="main-content py-5 justify-content-center mx-5 ">
			<Row className="justify-content-center">
				<Col md={6}>
					<Form.Group controlId="event_location" ref={ref} className="mb-4">
						<Form.Label className="display-6 text-center mb-4">
							Find all the representatives around you
						</Form.Label>
						<Form.Control
							type="text"
							value={value}
							onChange={handleInput}
							disabled={!ready}
							placeholder="What's your address?"
							className="mb-3"
						/>
						{status === "OK" && <ul>{renderSuggestions()}</ul>}
					</Form.Group>
				</Col>
			</Row>
			<Row className="row-cols-1 row-cols-md-3 g-4 justify-content-center">
				{civicOfficials.map((official, index) => (
					<Col key={index}>
						<Card>
							<Card.Body>
								<Card.Title>{official.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{official.party}
								</Card.Subtitle>
								<Card.Text>
									Email: {official.email ? official.email : "N/A"}
								</Card.Text>
								<Card.Text>
									Channel ID:{" "}
									{official.channels && official.channels.length > 0
										? official.channels[0].id
										: "N/A"}
								</Card.Text>
								<Card.Link href={official.url ? official.url : "#"}>
									FOR MORE INFO
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
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
