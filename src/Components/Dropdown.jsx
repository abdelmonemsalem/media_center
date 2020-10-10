import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSuitcase, faSignInAlt, faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import FavIcon from './FavIcon'
import Logout from '../pages/auth/logOut'
import { connect } from 'react-redux'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

export class DropdownMenu extends Component {

    constructor() {
        super()
        this.state = {
            newUsersCount: 0
        }
    }
    
    renderNewUsersCount = () => {
        this.setState({
            newUsersCount: localStorage.getItem('newUserRequests') === '0' ? '' : localStorage.getItem('newUserRequests')
        })
    }

    render() {
        const {userConfirmed, userType, logStatus, favCount} = this.props
        const newUsersCount = this.state.newUsersCount
        const favMark = <NavDropdown.Item href="/Fav"><FavIcon /></NavDropdown.Item>
        const newUsers = <NavDropdown.Item href="/UsersSetting">
                            {newUsersCount == 0 ? '' : <span className="nUsersCount">{newUsersCount === 0 ? '' : newUsersCount}</span>}
                            <FontAwesomeIcon icon={faUsers} /> Users Setting
                        </NavDropdown.Item>
        const notifiCount = parseInt(newUsersCount == 0 ? 0 : newUsersCount) + (favCount);
        const userWelcome = <Fragment>
                                 {userConfirmed === 'true' && userType === 'admin' ? (notifiCount === 0 ? '' : <span className="notifiCount">{notifiCount}</span>) : null}
                                <FontAwesomeIcon icon={faUser} /> Hello: {this.props.userName}
                            </Fragment>
        return (
            <Fragment>
                {
                logStatus ?
                    <Nav>
                        <NavDropdown variant="dark" title={userWelcome} id="basic-nav-dropdown" onMouseOver={() => this.renderNewUsersCount()}>
                        <NavDropdown.Item href="/UserPage"><FontAwesomeIcon icon={faSuitcase} /> Profile</NavDropdown.Item>
                            {
                                userConfirmed === 'true' && userType === 'admin' ? newUsers : null
                            }
                            {
                                userConfirmed === 'true' && userType === 'admin' ? favMark : null
                            }
                            <Logout />
                        </NavDropdown>
                    </Nav> :
                    <Nav>
                        <Nav.Link as={NavLink} activeClassName="active" exact to="/Login">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" exact to="/registration">
                            <FontAwesomeIcon icon={faPaperPlane} /> Registration
                        </Nav.Link>
                    </Nav>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userType: state.user.userType,
        userName: state.user.userName,
        logStatus: state.user.logStatus,
        userConfirmed: state.user.userConfirmed,
        favCount: state.favItemReducer.favourites.length
    }
  }
  
export default connect(mapStateToProps)(DropdownMenu)
