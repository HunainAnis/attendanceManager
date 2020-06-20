import React from "react";
import { MDBContainer, MDBFooter, MDBIcon } from "mdbreact";

const FooterPage = () => {
  return (
        <MDBFooter color="blue">
        <div className="footer-copyright text-center py-3">
            <MDBContainer >
            &copy; {new Date().getFullYear()} Copyright: <a target='_blanck' href="https://www.github.com/HunainAnis"><MDBIcon fab icon='github' /></a>
            </MDBContainer>
        </div>
        </MDBFooter>
  );
}

export default FooterPage;