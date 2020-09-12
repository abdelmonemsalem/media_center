import React, { Component } from 'react'
import {GetMediaItem, DeleteMediaItem} from '../../API/GetData'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { store } from 'react-notifications-component'

export class ViewMediaItem extends Component {
    constructor() {
        super();
        this.state = {
            mediaItem: []
        }
    }
    componentDidMount() {
        const mediaItemID = this.props.match.params.id
        GetMediaItem(mediaItemID)
        .then(response => {
        this.setState({
            mediaItem: response.data,
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
                  duration: 2000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                window.location = '/MediaCenterShow'
            }, 2000)
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
                  duration: 2000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                window.location = '/MediaCenterShow'
            }, 2000)
        })
    }

    render() {
        const {imgUrl, date, type, title, description} = this.state.mediaItem
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
                    <Link to={"/EditMediaItem/" + this.props.match.params.id}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                    <button onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                </div>
            </div>
        )
    }
}

export default ViewMediaItem
