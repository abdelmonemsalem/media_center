import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

function UsersSettingIcon(props) {
    return (
        <span>
            <span>{props.newUsersCount}</span>
            <FontAwesomeIcon icon={faUsers} /> New Users
        </span>
    )
}

const mapStateToProps = (state) => {
    const count = state.user.newUserRequests
    return {
        newUsersCount: count === undefined ? 0 : count.length
    };
}

export default connect(mapStateToProps)(UsersSettingIcon);
