import React, { Component } from 'react'
import {GetMediaItem, EditItem ,DeleteMediaItem} from '../API/GetData'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faEdit, faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { store } from 'react-notifications-component'
import { connect } from 'react-redux'
import { addToFav, removeFromFavById } from '../store/rootActions'
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
        const favBtn = this.state.fav ? <button onClick={() => this.handleRemoveFromFav(this.props.match.params.id)}> <FontAwesomeIcon icon={faHeart} /></button> : <button style={{backgroundColor: '#bbb'}} onClick={() => this.addToFav(this.state.mediaItem)}> <FontAwesomeIcon icon={faHeart} /></button>
        const editBtn = <Link to={"/EditMediaItem/" + this.props.match.params.id}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
        const deleteBtn = <button onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
        const userType = this.props.userType;

        return (
            <div className="mediaItemDetails">
                <img src={'.'+imgUrl} alt="img" />
                <div>
                    <h2>{title}</h2>
                    <div>
                        <span><FontAwesomeIcon icon={faCalendarAlt} /> {date}</span>
                        <span className={type}>Type: {type}</span>
                    </div>
                    <p>{description}</p>
                    {
                        userType === 'admin' ? editBtn : null
                    }
                    {
                        userType === 'admin' ? deleteBtn : null
                    }
                    {
                        userType === 'admin' ? favBtn : null
                    }
                </div>
            </div>
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
        userType: state.user.userType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMediaItem)
