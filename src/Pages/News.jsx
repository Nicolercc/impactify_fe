import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Col, Row } from "react-bootstrap";
import {
	MdPublic,
	MdGavel,
	MdEco,
	MdComputer,
	MdHealthAndSafety,
	MdBusiness,
	MdScience,
	MdSportsSoccer,
} from "react-icons/md";
import "./News.css";
import LoadingState from "../Components/LoadingState/LoadingState";

const CATEGORY_CONFIG = [
	{
		id: "all",
		label: "All",
		icon: MdPublic,
		newsApi: { mode: "top", category: "general" },
		guardianQuery: "world",
	},
	{
		id: "politics",
		label: "Politics",
		icon: MdGavel,
		newsApi: { mode: "search", q: "politics OR election OR congress OR senate" },
		guardianQuery: "politics",
	},
	{
		id: "environment",
		label: "Environment",
		icon: MdEco,
		newsApi: { mode: "search", q: "climate OR environment OR sustainability" },
		guardianQuery: "climate",
	},
	{
		id: "technology",
		label: "Technology",
		icon: MdComputer,
		newsApi: { mode: "top", category: "technology" },
		guardianQuery: "technology",
	},
	{
		id: "health",
		label: "Health",
		icon: MdHealthAndSafety,
		newsApi: { mode: "top", category: "health" },
		guardianQuery: "health",
	},
	{
		id: "business",
		label: "Business",
		icon: MdBusiness,
		newsApi: { mode: "top", category: "business" },
		guardianQuery: "business",
	},
	{
		id: "science",
		label: "Science",
		icon: MdScience,
		newsApi: { mode: "top", category: "science" },
		guardianQuery: "science",
	},
	{
		id: "sports",
		label: "Sports",
		icon: MdSportsSoccer,
		newsApi: { mode: "top", category: "sports" },
		guardianQuery: "sport",
	},
];

const News = () => {
	const [loading, setLoading] = useState(true);
	const [newsData, setNewsData] = useState([]);
	const [usingFallback, setUsingFallback] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const navigate = useNavigate();
	const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
	const newsAPIKey =
		import.meta.env.VITE_X_NEWSAPI_KEY || import.meta.env.VITE_APP_NEWSAPI_KEY;

	useEffect(() => {
		fetchData(selectedCategory);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	function getCategoryConfig(categoryId) {
		return (
			CATEGORY_CONFIG.find((c) => c.id === categoryId) ||
			CATEGORY_CONFIG[0]
		);
	}

	function stripHtml(input) {
		return String(input || "").replace(/<[^>]*>/g, "").trim();
	}

	function safeTextIncludes(haystack, needle) {
		if (!needle) return true;
		return String(haystack || "").toLowerCase().includes(needle.toLowerCase());
	}

	function filterByCategory(items, categoryId) {
		if (categoryId === "all") return items;
		const cfg = getCategoryConfig(categoryId);

		return (Array.isArray(items) ? items : []).filter((n) => {
			const categoryField =
				n?.news_category || n?.category || n?.topic || n?.section || "";

			if (categoryField && safeTextIncludes(categoryField, cfg.label)) return true;

			// fallback: keyword match in title/description/source
			const title = n?.news_title || n?.title || n?.headline || "";
			const text =
				n?.news_content ||
				n?.news ||
				n?.description ||
				n?.content ||
				n?.trailText ||
				"";
			const source = n?.news_source || n?.source?.name || "";
			return (
				safeTextIncludes(title, cfg.label) ||
				safeTextIncludes(text, cfg.label) ||
				safeTextIncludes(source, cfg.label)
			);
		});
	}

	async function fetchData(categoryId) {
		setLoading(true);
		try {
			const qs =
				categoryId && categoryId !== "all"
					? `?category=${encodeURIComponent(categoryId)}`
					: "";
			const response = await fetch(`${backend}/news${qs}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			// Try different response structures (similar to events)
			let news = null;
			if (Array.isArray(data?.data)) {
				news = data.data;
			} else if (Array.isArray(data?.data?.data)) {
				news = data.data.data;
			} else if (Array.isArray(data?.data?.news)) {
				news = data.data.news;
			} else if (Array.isArray(data)) {
				news = data;
			} else {
				// Search for array in object
				const dataObj = data?.data || data;
				if (dataObj && typeof dataObj === "object" && !Array.isArray(dataObj)) {
					for (const key in dataObj) {
						if (Array.isArray(dataObj[key])) {
							news = dataObj[key];
							break;
						}
					}
				}
			}

			const processedNewsRaw = Array.isArray(news) ? news : [];
			const processedNews = filterByCategory(processedNewsRaw, categoryId);

			if (processedNews.length > 0) {
				setNewsData(processedNews);
				setUsingFallback(false);
			} else {
				// If backend returns empty, try fallback
				await fetchFallbackNews(categoryId);
			}
		} catch (e) {
			// If backend fails, try fallback
			await fetchFallbackNews(categoryId);
		} finally {
			setLoading(false);
		}
	}

	async function fetchFallbackNews(categoryId) {
		try {
			setUsingFallback(true);
			const cfg = getCategoryConfig(categoryId);

			// Try NewsAPI.org first if key is available
			if (newsAPIKey) {
				try {
					const url =
						cfg.newsApi?.mode === "search"
							? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
									cfg.newsApi.q
							  )}&language=en&pageSize=20&sortBy=publishedAt&apiKey=${newsAPIKey}`
							: `https://newsapi.org/v2/top-headlines?country=us&category=${
									cfg.newsApi?.category || "general"
							  }&pageSize=20&apiKey=${newsAPIKey}`;

					const response = await fetch(url);
					if (response.ok) {
						const data = await response.json();
						if (data.articles && data.articles.length > 0) {
							// Transform NewsAPI format to match backend format
							const transformedNews = data.articles
								.filter((article) => article.urlToImage) // Only articles with images
								.map((article, index) => ({
									news_id: `newsapi-${cfg.id}-${index}`,
									news_title: article.title || "No Title",
									news_image: article.urlToImage || "",
									news: stripHtml(article.description || article.content || ""),
									news_content: stripHtml(
										article.description || article.content || ""
									),
									news_url: article.url || "",
									news_source: article.source?.name || "Unknown",
									news_date: article.publishedAt || "",
									news_author: article.author || "",
									news_category: cfg.label,
								}));
							setNewsData(filterByCategory(transformedNews, categoryId));
							return;
		}
	}
				} catch (error) {
					// swallow and try next fallback
				}
			}

			// Fallback to NewsAPI.org without key (limited) or alternative
			// Using a free alternative: NewsData.io or Guardian API
			try {
				// Try Guardian API (free, no key required for limited requests)
				const guardianResponse = await fetch(
					`https://content.guardianapis.com/search?q=${encodeURIComponent(
						cfg.guardianQuery || "world"
					)}&show-fields=thumbnail,headline,trailText&page-size=20&api-key=test`
				);
				if (guardianResponse.ok) {
					const guardianData = await guardianResponse.json();
					if (guardianData.response?.results) {
						const transformedNews = guardianData.response.results
							.filter((item) => item.fields?.thumbnail)
							.map((item, index) => ({
								news_id: `guardian-${cfg.id}-${index}`,
								news_title: item.webTitle || "No Title",
								news_image: item.fields?.thumbnail || "",
								news: stripHtml(item.fields?.trailText || item.webTitle || ""),
								news_content: stripHtml(
									item.fields?.trailText || item.webTitle || ""
								),
								news_url: item.webUrl || "",
								news_source: "The Guardian",
								news_date: item.webPublicationDate || "",
								news_author: "",
								news_category: cfg.label,
							}));
						setNewsData(filterByCategory(transformedNews, categoryId));
						return;
					}
				}
			} catch (error) {
				// swallow and return empty
			}

			// Last resort: Use a simple RSS feed parser or show message
			setNewsData([]);
		} catch (error) {
			setNewsData([]);
		}
	}

	const handleCardClick = (id) => {
		const selectedNews = newsData.find((news) => news.news_id === id);
		navigate(`/discover/news-details/${id}`, { state: { news: selectedNews } });
	};

	return (
		<div className="news-page">
			<div className="news-header">
				<h1 className="news-title">News & Buzz</h1>
				<p className="news-subtitle">
					Stay informed with stories and updates from around the world.
					{usingFallback ? (
						<span className="news-fallback-pill" aria-label="Using fallback sources">
							Fallback sources
						</span>
					) : null}
				</p>
			</div>

			<div className="news-categories" role="region" aria-label="News categories">
				<div className="news-categories-inner" role="tablist" aria-label="Filter news by category">
					{CATEGORY_CONFIG.map((cat) => {
						const Icon = cat.icon;
						const isActive = selectedCategory === cat.id;
						return (
							<button
								key={cat.id}
								type="button"
								className={`news-category-chip ${isActive ? "active" : ""}`}
								onClick={() => setSelectedCategory(cat.id)}
								role="tab"
								aria-selected={isActive}
							>
								<Icon className="chip-icon" aria-hidden="true" />
								<span className="chip-label">{cat.label}</span>
								<span className="chip-glow" aria-hidden="true" />
							</button>
						);
					})}
				</div>
			</div>

			{loading ? (
				<LoadingState message="Loading news articles..." />
			) : newsData.length === 0 ? (
				<div className="text-center p-5">
					<p className="fs-5 text-muted">
						No news available at the moment. Please check back later.
					</p>
				</div>
			) : (
				<Row className="d-flex justify-content-center g-4 news-grid">
					{newsData.map((news) => {
						// Handle different field name variations
						const newsId = news.news_id || news.id || news._id;
						const title =
							news.news_title || news.title || news.headline || "Untitled News";
						const imageSrc =
							news.news_image ||
							news.image ||
							news.urlToImage ||
							news.thumbnail ||
							"";
						const text =
							news.news ||
							news.description ||
							news.content ||
							news.trailText ||
							"";

						return (
							<Col key={newsId} xs={12} sm={6} md={4} lg={3}>
							<Card
									id={newsId}
									title={title}
									imageSrc={imageSrc}
									text={text}
									onClick={() => handleCardClick(newsId)}
							/>
						</Col>
						);
					})}
				</Row>
			)}
		</div>
	);
};

export default News;
