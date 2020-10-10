import React, { Component } from 'react'
import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import {AddUser} from '../../API/GetData'
import { store } from 'react-notifications-component'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                    <FormikForm className="m-t-b-30">
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Field className="form-control" name="name" />
                                    <ErrorMessage name="name">{errMsgTemp}</ErrorMessage>
                                </Form.Group>
                            </Col>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Field className="form-control" name="password" />
                                    <ErrorMessage name="password">{errMsgTemp}</ErrorMessage>
                                </Form.Group>
                            </Col>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Field className="form-control" name="confirmPassword" />
                                    <ErrorMessage name="confirmPassword">{errMsgTemp}</ErrorMessage>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                                <Button className="m-10" type="submit"><FontAwesomeIcon icon={faSave} /> Registre</Button>
                            </Col>
                        </Row>
                    </FormikForm>
                )}
            </Formik>
        )
    }
}

export default Registration