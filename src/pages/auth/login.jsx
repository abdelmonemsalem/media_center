import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, userLogin, userTypeCredentila } from '../../store/rootActions'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { store } from 'react-notifications-component'

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
        
                        <div style={{"clear": "both"}}></div>
                        <button type="submit"><FontAwesomeIcon icon={faSave} /> Login</button>
                        <Link to="/registration">Registration</Link>
                    </Form>
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