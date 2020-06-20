import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import * as firebase  from 'firebase'
import { withRouter } from "react-router-dom";

class SubmitForm extends React.Component {
    state = {
        name:'',
        enrollment: '',
        marketing:false,
        forensic:false,
        medchem:false,
        clinical:false,
        biopharma:false,
        pharmatech:false,
    }

    checkerIfExistAlready() {
        if(this.props.days === null) {
            return false
        }else {
            const now = new Date()
            let today = now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()
            const { days } = this.props
    
            return days[today] !== undefined && Object.keys(days[today].students).filter(i=>days[today].students[i].enrollment === this.state.enrollment).length !== 0 
        }
    }

    handleSubmit() {
        if(this.state.name === '') {
            alert('Please enter you Name!')
        }
        else if(this.state.enrollment === '') {
            alert('Please enter your correct Roll Number in a format like this (1x/20xx/xxx)!')
        }
        else if(this.state.enrollment[2] !== '/') {
            alert('Please enter your correct Roll Number in a format like this (1x/20xx/xxx)!')
        }
        else if(this.state.enrollment[7] !== '/') {
            alert('Please enter your correct Roll Number in a format like this (1x/20xx/xxx)!')
        }
        else if(this.checkerIfExistAlready()) {
            alert('Your data already exist for today!')
        }
        else{
        const now = new Date()
        let today = now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()
        const time = new Date().getTime()
        const { enrollment, name } = this.state
        const classes = Object.keys(this.state).filter(i=>this.state[i]===true)

        console.log(Date().toLocaleString(time))

        const db = firebase.database().ref().child('days').child(today).child('students')
        const key = db.push ().key
        const newData = {enrollment, name, time, classes}
        const updates = {}
        updates[key] = newData
        db.update(updates)
        // console.log('completed!')
        this.setState({name:'', enrollment: '', marketing:false, forensic:false, medchem:false, pharmatech:false,})
        this.props.history.goBack()
        alert('Your entry is submitted!')
    }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleToggle(e) {
        const { name } = e.target
        this.setState(state=>({
            [name]:!state[name]
        }))
    }

    render() {
        // console.log(this.props)
        return (
            <MDBContainer>
            {/* {this.props.days === null 
                ?<h1 style={{textAlign:'center'}}>Loading...</h1>
                : */}
        <MDBRow>
            <MDBCol md="12">
            <form>
                <p className="h5 text-center mb-4">Fill your Details below</p>
                <div className="grey-text">
                <MDBInput name='name' onChange={(e)=>this.handleChange(e)} value={this.state.name} label="Full Name" group type="text" validate error="wrong"
                    success="right" />
                <MDBInput name='enrollment' label="Enrollment Number (xx/20xx/xxx)" group type="text" validate error="wrong"
                    success="right" onChange={(e)=>this.handleChange(e)} value={this.state.enrollment} />
                </div>
                <div>
                {
                    this.props.classes !== null && this.props.classes.map(i=>(
                        <MDBCol key={i}>
                            <input onChange={e=>this.handleToggle(e)} type="checkbox" className="custom-control-input" checked={this.state[i]} id={i} name={i} />
                            <label className="custom-control-label" htmlFor={i}>{i}</label>
                        </MDBCol>
                    ))
                }
                </div>
                <div className="text-center">
                <MDBBtn onClick={()=>this.handleSubmit()} color="blue">Submit Attendance</MDBBtn>
                </div>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        )
    }
}

export default withRouter(SubmitForm)