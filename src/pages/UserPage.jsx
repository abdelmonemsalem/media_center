import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store/rootActions'

class UserPage extends Component {
    render() {
        this.props.fetchUsers()
        return (
            <div style={{color: "#fff", paddingTop: "200px"}}>
                Welcome: {this.props.userName}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.user.userName,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)