import React, { useState, useEffect, } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import NoImage from '../../assets/NoImage.jpg'


const NewsApiBento = ({newsArr}) => {

    const firstTenArticles = newsArr.slice(0, 10);
   
    return (
        <div>
           {firstTenArticles.map((newsArticle, index) => {
        const { title, urlToImage, source } = newsArticle;
        const mainImage = urlToImage || NoImage;

        const thumbnails = firstTenArticles
        .filter((_, idx) => idx !== index)
        .slice(0, 4);

        return (
          <Card className="bento-box-card mb-3" key={source.name + index}>
            <Row className="g-0">
              <Col md={8}>
                <Card.Img src={mainImage} className="img-fluid" alt="Main" />
              </Col>
              <Col md={4} className="thumbnails">
                {thumbnails.map((thumb, thumbIndex) => (
                  <Card.Img
                    key={thumbIndex}
                    src={thumb.urlToImage || NoImage}
                    className="img-fluid thumbnail-img"
                    alt={`Thumbnail ${thumbIndex + 1}`}
                  />
                ))}
              </Col>
            </Row>
          </Card>
        );
      })}
        </div>
    );
};

export default NewsApiBento;