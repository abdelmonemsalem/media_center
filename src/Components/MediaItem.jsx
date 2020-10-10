import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function trimLongText(text, wordLength) {
    var shortTxt;
    if (text.length > wordLength) {
        shortTxt = text.substring(0, wordLength) + " ...";
    } else {shortTxt = text};
    return shortTxt;
}

function MediaItem(props) {
    const mediaItem = props.filterdData.map(item =>
        <Col lg={4} md={4} sm={4} key={item._id} id={item._id} className="mediaCenter-items">
            <Card>
                <Card.Img variant="top" src={item.imgUrl} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        <span className="mediaItem-date"><FontAwesomeIcon icon={faCalendarAlt} /> {item.date}</span>
                        {trimLongText(item.description, 70)}
                    </Card.Text>
                    <Link to={"/ViewMediaItem/" + item._id}>See More <FontAwesomeIcon icon={faEye} /></Link>
                </Card.Body>
                <span className={`mediaItem-type ${item.type}`}>{item.type}</span>
            </Card>
        </Col>
    )
    return (
        <Row lg={4} md={4} sm={4}>
            {mediaItem}
        </Row>
    );
}

export default MediaItem;