import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, userLogin, userTypeCredentila } from '../../store/rootActions'
import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { store } from 'react-notifications-component'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Login extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    onSubmit = (values) => {
        localStorage.setItem('name', values.name)
        localStorage.setItem('password', values.password)
        this.props.userTypeCredentila();
        this.props.userLogin();
        (this.props.logStatus ? window.location = '/UserPage' : store.addNotification({
                title: "Error!",
                message: "Invalid User or Password",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
            }));
    }



    render() {
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is Required'),
            password: Yup.string().required('Password is Required'),
        
        });
        const errMsgTemp = msg => {
            return <span className="errMsg">{msg}</span>
        };
        return (
            <Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    password: ''
                }}
                onSubmit={(values) => this.onSubmit(values)}
                validationSchema={schema}
                >
                {() => (
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
                        </Row>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                                <Button variant="success" className="m-10" type="submit"><FontAwesomeIcon icon={faSave} /> Login</Button>
                                <Link className="btn btn-primary m-10" to="/registration"><FontAwesomeIcon icon={faPaperPlane} /> Registration</Link>
                            </Col>
                        </Row>
                    </FormikForm>
                )}
            </Formik>
            </Fragment>
        )
    }
}
    
const mapStateToProps = state => {
    return {
        logStatus: state.user.logStatus,
        userName: state.user.userName,
        password: state.user.password
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        userLogin: () => dispatch(userLogin()),
        userTypeCredentila: () => dispatch(userTypeCredentila()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)