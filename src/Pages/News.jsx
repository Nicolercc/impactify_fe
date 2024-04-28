import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import "../App.css";
import NewsApi from "../Components/NewsApi/NewsApi"; // Import NewsApi component
import { Col, Row } from "react-bootstrap";
import loading from "../Components/LoadingState/LoadingState";

const News = () => {
	const [loading, setLoading] = useState(true);
	const [newsData, setNewsData] = useState([]);
	const [newsApiData, setNewsApiData] = useState([]);
	const navigate = useNavigate();
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const response = await fetch(`${backend}/news`);
			if (!response.ok) {
				throw new Error("Failed to fetch data:");
			}
			const data = await response.json();
			setNewsData(data.data);

			setLoading(false);
		} catch (e) {
			console.error("Error etching data:", e);
		}
	}
	console.log(newsData);

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleCardClick = (id) => {
		const selectedNews = newsData.find((news) => news.news_id === id);
		navigate(`/discover/news-details/${id}`, { state: { news: selectedNews } });
	};

	// console.log(newsData[0]);
	const handleNewsApiLoad = (status) => {
		if (status === "loading") {
			setLoading(true); // Set loading state to true when News API component is loading
		} else {
			setLoading(false); // Set loading state to false when News API component finishes loading
		}
	};
	return (
		<div className=" pt-4 " style={{ marginLeft: "5%", marginRight: "5%" }}>
			<div
				className="d-flex justify-content-center fs-2 mb-1 "
				style={{ color: "#630f76" }}
			>
				News & Buzz
			</div>
			<div className="d-flex justify-content-center mb-4">
				<p> Learn more about events happening around the world</p>
			</div>
			{loading ? (
				<div className="loader-wrapper">
					<div className="loader"></div>
				</div>
			) : (
				<Row className="d-flex justify-content-center">
					{/* <div className=" mx-3 fs-4 m-3 d-flex justify-content-center">
						Trending Topics
					</div> */}
					{newsData.map((news) => (
						<Col key={news.news_id} sm={6} md={3} className="pb-4">
							<Card
								id={news.news_id}
								title={news.news_title}
								imageSrc={news.news_image}
								text={news.news}
								onLoad={handleImageLoad}
								onClick={() => handleCardClick(news.news_id)}
							/>
						</Col>
					))}

					<Col>
						<NewsApi onLoad={handleNewsApiLoad} />
					</Col>
				</Row>
			)}
		</div>
	);
};

export default News;
