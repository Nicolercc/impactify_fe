import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import BACKEND_URL from "../config/backend";
import "./SearchBar.css";

function SearchBar({ onSearch, className = "", compact = false }) {
	const backend = BACKEND_URL;
	const [searchInput, setSearchInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isFocused, setIsFocused] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef(null);
	const newsAPIKey = import.meta.env.VITE_X_NEWSAPI_KEY || import.meta.env.VITE_APP_NEWSAPI_KEY;

	// Initialize search input from URL params if available
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const keyword = params.get("keyword");
		if (keyword) {
			setSearchInput(keyword);
		}
	}, [location.search]);

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchInput(value);
		setError(null);
	};

	const handleSearch = async (searchTerm = null) => {
		const query = searchTerm || searchInput.trim();
		
		if (query.length < 2) {
			setError("Please enter at least 2 characters to search.");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			// Use Promise.allSettled for graceful error handling
			const [eventsResult, newsResult, newsAPIResult] = await Promise.allSettled([
				axios.get(`${backend}/events/search?keyword=${encodeURIComponent(query)}`),
				axios.get(`${backend}/news/search?keyword=${encodeURIComponent(query)}`),
				newsAPIKey 
					? axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${newsAPIKey}`)
					: Promise.resolve({ data: { articles: [] } })
			]);

			// Extract data with proper fallbacks
			const eventsData = eventsResult.status === 'fulfilled' 
				? (eventsResult.value?.data?.data || eventsResult.value?.data || [])
				: [];
			
			const newsData = newsResult.status === 'fulfilled'
				? (newsResult.value?.data?.data || newsResult.value?.data || [])
				: [];
			
			const newsAPIResponse = newsAPIResult.status === 'fulfilled'
				? (newsAPIResult.value?.data?.articles || [])
				: [];

			// Navigate to results
			navigate(`/search-results?keyword=${encodeURIComponent(query)}`, {
				state: {
					eventsData,
					newsData,
					newsAPIResponse,
					searchKeyword: query,
				},
			});

			if (onSearch) {
				onSearch(query);
			}
		} catch (error) {
			console.error("Search error:", error);
			const errorMessage = error.response?.data?.message 
				|| error.message 
				|| "Unable to complete search. Please try again.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!loading && searchInput.trim().length >= 2) {
			handleSearch();
		}
	};

	const handleClear = () => {
		setSearchInput("");
		setError(null);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			handleClear();
		}
	};

	return (
		<div className={`search-bar-wrapper ${className} ${compact ? "compact" : ""}`}>
			<form onSubmit={handleSubmit} className="search-bar-form" noValidate>
				<div 
					className={`search-input-container ${isFocused ? "focused" : ""} ${error ? "error" : ""} ${loading ? "loading" : ""}`}
				>
					<div className="search-icon-container">
						{loading ? (
							<FaSpinner className="search-icon spinner" aria-hidden="true" />
						) : (
							<FaSearch className="search-icon" aria-hidden="true" />
						)}
					</div>

					<input
						ref={inputRef}
						type="search"
						className="search-input"
						placeholder={compact ? "Search..." : "Search events, news, and opportunities..."}
						aria-label="Search"
						aria-describedby={error ? "search-error" : undefined}
						aria-invalid={error ? "true" : "false"}
						value={searchInput}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						disabled={loading}
						autoComplete="off"
					/>

					{searchInput && (
						<button
							type="button"
							className="search-clear-btn"
							onClick={handleClear}
							aria-label="Clear search"
							tabIndex={0}
						>
							<FaTimes />
						</button>
					)}

					<button
						type="submit"
						className="search-submit-btn"
						disabled={loading || searchInput.trim().length < 2}
						aria-label="Submit search"
					>
						{loading ? (
							<>
								<FaSpinner className="btn-spinner" />
								{!compact && <span>Searching</span>}
							</>
						) : (
							!compact && "Search"
						)}
					</button>
				</div>

				{error && (
					<div 
						id="search-error"
						className="search-error" 
						role="alert"
						aria-live="polite"
					>
						{error}
					</div>
				)}
			</form>
		</div>
	);
}

export default SearchBar;