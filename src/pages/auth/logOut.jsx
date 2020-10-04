import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogout, fetchUsers } from '../../store/rootActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Logout extends Component {
    handleLogout = () => {
        this.props.userLogout()
        this.props.fetchUsers();
    }

    render() {
        return (
            <button onClick={() => this.handleLogout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
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