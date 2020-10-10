import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const newUsersCount = localStorage.getItem('newUserRequests') === '0' ? '' : localStorage.getItem('newUserRequests')
function UsersSettingIcon() {
    return (
        <span>
            <span>{newUsersCount}</span>
            <FontAwesomeIcon icon={faUsers} /> Users Setting
        </span>
    )
}

export default UsersSettingIcon;
