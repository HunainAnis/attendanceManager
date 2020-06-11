import React from "react";

import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBCardText,  MDBCardTitle } from "mdbreact";

const HeaderTop = () => {
  return (
    <MDBContainer className="mt-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <MDBCardBody>
              <MDBCardTitle className="h2">
                Attendance Manager
              </MDBCardTitle>
              <MDBCardText>
                The following webpage is built to ease Attendance submission of the leftovers!
                I've tried to make it as simple as possible.
                Still if you feel that something needed to be changed do let me know!
              </MDBCardText>
            </MDBCardBody>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default HeaderTop;