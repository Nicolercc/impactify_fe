import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import NoImage from "../../assets/NoImage.jpg";
import { useNavigate } from "react-router";
import "./NewsCar.css";

const NewsCar = ({ newsArticles }) => {
	const navigate = useNavigate();

	const handleArticleClick = (article, i) => {
		navigate(`/discover/news-details/${i}`, { state: { article } });
	};

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "purple" }}
				onClick={onClick}
			/>
		);
	}

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "purple" }}
				onClick={onClick}
			/>
		);
	}

	const settings = {
		// dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		// nextArrow: <SampleNextArrow />,
		// prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Slider {...settings}>
			{newsArticles.map((article, i) => (
				<div
					className="bg-light mb-5"
					key={`${i}-${article.source?.id}`}
					onClick={() => handleArticleClick(article, i)}
				>
					<Card className="border-0 ">
						<Card.Img
							className="bg-light p-2"
							variant="top"
							style={{
								borderRadius: "15px",
								minHeight: "200px",
								maxHeight: "200px",
							}}
							src={article.urlToImage || NoImage}
							alt={article.title}
						/>
						<Card.Body
							className="bg-light"
							style={{
								minHeight: "140px",
								maxHeight: "140px",
								overflow: "hidden",
							}}
						>
							<Card.Title>{article.title}</Card.Title>
						</Card.Body>
					</Card>
				</div>
			))}
		</Slider>
	);
};

export default NewsCar;
