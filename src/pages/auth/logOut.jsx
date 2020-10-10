import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogout, fetchUsers } from '../../store/rootActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from 'react-bootstrap/NavDropdown'

class Logout extends Component {
    handleLogout = () => {
        this.props.userLogout()
        this.props.fetchUsers();
    }

    render() {
        return (
            <NavDropdown.Item href="/Login" onClick={() => this.handleLogout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavDropdown.Item>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout()),
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(null, mapDispatchToProps)(Logout)