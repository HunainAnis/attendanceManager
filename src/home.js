import React from 'react';
import './App.css';
import * as firebase from 'firebase'
import SubmitForm from './submitForm';
import HeaderTop from './Header';
import Navbar from './Navbar';
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Admin from './Admin';

class Home extends React.Component {
  state = {
    data: '',
    classes:[]
  }

  componentDidMount() {
    const db = firebase.database().ref().child('classes')
    db.on('value', snapshot => {
        this.setState({
            classes: snapshot.val()
        })
    })
  }
  render() {
  return (
    <div>
        <Navbar />
        <HeaderTop />
        <Switch>
            <Route path='/Admin'>
                <Admin classes = {this.state.classes} />
            </Route>
            <Route exact path='/SubmitForm'>
                <SubmitForm classes = {this.state.classes} />
            </Route>
        </Switch>
    </div>
  );
  }
}

export default Home;
