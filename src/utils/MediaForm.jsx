import React, { Fragment } from 'react'
import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {Prompt} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function MediaForm(props) {

    const schema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        type: Yup.string().required('Type is Required'),
        date: Yup.string().required('Date is Required'),
        imgUrl: Yup.string().required('Item Image Url is Required'),
        description: Yup.string().required('Description is Required'),
    })
    const errMsgTemp = msg => {
        return <span className="errMsg">{msg}</span>
    }
    return( 
<Fragment>
    <Formik
        enableReinitialize={true}
        initialValues={props.values}
        onSubmit={props.onSubmit}
        validationSchema={schema}
        >
        {(props) => (
            <FormikForm className="m-t-b-30">
                <Prompt when={props.dirty} message={"You will Lose Entered Data"} />
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Field className="form-control" name="title" />
                            <ErrorMessage name="title">{errMsgTemp}</ErrorMessage>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Field className="form-control" name="type" component="select">
                                <option>Select Type</option>
                                <option value="news">news</option>
                                <option value="event">event</option>
                                <option value="rule">rule</option>
                            </Field>
                            <ErrorMessage name="type">{errMsgTemp}</ErrorMessage>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Field className="form-control" name="date" />
                            <ErrorMessage name="date">{errMsgTemp}</ErrorMessage>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Image Url</Form.Label>
                            <Field className="form-control" name="imgUrl" />
                            <ErrorMessage name="imgUrl">{errMsgTemp}</ErrorMessage>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field className="form-control" component="textarea" name="description"/>
                    <ErrorMessage name="description">{errMsgTemp}</ErrorMessage>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faSave} /> Save
                </Button>
            </FormikForm>
        )}
    </Formik></Fragment>
)}

export default MediaForm