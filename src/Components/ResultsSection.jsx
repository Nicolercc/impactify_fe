import React from "react";

import Card from "./Card/Card";

function ResultsSection({ selectedCategory }) {
  const cards = [
    {
      title: "Humanitarian Crisis in Gaza",
      imageSrc: "https://source.unsplash.com/random/400x300?global",
      text: "Global Issues",
      updatedAt: "2024-03-01",
    },
    {
      title: "Humanitarian Crisis in Congo & Sudan",
      imageSrc: "https://source.unsplash.com/random/400x300?politics",
      text: "Global Issues",
      updatedAt: "2024-03-01",
    },
    {
      title: "Climate Action Forum",
      imageSrc: " https://source.unsplash.com/random/400x300?global",
      text: "Politics",
      updatedAt: "2024-03-02",
    },
    {
      title: "Immigration Reform Town Hall",
      imageSrc: "https://source.unsplash.com/random/400x300?politics",
      text: "Politics",
      updatedAt: "2024-03-02",
    },
    {
      title: "Food Drive for the Homeless",
      imageSrc: "https://source.unsplash.com/random/400x300?social",
      text: "Social Causes",
      updatedAt: "2024-03-03",
    },
    {
      title: "Park Cleanup Initiative",
      imageSrc: "https://source.unsplash.com/random/400x300?social",
      text: "Social Causes",
      updatedAt: "2024-03-03",
    },
  ];

  const filteredCards = selectedCategory
    ? cards.filter((card) => card.text === selectedCategory)
    : cards;

  return (
    <div className="mx-3">
      {filteredCards.map((card, index) => (
        <div key={index}>
          <Card
            key={index}
            title={card.title}
            imageSrc={card.imageSrc}
            sx={{ maxWidth: 305, borderRadius: 10 }}
          />
        </div>
      ))}
    </div>
  );
}

export default ResultsSection;
