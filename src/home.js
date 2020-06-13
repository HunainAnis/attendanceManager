import React from 'react';
import './App.css';
import * as firebase from 'firebase'
import SubmitForm from './submitForm';
import HeaderTop from './Header';
import Navbar from './Navbar';
import { BrowserRouter as Route, Switch, Redirect, withRouter } from "react-router-dom";
import Admin from './Admin';
import { MDBBtn, MDBContainer, MDBNavItem, MDBNavLink } from 'mdbreact';
import FooterPage from './footer';

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
    <div style={{position: 'relative', minHeight:'100vh'}}>
    <div>
        <Navbar />
        <div style={{height:60}}></div>
        {this.state.days === null 
        ?<h1 style={{textAlign:'center'}}>Loading...</h1>
        :
        <Switch>
            <Route exact path='/'>
              {console.log(this.props)}
              <MDBContainer style={{alignContent: 'center'}} className='text-center'>
                <HeaderTop />
                <MDBBtn onClick={()=>this.props.history.push('/SubmitForm')}>
                  Go to Attendance
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
      <div style={{height:60}}></div>
    </div>
    <div style={{position: 'absolute', bottom: 0, width: '100%', height: 10}}>
      <FooterPage />
    </div>
    </div>
  );
  }
}

export default withRouter(Home);
