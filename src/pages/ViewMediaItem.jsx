import React, { Component } from 'react'
import {GetMediaItem, EditItem ,DeleteMediaItem} from '../API/GetData'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faEdit, faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { store } from 'react-notifications-component'
import { connect } from 'react-redux'
import { addToFav, removeFromFavById } from '../store/rootActions'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class ViewMediaItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaItem: {},
            fav: false
        }
    }
    componentDidMount() {
        const mediaItemID = this.props.match.params.id
        GetMediaItem(mediaItemID)
        .then(response => {
            this.setState({
                mediaItem: response.data,
                fav: localStorage.getItem(mediaItemID) === null ? response.data.fav : (localStorage.getItem(mediaItemID) === 'true' ? true : false)
            });
        })
        .catch(err => {
            alert('Unknown Error')
        });

    }

    handleDelete = () => {
        const mediaItemID = this.props.match.params.id
        DeleteMediaItem(mediaItemID)
        .then(() => {
            store.addNotification({
                title: "Success!",
                message: "Item Deleted",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                window.location = '/MediaCenterShow'
            }, 1000)
        })
        .catch(err => {
            store.addNotification({
                title: "Error!",
                message: "Something is going wrong",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                window.location = '/MediaCenterShow'
            }, 1000)
        })
    }

    addToFav = favItem => {
        this.props.addToFav(favItem)
        this.setState({
            fav: true
        })
        localStorage.setItem(this.props.match.params.id, true)
    }

    handleRemoveFromFav = itemId => {
        const removedItemId = this.props.match.params.id
        this.props.removeFromFavById(itemId)
        this.setState(prevState => {
            let mediaItem = Object.assign({}, prevState.mediaItem)
            mediaItem.fav = false;
            return EditItem(removedItemId, mediaItem);
        })
        this.setState({
            fav: false
        })
        localStorage.setItem(removedItemId, false);
    }

    render() {
        const {imgUrl, date, type, title, description} = this.state.mediaItem
        const favBtn = this.state.fav ? <Button className="favBtn" style={{backgroundColor: 'red', color: '#fff'}} onClick={() => this.handleRemoveFromFav(this.props.match.params.id)}> <FontAwesomeIcon icon={faHeart} /></Button> : <Button className="favBtn" style={{backgroundColor: '#bbb'}} onClick={() => this.addToFav(this.state.mediaItem)}> <FontAwesomeIcon icon={faHeart} /></Button>
        console.log(this.state.fav)
        const editBtn = <Link className="btn btn-info m-10" to={"/EditMediaItem/" + this.props.match.params.id}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
        const deleteBtn = <Button variant='danger' className="m-10" onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>
        const {userType, userConfirmed} = this.props;

        return (
            <Row>
            <Col lg={{ span: 8, offset: 2 }} md={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} className="mediaItemDetails">
                <Card className="text-white">
                    <Card.Img src={'.'+imgUrl} />
                    <Card.ImgOverlay>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            <span className="date"><FontAwesomeIcon icon={faCalendarAlt} /> {date}</span>
                            <span className={`type ${type}`}>Type: {type}</span>
                            <span className="description">{description}</span>

                            {
                                userConfirmed === 'true' && userType === 'admin' ? favBtn : null
                            }
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </Col>
            <Col lg={{ span: 8, offset: 2 }} md={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }}>
                {
                    userConfirmed === 'true' && userType === 'admin' ? editBtn : null
                }
                {
                    userConfirmed === 'true' && userType === 'admin' ? deleteBtn : null
                }
            </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToFav: favItem => dispatch(addToFav(favItem)),
        removeFromFavById: index => dispatch(removeFromFavById(index))
    }
}
const mapStateToProps = state => {
    return {
        userType: state.user.userType,
        userConfirmed: state.user.userConfirmed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMediaItem)
