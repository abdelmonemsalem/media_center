import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSuitcase, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import FavIcon from './FavIcon'
import UsersSettingIcon from './UsersSettingIcon'
import Logout from '../pages/auth/logOut'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    const userType = this.props.userType;
    const logStatus = this.props.logStatus;
    const favMark = <NavLink activeClassName="mediaCenter-active" exact to="/Fav">
                      <FavIcon />
                    </NavLink>

    const newUsers = <NavLink activeClassName="mediaCenter-active" exact to="/NewUsers">
                      <UsersSettingIcon />
                     </NavLink>
    const logOutBtn = <Logout />
    const creatItem = <li>
                        <NavLink activeClassName="mediaCenter-active" exact to="/CreateMediaItem">Create Item</NavLink>
                      </li>

    const MediaCenterShow = <li>
                              <NavLink activeClassName="mediaCenter-active" exact to="/MediaCenterShow">Media Center</NavLink>
                            </li>

    return (
        <header className="mediaCenter-header">
          <ul>
            <li>
              <NavLink activeClassName="mediaCenter-active" exact to="/"><FontAwesomeIcon icon={faHome} /></NavLink>
            </li>
            {
              userType === 'admin' || userType === 'user' ? MediaCenterShow : null
            }
            {
              userType === 'admin' ? creatItem : null
            }
            
            {logStatus ? <li className="dropdown">
              <button className="dropbtn"><FontAwesomeIcon icon={faUser} /> Hello: {this.props.userName}</button>
              <div className="dropdown-content">
                <Link to="/UserPage"><FontAwesomeIcon icon={faSuitcase} /> Profile</Link>
                {
                  userType === 'admin' ? newUsers : null
                }
                {
                  userType === 'admin' ? favMark : null
                }
                {
                  logOutBtn
                }
              </div>
            </li> : <li className="dropdown"><Link to="/Login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>}
          </ul>
        </header>
    )
  }
}

const mapStateToProps = state => {
  return {
      userType: state.user.userType,
      userName: state.user.userName,
      logStatus: state.user.logStatus,
  }
}

export default connect(mapStateToProps)(Header)
