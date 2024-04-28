import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import noImage from '../../assets/NoImage.jpg'


export function HorizonCard({cardObj, tag,  imageLoad, cardClick }) {
 
const reducedCard = {
  card_title: cardObj.event_title || cardObj.news_title|| "title missing",
  // event_details || news_content -- text
  card_text : cardObj.event_details || cardObj.news_content || "text missing", 
  // event_photo || news_image -- image
  card_photo: cardObj.event_photo|| cardObj.news_image || noImage,
  // event_keywords || news_keywords -- keywords
  card_keywords: cardObj.event_keywords || cardObj.news_keywords || "keyword missing",
  // key = i
}

return (

    <Card className="mb-3" onClick={cardClick}>
    <Row className="g-0">
      <Col md={4}>
        <Card.Img variant="left" src={reducedCard.card_photo} className="card-img-hover" onError={(e) => { e.target.onerror = null; e.target.src = noImage; }} />
      </Col>
      <Col md={8}>
        <Card.Body>
          <Card.Title>{reducedCard.card_title}</Card.Title>
          <Card.Text>{reducedCard.card_text}</Card.Text>
          <Card.Text>
            <small className="text-muted">{reducedCard.card_keywords}</small>
          </Card.Text>
        </Card.Body>
      </Col>
    </Row>
  </Card>


)

}