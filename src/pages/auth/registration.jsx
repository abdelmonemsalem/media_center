import React, { Component } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import {AddUser} from '../../API/GetData'
import { store } from 'react-notifications-component'

class Registration extends Component {

    handleSubmit = (values, onSubmitProps)=> {
        AddUser(values)
        .then(() => {
            onSubmitProps.resetForm()
            store.addNotification({
                title: "Success!",
                message: "User Added",
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
                window.location = '/login'
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
                window.location = '/login'
            }, 1000)
        })
    }

    render() {
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is Required'),
            password: Yup.string().required('Password is Required'),
            confirmPassword:  Yup.string().oneOf([Yup.ref('password'), null]).required('Password confirm is required')
        });
        const errMsgTemp = msg => {
            return <span className="errMsg">{msg}</span>
        };
        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={this.handleSubmit}
                validationSchema={schema}
                >
                {(props) => (
                    <Form className="mediaCenter-form">
                        <div className="mediaCenter-formItem">
                            <label>User Name</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name">{errMsgTemp}</ErrorMessage>
                        </div>
                        
                        <div className="mediaCenter-formItem">
                            <label>Password</label>
                            <Field name="password" type="text" />
                            <ErrorMessage name="password">{errMsgTemp}</ErrorMessage>
                        </div>
                        <div className="mediaCenter-formItem">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="text" />
                            <ErrorMessage name="confirmPassword">{errMsgTemp}</ErrorMessage>
                        </div>
        
                        <div style={{"clear": "both"}}></div>
                        <button type="submit"><FontAwesomeIcon icon={faSave} /> Registre</button>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default Registration