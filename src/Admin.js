import React from 'react'
import * as firebase from 'firebase'
import { MDBContainer, MDBBtn } from 'mdbreact'

class Admin extends React.Component {

    state = {
        todayclass:[],
        marketing:false,
        forensic:false,
        medchem:false,
        pharmatech:false,
    }

    submitClasses() {
        const NewArray = Object.keys(this.state).filter(i=>this.state[i]===true)
        console.log(NewArray)
        const db = firebase.database().ref().child('classes')
        db.set(NewArray)
        .then(console.log('new classes'))
    }
    handleChange(e) {
        const { name } = e.target
        this.setState(state=>({
            [name]:!state[name]
        }))
    }

    render() {
        return(
        <MDBContainer>
            <div>
                <h2>Fill todays class checkbox!</h2>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="medchem" name='medchem' checked={this.state.medchem} />
              <label className="custom-control-label" htmlFor="medchem">Medicinal Chemistry</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="marketing" name='marketing' checked={this.state.marketing} />
              <label className="custom-control-label" htmlFor="marketing">Pharmaceutical Marketing</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="forensic" name='forensic' checked={this.state.forensic} />
              <label className="custom-control-label" htmlFor="forensic">Forensic Pharmacy</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="pharmatech" name='pharmatech' checked={this.state.pharmatech} />
              <label className="custom-control-label" htmlFor="pharmatech">Pharmaceutical Technology</label>
            </div>
            <MDBBtn onClick={()=>this.submitClasses()}>Submit</MDBBtn>
        </MDBContainer>
        )
    }
}

export default Admin