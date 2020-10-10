import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { delFromFav } from '../store/rootActions'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function FavItem(props) {
    const item = props.item;
    const delFromFav = (index, id) => {
        props.delFromFav(index);
        localStorage.setItem(id, false)
    };
    function trimLongText(text, wordLength) {
        var shortTxt;
        if (text.length > wordLength) {
            shortTxt = text.substring(0, wordLength) + " ...";
        } else {shortTxt = text};
        return shortTxt;
    }
    return (
        <Col lg={3} md={3} sm={3} className="mediaMarked-item m-b-30">
            <Card>
                <Card.Header>{item.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <span className="date"><FontAwesomeIcon icon={faCalendarAlt} /> {item.date}</span>
                        <span className={"type " + item.type}>{item.type}</span>
                        {trimLongText(item.description, 50)}
                    </Card.Text>
                    <Button size="sm" variant="danger" onClick={() => delFromFav(props.index, item._id)}><FontAwesomeIcon icon={faTrashAlt} /> Delete From Fav</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        delFromFav: index => dispatch(delFromFav(index))
    }
}

export default connect(null, mapDispatchToProps)(FavItem)
