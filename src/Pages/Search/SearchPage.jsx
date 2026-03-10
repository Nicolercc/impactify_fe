import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../../Components/SearchBar";
import "./SearchPage.css";

function SearchPage() {
	return (
		<div className="search-page">
			<Container className="search-page-container">
				<div className="search-hero">
					<div className="search-hero-content">
						<h1 className="search-hero-title">Discover what matters to you</h1>
						<p className="search-hero-subtitle">
							Search for events, news, and opportunities in your community
						</p>
					</div>
					
					<div className="search-bar-wrapper">
						<SearchBar />
					</div>
				</div>
			</Container>
		</div>
	);
}

export default SearchPage;
