import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class SubmitForm extends React.Component {
    state = {
        today:'',
        classes:[]
    }
    render() {
        return (
        <MDBContainer className='text-center'>
        <MDBRow>
            <MDBCol md="6">
            <form>
                <p className="h5 text-center mb-4">Fill your Details below</p>
                <div className="grey-text">
                <MDBInput label="Full Name" group type="text" validate error="wrong"
                    success="right" />
                <MDBInput label="Enrollment Number (xx/20xx/xxx)" group type="number" validate error="wrong"
                    success="right" />
                </div>
                <div className="text-center">
                <MDBBtn color="primary">Submit Attendance</MDBBtn>
                </div>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        )
    }
}

export default SubmitForm