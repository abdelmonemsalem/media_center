import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { delFromFav } from '../store/rootActions'

function FavItem(props) {
    const item = props.item;
    return (
        <div className="mediaMarked-item">
            <div>
                <h2>{item.title}</h2>
                <div>
                    <span className="date"><FontAwesomeIcon icon={faCalendarAlt} /> {item.date}</span>
                    <span className={"type " + item.type}>{item.type}</span>
                </div>
                <button onClick={() => props.delFromFav(props.index)}><FontAwesomeIcon icon={faTrashAlt} /> Delete From Fav</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        delFromFav: index => dispatch(delFromFav(index))
    }
}

export default connect(null, mapDispatchToProps)(FavItem)
