import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  // console.log(this.props)
  return (
      <MDBNavbar color="blue" fixed='top' dark expand="md">
        <MDBNavbarBrand to='/' >
          <strong className="white-text">Attendance Manager</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active={this.props.location.pathname === '/'}>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={this.props.location.pathname === '/SubmitForm'}>
              <MDBNavLink to="/SubmitForm">Attendance</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem active={this.props.location.pathname === '/Admin'}>
              <MDBNavLink to="/Admin">Admin</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default withRouter(Navbar);