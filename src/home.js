import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import { fileStructure } from './config';
import SubmitForm from './submitForm';
import HeaderTop from './Header';

class Home extends React.Component {
  state = {
    data: ''
  }

  componentDidMount() {
    const database =  firebase.database()
    const dbRef = database.ref().child('days')
    dbRef.on('value', snapshot => {
        this.setState({
          data: snapshot.val()
        })
    })
    dbRef.set(fileStructure.days)
    .then(console.log('updated'))
  }

  render() {
  return (
    <div>
        <HeaderTop />
        <SubmitForm />
    </div>
  );
  }
}

export default Home;
