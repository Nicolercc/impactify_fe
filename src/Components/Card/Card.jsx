/* eslint-disable no-unused-vars */
import React from "react";
import "./Card.css";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ title, imageSrc, text, updatedAt, onLoad, onClick }) => {
	// Truncate text if too long
	const truncatedText =
		text && text.length > 100 ? text.substring(0, 100) + "..." : text;

	return (
		<div
			onClick={onClick}
			style={{ cursor: "pointer", marginBottom: "20px", height: "100%" }}
		>
			<div
				className="card border-0 bg-light border-none bg-light h-100"
				style={{
					borderRadius: "15px",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					transition: "transform 0.2s",
				}}
				onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
				onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
			>
				<img
					className="card-img p-2"
					src={imageSrc || "https://via.placeholder.com/300x200?text=No+Image"}
					alt={title || "Event image"}
					onLoad={onLoad}
					onError={(e) => {
						e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
					}}
					style={{
						borderRadius: "15px 15px",
						minHeight: "213px",
						maxHeight: "213px",
						width: "100%",
						objectFit: "cover",
					}}
				/>
				<div
					className="card-body bg-light"
					style={{
						margin: "0px",
						padding: "15px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<h5
						className="card-title text-center"
						style={{
							margin: "0 0 10px 0",
							fontSize: "1.1rem",
							fontWeight: "bold",
							minHeight: "50px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{title || "Untitled Event"}
					</h5>
					{truncatedText && (
						<p
							className="card-text text-muted"
							style={{
								margin: 0,
								fontSize: "0.9rem",
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
							}}
						>
							{truncatedText}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default Card;
