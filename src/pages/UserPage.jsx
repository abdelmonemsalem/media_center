import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'

class UserPage extends Component {
    render() {
        const {userName, password, logStatus, userType, userConfirmed} = this.props
        return (
            <ListGroup className="m-t-b-30">
                <ListGroup.Item>User Name: {userName}</ListGroup.Item>
                <ListGroup.Item>Password: {password}</ListGroup.Item>
                <ListGroup.Item>Log Status: {logStatus ? <span className="list-group-item-success">Login</span> : <span className="list-group-item-danger">Logout</span>}</ListGroup.Item>
                <ListGroup.Item>User Type: {userType}</ListGroup.Item>
                <ListGroup.Item>Confirmation Status: {userConfirmed === 'true' ? <span className="list-group-item-success">Confirmed</span> : <span className="list-group-item-danger">Not Confirmed</span>}</ListGroup.Item>
            </ListGroup>
        )
    }
}

const mapStateToProps = state => {
    const {userName, password, logStatus, userType, userConfirmed} = state.user
    return {
        userName: userName,
        password: password,
        logStatus: logStatus,
        userType: userType,
        userConfirmed: userConfirmed
    }
}

export default connect(mapStateToProps)(UserPage)