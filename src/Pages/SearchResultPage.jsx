import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card/Card";
import CardNew from "../Components/Card/CardNew";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SearchBar from "../Components/SearchBar";

const defaultImageUrl = "src/assets/NoImage.jpg";

function SearchResultPage() {
	const location = useLocation();
	const { eventsData, newsData, newsAPIResponse } = location.state;
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleEventCardClick = (eventData) => {
		navigate("/discover/events-details", { state: { event: eventData } });
	};

	const handleNewsCardClick = (id) => {
		const selectedNews = newsData.find((news) => news.news_id === id);
		navigate(`/discover/news-details/${id}`, { state: { news: selectedNews } });
	};

	const handleArticleClick = (article, i) => {
		navigate(`/discover/news-details/${i}`, { state: { article } });
	};

	const handleImageLoad = () => {
		setLoading(false);
	};

	const selectedArticles = newsAPIResponse?.slice(0, 10);

	return (
		<div className="" style={{ paddingRight: "5%", paddingLeft: "5%" }}>
			<div>
				<SearchBar />
			</div>

			<Row className="m-3">
				<h4 className="d-flex justify-content-center mb-4">
					Ways to get involved
				</h4>
				{eventsData?.map((event, index) => (
					<Col key={event.id || index} lg={3} md={3} sm={8}>
						<div className="event-card-container">
							<CardNew
								cardObj={event}
								tag={"Event"}
								imageLoad={handleImageLoad}
								cardClick={() => handleEventCardClick(event)}
							/>
						</div>
					</Col>
				))}
			</Row>

			<Row className="m-3">
				<h4 className="d-flex justify-content-center mb-4">
					Related news articles
				</h4>
				{newsData?.map((news) => (
					<Col key={news.news_id} lg={3} md={3} sm={8}>
						<Card
							id={news.news_id}
							title={news.news_title}
							imageSrc={news.news_image || defaultImageUrl}
							tag={"News"}
							text={news.text}
							onLoad={handleImageLoad}
							onClick={() => handleNewsCardClick(news.news_id)}
						/>
					</Col>
				))}

				{selectedArticles.map((article, i) => (
					<Col
						key={`${i}-${article.author}`}
						lg={3}
						md={3}
						sm={8}
						className="mb-3"
					>
						<Card
							id={`${i}`}
							title={article.title}
							imageSrc={article.urlToImage || defaultImageUrl}
							onLoad={handleImageLoad}
							onClick={() => handleArticleClick(article, i)}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default SearchResultPage;
