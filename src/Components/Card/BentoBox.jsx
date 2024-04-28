import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import MainImg from '../../assets/ImpactifyImgs.jpeg'
import NoImage from '../../assets/NoImage.jpg'

const BentoBox = () => {
  return (
      <Card className="bento-box-card mb-3" >
        <Row className="g-0">
          <Col md={8}>
            <Card.Img src={MainImg} className="img-fluid" alt="Main" />
          </Col>
          <Col md={4} className="thumbnails">
            <Card.Img src={NoImage} className="img-fluid thumbnail-img" alt="Thumb 1" />
            <Card.Img src={NoImage} className="img-fluid thumbnail-img" alt="Thumb 2" />
            <Card.Img src={NoImage} className="img-fluid thumbnail-img" alt="Thumb 3" />
            <Card.Img src={NoImage} className="img-fluid thumbnail-img" alt="Thumb 4" />
          </Col>
        </Row>
      </Card>
  );

};

export default BentoBox;