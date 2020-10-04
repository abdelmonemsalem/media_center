import React, { Component } from 'react';
import FavItem from '../Components/FavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { clearFav } from '../store/rootActions'
import { EditItem } from '../API/GetData'

export class Fav extends Component {

    handleClearFav = () => {
        const items = this.props.favItems;
        this.props.clearFav();
        items.map((item) => localStorage.removeItem(item._id))
    }

    handleSaveToDB = () => {
        const items = this.props.favItems;
        items.map((item) => 
            EditItem(item._id, item)
        )
        this.props.clearFav();
        items.map((item) => localStorage.removeItem(item._id))
    }

    render() {
        const items = this.props.favItems;
        return (
            <div className="mediaMarked">
                {items.length <= 0 ?
                    <div className="noItems">No Marked Items To Show</div> :
                    (
                        <div>
                            {items.map((item, index) => <FavItem key={item._id} item={item} index={index} />)}
                            <button onClick={() => this.handleClearFav()}>Clear <FontAwesomeIcon icon={faTrashAlt} /></button>
                            <button onClick={() => this.handleSaveToDB()}>Save <FontAwesomeIcon icon={faSave} /></button>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favItems: state.favItemReducer.favourites
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFav: () => dispatch(clearFav())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fav);
