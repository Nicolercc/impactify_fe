import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchResultPage from "../Pages/SearchResultPage";
//FINAL
function SearchBar({ onSearch }) {
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const [searchInput, setSearchInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const newsAPIKey = import.meta.env.VITE_X_NEWSAPI_KEY || import.meta.env.VITE_APP_NEWSAPI_KEY
	const navigate = useNavigate();
	//no api keys shared

	const [userLocation, setUserLocation] = useState(null);

	//getting users location
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ lat: latitude, lng: longitude });
				},
				(error) => {
					console.error("Error obtaining user location", error);
				}
			);
		} else {
			console.log("Geolocation is not working.");
		}
	}, []);

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSearch = async () => {
		setLoading(true);
		setError(null);

		console.log("Searching for:", searchInput);

		try {
			const eventsResponse = await axios.get(
				`${backend}/events/search?keyword=${searchInput}`
			);
			console.log("Events response:", eventsResponse.data);

			const newsResponse = await axios.get(
				`${backend}/news/search?keyword=${searchInput}`
			);
			console.log("News response:", newsResponse.data);

			const newsAPIResponse = await axios.get(
				`https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${newsAPIKey}`
			);
			console.log("NewsAPI response:", newsAPIResponse.data.articles);

			navigate(`/search-results?keyword=${searchInput}`, {
				state: {
					eventsData: eventsResponse?.data.data,
					newsData: newsResponse?.data.data,
					newsAPIResponse: newsAPIResponse?.data.articles,
				},
			});
		} catch (error) {
			console.error("An error occurred while fetching search results:", error);
			setError("An error occurred while fetching search results.");
		}

		setLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch();
	};

	return (
		<div className="m-5 d-flex flex-column justify-content-center ">
			<Form onSubmit={handleSubmit} className="">
				<InputGroup className=" ">
					<Col xs={8} md={9} lg={10}>
						<FormControl
							placeholder="Search"
							aria-label="Search"
							onChange={handleChange}
							value={searchInput}
							style={{ width: "110%" }}
						/>
					</Col>
					<Col xs={4} md={3} lg={2} className="d-flex justify-content-center  ">
						<Button
							variant="outline-secondary"
							type="submit"
							disabled={loading}
							style={{ width: "100%", maxWidth: "150px", borderRadius: "10px" }}
						>
							{loading ? "Searching..." : "Search"}
						</Button>
					</Col>
				</InputGroup>
			</Form>

			{error && (
				<div className="text-danger d-flex justify-content-center my-5 fs-5 ">
					{error}
				</div>
			)}
		</div>
	);
}

export default SearchBar;