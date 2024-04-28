import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Events from "../Pages/Events";
import NoImage from "../assets/NoImage.jpg";
import "./ReleatedEvents.css";

function RelatedEvents() {
  return (
    <>
      <div className="d-flex align-items-center">
        <h2 className="me-3 releated-custom-color">Related Events</h2>
        <div className="bar"></div>
      </div>
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              src={NoImage}
              className="img-fluid custom-carousel-image"
              alt={"no image"}
            />
            <Carousel.Caption>
              <h3 className="releated-custom-color">First slide label</h3>
              <p className="releated-custom-color">
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              src={NoImage}
              className="img-fluid custom-carousel-image"
              alt={"no image"}
            />
            <Carousel.Caption>
              <h3 className="releated-custom-color">Second slide label</h3>
              <p className="releated-custom-color">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={NoImage}
              className="img-fluid custom-carousel-image"
              alt={"no image"}
            />
            <Carousel.Caption>
              <h3 className="releated-custom-color">Third slide label</h3>
              <p className="releated-custom-color">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default RelatedEvents;
