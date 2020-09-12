import React, { Component } from 'react'
import {AddItem} from '../../API/GetData'
import MediaForm from '../utils/MediaForm'
import { store } from 'react-notifications-component'

class CreateMediaItem extends Component {
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

    addItem = (values, onSubmitProps)=> {
        AddItem(values)
        .then(() => {
            onSubmitProps.resetForm()
            store.addNotification({
                title: "Success!",
                message: "Item Added",
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
        console.log(this.state.mediaItem)
        return (
            <MediaForm 
                values={this.state.mediaItem}
                onSubmit={this.addItem}
            />
        )
    }
}

export default CreateMediaItem
