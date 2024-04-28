import React, { useState, useEffect } from "react";
import Carousel from "../Components/Carousel/Carousel";
import CategoriesSection from "../Components/CategoriesSection";
import ResultsSection from "../Components/ResultsSection";
import SearchBar from "../Components/SearchBar";
import BentoBox from "../Components/Card/BentoBox";

import './DiscoverMonitor.css'

function DiscoverMonitor() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [eventsData, setEventsData] = useState([]); 
  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch News Data
      try {
        const newsResponse = await fetch(`${backend}/news`);
        const newsData = await newsResponse.json();
        setNewsData(newsData.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }

      try {
        const eventsResponse = await fetch(`${backend}/events`);
        const eventData = await eventsResponse.json();
        setEventsData(eventData.data);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }

      setIsLoading(false); 
    };

    fetchData();
  }, [backend]); 

  return (
    <>
    <SearchBar />
    <div className="d-flex justify-content-center flex-column">
      <div className="hero-section text-center p-5 bg-light">
      </div>
      <div className="custom-padding d-flex flex-column">
        {isLoading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="text-light" style={{ flex: "1 0 auto", overflow: "none" }}>
              <div className="fs-2 m-1 d-flex justify-content-center display-2">
                        
              </div>
              <Carousel />
            </div>

            <CategoriesSection onSelectCategory={handleSelectCategory} />
            <ResultsSection selectedCategory={selectedCategory} />
          </>
        )}
      </div>

      <div className="bg-purple p-4 mt-4">
        <div className="container">
          <BentoBox/>
        </div>
      </div>
    </div>
    </>
  );
}

export default DiscoverMonitor;
