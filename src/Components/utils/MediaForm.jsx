import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {Prompt} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
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
    return <Formik
        enableReinitialize={true}
        initialValues={props.values}
        onSubmit={props.onSubmit}
        validationSchema={schema}
        >
        {(props) => (
            <Form className="mediaCenter-form">
                <Prompt when={props.dirty} message={"You will Lose Entered Data"} />
                <div className="mediaCenter-formItem">
                    <label>Title</label>
                    <Field name="title" />
                    <ErrorMessage name="title">{errMsgTemp}</ErrorMessage>
                </div>
                
                <div className="mediaCenter-formItem">
                    <label>Type</label>
                    <Field name="type" component="select">
                        <option>Select Type</option>
                        <option value="news">news</option>
                        <option value="event">event</option>
                        <option value="rule">rule</option>
                    </Field>
                    <ErrorMessage name="type">{errMsgTemp}</ErrorMessage>
                </div>
                
                <div className="mediaCenter-formItem">
                    <label>Date</label>
                    <Field name="date" />
                    <ErrorMessage name="date">{errMsgTemp}</ErrorMessage>
                </div>
                
                <div className="mediaCenter-formItem">
                    <label>Image Url</label>
                    <Field name="imgUrl" />
                    <ErrorMessage name="imgUrl">{errMsgTemp}</ErrorMessage>
                </div>
                
                <div className="mediaCenter-formItem">
                    <label>Description</label>
                    <Field name="description" component="textarea" />
                    <ErrorMessage name="description">{errMsgTemp}</ErrorMessage>
                </div>
                <div style={{"clear": "both"}}></div>
                <button type="submit"><FontAwesomeIcon icon={faSave} /> Save</button>
            </Form>
        )}
    </Formik>
}

export default MediaForm