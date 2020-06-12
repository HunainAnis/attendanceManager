import React from 'react';
import './App.css';
import * as firebase from 'firebase'
import SubmitForm from './submitForm';
import HeaderTop from './Header';
import Navbar from './Navbar';
import { BrowserRouter as Route, Switch, Redirect } from "react-router-dom";
import Admin from './Admin';
import { MDBBtn, MDBContainer, MDBNavItem, MDBNavLink } from 'mdbreact';

class Home extends React.Component {
  state = {
    data: '',
    classes:[],
    days:null
  }

  componentDidMount() {
    const db = firebase.database().ref()
    db.child('classes').on('value', snapshot => {
        this.setState({
            classes: snapshot.val()
        })
    })
    db.child('days').on('value', snapshot=> {
      this.setState({days: snapshot.val()})
    })
  }
  render() {
  return (
    <div>
        <Navbar />
        <HeaderTop />
        {this.state.days === null 
        ?<h1>Loading...</h1>
        :
        <Switch>
            <Route exact path='/'>
              {console.log(this.props)}
              <MDBContainer style={{alignContent: 'center'}} className='center'>
              <MDBBtn>
                <MDBNavLink to="/SubmitForm">Attendance</MDBNavLink>
            </MDBBtn>
              </MDBContainer>
            </Route>
            <Route exact path='/SubmitForm'>
                <SubmitForm days={this.state.days} classes = {this.state.classes} />
            </Route>
            <Route exact path='/Admin'>
                <Admin classes = {this.state.classes} />
            </Route>
        </Switch>
      }
    </div>
  );
  }
}

export default Home;
