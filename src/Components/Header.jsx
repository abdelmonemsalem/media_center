import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import DropdownMenu from './Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'

class Header extends Component {
  render() {
    const {userType, userConfirmed} = this.props;
    const creatItem = <Nav.Link as={NavLink} activeClassName="active" exact to="/CreateMediaItem">Create Item</Nav.Link>
    const MediaCenterShow = <Nav.Link as={NavLink} activeClassName="active" exact to="/MediaCenterShow">Media Center</Nav.Link>
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} activeClassName="active" exact to="/"><FontAwesomeIcon icon={faHome} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {
              userConfirmed === 'true' && (userType === 'admin' || userType === 'user') ? MediaCenterShow : null
            }
            {
              userConfirmed === 'true' && userType === 'admin' ? creatItem : null
            }
          </Nav>
          <DropdownMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
      userType: state.user.userType,
      userName: state.user.userName,
      userConfirmed: state.user.userConfirmed
  }
}

export default connect(mapStateToProps)(Header)
