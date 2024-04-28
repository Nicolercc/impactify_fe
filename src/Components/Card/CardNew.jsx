import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import noImage from "../../assets/NoImage.jpg";

function CardNew({ cardObj, tag, imageLoad, cardClick }) {
	const [styleClick, setStyleClick] = useState(false);

	const reducedCard = {
		card_title: cardObj.event_title || cardObj.news_title || "title missing",
		// event_details || news_content -- text
		card_text: cardObj.event_details || cardObj.news_content || "text missing",
		// event_photo || news_image -- image
		card_photo: cardObj.event_photo || cardObj.news_image || noImage,
		// event_keywords || news_keywords -- keywords
		card_keywords:
			cardObj.event_keywords || cardObj.news_keywords || "keyword missing",
		// key = i
	};

	const handleStyleChange = () => {
		setStyleClick(!styleClick);
	};

	return (
		<div
			onClick={cardClick}
			style={{ cursor: "pointer" }}
			className="card border-0 bg-light "
		>
			<div
				className={`bg-light ${styleClick ? "card-clicked" : ""}`}
				style={{ borderRadius: "15px 15px 0px 0px" }}
			>
				<img
					className="card-img-top p-2"
					src={reducedCard.card_photo}
					alt="Card image"
					onLoad={imageLoad}
					style={{
						borderRadius: "15px 15px",
						minHeight: "200px",
						maxHeight: "200px",
					}}
				/>
				<div className=" bg-light">
					<span className="badge rounded-pill card-pill">{tag}</span>
					<h5
						className="card-title d-flex justify-content-center"
						style={{ overflow: "hidden", maxHeight: "30px" }}
					>
						{reducedCard.card_title}
					</h5>
					<p
						className="card-text "
						style={{
							minHeight: "67px",
							overflow: "hidden",
							margin: "8px",
						}}
					>
						{reducedCard.card_text}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CardNew;
