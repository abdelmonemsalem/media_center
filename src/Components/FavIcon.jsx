import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

function FavIcon(props) {
    return (
        <span>
            <span>{props.favCount}</span>
            <FontAwesomeIcon icon={faBell} /> Favourites
        </span>
    )
}

const mapStateToProps = (state) => {
    return {
        favCount: state.favItemReducer.favourites.length
    };
}

export default connect(mapStateToProps)(FavIcon);
