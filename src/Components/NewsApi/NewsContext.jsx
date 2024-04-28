import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedKeyword, setSelectedKeyword] = useState(null); 
    const NewsApiKey = import.meta.env.VITE_APP_NEWSAPI_KEY;

    const fetchNewsArticles = async (keyword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NewsApiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch news articles for keyword: ${keyword}`);
            }
            const data = await response.json();
            setNewsArticles(data.articles);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // This effect is to auto-fetch on keyword change if you still want that behavior
    useEffect(() => {
        if (selectedKeyword) {
            fetchNewsArticles(selectedKeyword.value);
        }
    }, [selectedKeyword]);

    return (
        <NewsContext.Provider value={{ newsArticles, loading, error, setSelectedKeyword, fetchNewsArticles }}>
            {children}
        </NewsContext.Provider>
    );
};
