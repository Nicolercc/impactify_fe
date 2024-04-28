import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselComponent() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const data = [
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "March to DC: Rally for Change - Join Sarah's Movement!",
    },
    {
      src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
      title: "Community Cleanup: Let's Make Our Neighborhood Shine ",
    },
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "Global Solidarity Summit: Uniting for a Fairer, More Just World!",
    },
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.src} alt={item.title} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
