import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

const AdminApproval = () => {
  return (
    <MDBContainer>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="center"
        />
      </header>
      <br></br>
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="loginCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Waiting for Approval...
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <p>
                You account is waiting for our administrator approval. Please
                allow 24 - 48 hours
              </p>
              <p className="font-small grey-text d-flex justify-content-center">
                Return to log in?
                <a
                  href="/"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Click Here
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AdminApproval;
