import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import * as firebase  from 'firebase'

class SubmitForm extends React.Component {
    state = {
        name:'',
        enrollment: '',
        subjects:[],
        today:'',
        classes:[],
    }

    formatData() {

        const today = new Date().toLocaleDateString()
        const time = new Date().getTime()
        const { enrollment, name } = this.state

        const db = firebase.database().ref().child('days').child(today).child('students')
        const key = db.push().key
        const newData = {enrollment, name, time}
        const updates = {}
        updates[key] = newData
        db.update(updates)
        console.log('completed!')
        this.setState({name:'', enrollment: ''})
    }

    handleChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        console.log(this.props.classes)
        return (
        <MDBContainer>
        <MDBRow>
            <MDBCol md="6">
            <form>
                <p className="h5 text-center mb-4">Fill your Details below</p>
                <div className="grey-text">
                <MDBInput name='name' onChange={(e)=>this.handleChange(e)} value={this.state.name} label="Full Name" group type="text" validate error="wrong"
                    success="right" />
                <MDBInput name='enrollment' label="Enrollment Number (xx/20xx/xxx)" group type="number" validate error="wrong"
                    success="right" onChange={(e)=>this.handleChange(e)} value={this.state.enrollment} />
                </div>
                <div>
                {this.props.classes !== null && this.props.classes.map(i=>(
                    <div key={i}>
                        <input type="checkbox" className="custom-control-input" id={i} name='marketing' />
                        <label className="custom-control-label" htmlFor={i}>{i}</label>
                    </div>
                ))
            }
                </div>
                <div className="text-center">
                <MDBBtn onClick={()=>this.formatData()} color="primary">Submit Attendance</MDBBtn>
                </div>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        )
    }
}

export default SubmitForm