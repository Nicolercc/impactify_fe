import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Container, Row, Col, Form } from "react-bootstrap";
import NewsCar from "./NewsCar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsApi = ({ onLoad }) => {
	const [heldRes, setHeldRes] = useState(null);
	const [newsApiArticles, setNewsApiArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedKeyword, setSelectedKeyword] = useState("politics");
	const NewsApiKey =
		import.meta.env.VITE_X_NEWSAPI_KEY || import.meta.env.VITE_APP_NEWSAPI_KEY;
	const keywordOptions = [
		{ value: "equality", label: "equality" },
		{ value: "politics", label: "politics" },
		{ value: "global issues", label: "global issues" },
		{ value: "lgbt rights", label: "lgbt rights" },
		{ value: "global warming", label: "global warming" },
		{ value: "ukraine", label: "ukraine" },
		{ value: "palestine", label: "palestine" },
		{ value: "israel", label: "israel" },
		{ value: "climate change", label: "climate change" },
		{ value: "technology", label: "technology" },
		{ value: "healthcare", label: "healthcare" },
		{ value: "education", label: "education" },
		{ value: "economy", label: "economy" },
		{ value: "social justice", label: "social justice" },
		{ value: "environment", label: "environment" },
		{ value: "human rights", label: "human rights" },
		{ value: "business", label: "business" },
		{ value: "innovation", label: "innovation" },
		{ value: "sports", label: "sports" },
		{ value: "art and culture", label: "art and culture" },
		{ value: "science", label: "science" },
		{ value: "entertainment", label: "entertainment" },
		{ value: "food and drink", label: "food and drink" },
		{ value: "travel", label: "travel" },

		{ value: "finance", label: "finance" },
		{ value: "fashion", label: "fashion" },
		{ value: "music", label: "music" },
		{ value: "literature", label: "literature" },
		{ value: "film", label: "film" },
		{ value: "television", label: "television" },
		{ value: "history", label: "history" },
		{ value: "technology", label: "technology" },
		{ value: "automotive", label: "automotive" },
		{ value: "health and wellness", label: "health and wellness" },
		{ value: "cooking", label: "cooking" },
		{ value: "gardening", label: "gardening" },
		{ value: "photography", label: "photography" },
		{ value: "space exploration", label: "space exploration" },
	];

	useEffect(() => {
		if (selectedKeyword) {
			fetchNewsArticles(selectedKeyword);
		}
	}, [selectedKeyword]);

	const handleKeywords = (selectedOption) => {
		setSelectedKeyword(selectedOption.value);
	};

	const fetchNewsArticles = async (keyword) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NewsApiKey}`
			);
			if (!response.ok) {
				setHeldRes(response);
				throw new Error(
					`Failed to fetch news articles for keyword: ${keyword}`
				);
			}
			const data = await response.json();
			setHeldRes(data);
			// Filter out articles with no image
			const filteredArticles = data.articles.filter(
				(article) => article.urlToImage
			);
			setNewsApiArticles(filteredArticles);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="">
			<div className=" mx-auto align-items-center  justify-content-center ">
				<Row className="mb-3 d-flex justify-content-center">
					<Col xs={12} md={3}>
						<Form.Group controlId="event_keyword">
							<Form.Label
								className=" mb-2 fs-4 d-flex justify-content-center "
								style={{ paddingLeft: "90px" }}
							>
								Filter by Category
							</Form.Label>
						</Form.Group>
					</Col>
					<Col xs={12} md={6}>
						<Form.Group controlId="event_keyword">
							<Select
								onChange={handleKeywords}
								options={keywordOptions}
								className="pb-3"
								classNamePrefix="select"
								name="event_keywords"
							/>
						</Form.Group>
					</Col>
				</Row>
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error}</div>}
				{!loading && !error && <NewsCar newsArticles={newsApiArticles} />}
			</div>
		</div>
	);
};

export default NewsApi;
