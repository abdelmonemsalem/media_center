import React, { Component } from 'react';
import FavItem from '../Components/FavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { clearFav } from '../store/rootActions'
import { EditItem } from '../API/GetData'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
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
                    <div className="noItems text-center m-t-b-30">No Marked Items To Show</div> :
                    (
                        <div className="m-t-b-30">
                            <Row>
                                {items.map((item, index) => <FavItem key={item._id} item={item} index={index} />)}
                            </Row>
                            <div className="text-center m-t-b-30">
                                <Button className="m-10" variant="danger" onClick={() => this.handleClearFav()}>Clear <FontAwesomeIcon icon={faTrashAlt} /></Button>
                                <Button className="m-10" variant="success" onClick={() => this.handleSaveToDB()}>Save <FontAwesomeIcon icon={faSave} /></Button>
                            </div>
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
