import React, { Component, Fragment } from 'react'
import {GetMediaItem, EditItem} from '../API/GetData'
import MediaForm from '../utils/MediaForm'
import { store } from 'react-notifications-component'

class EditMediaItem extends Component {
    constructor() {
        super();
        this.state = {
            mediaItem: {
                title: '',
                type: '',
                date: '',
                imgUrl: '',
                description: ''
            }
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
        });
    }

    editItem = (values, onSubmitProps)=> {
        const mediaItemID = this.props.match.params.id
        EditItem(mediaItemID, values)
        .then(() => {
            onSubmitProps.resetForm()
            store.addNotification({
                title: "Success!",
                message: "Item updated",
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

    render() {
        return (
            <Fragment>
                <MediaForm 
                    values={this.state.mediaItem}
                    onSubmit={this.editItem}
                />
            </Fragment>
        )
    }
}

export default EditMediaItem
