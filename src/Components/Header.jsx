import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
  render() {
    return (
        <header className="mediaCenter-header">
          <ul>
            <li>
              <NavLink activeClassName="mediaCenter-active" exact to="/"><FontAwesomeIcon icon={faHome} /></NavLink>
            </li>
            <li>
              <NavLink activeClassName="mediaCenter-active" exact to="/MediaCenterShow">Media Center</NavLink>
            </li>
            <li>
              <NavLink activeClassName="mediaCenter-active" exact to="/CreateMediaItem">Create Item</NavLink>
            </li>
          </ul>
        </header>
    )
  }
}

export default Header
