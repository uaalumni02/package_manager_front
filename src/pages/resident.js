import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import SubmitBtn from "../components/submitBtn";

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";

import settings from "../config/configData";

const Resident = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDeleted] = useState(false);
  const [residentConfirmation, setResidentConfirmation] = useState(false);
  const { loggedIn } = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;

    fetch(`${settings.apiBaseUrl}/api/resident`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        isDeleted
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === true) {
          setResidentConfirmation(true);
        }
      })
      .catch(error => console.error("Error:", error));
  };
  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      {residentConfirmation ? <Redirect to={`/allResidents/`} /> : ""}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="col-md-8 mx-auto">
            <MDBCard className="residentCard">
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Add New Resident</p>
                  <label
                    htmlFor="defaultFormCardNameEx"
                    className="grey-text font-weight-light"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="defaultFormCardNameEx"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailEx"
                    className="grey-text font-weight-light"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="defaultFormCardEmailEx"
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="defaultFormCardNameEx"
                    className="grey-text font-weight-light"
                  >
                    <br />
                    Phone
                  </label>
                  <input
                    type="text"
                    id="defaultFormCardNameEx"
                    className="form-control"
                    placeholder="999-999-9999"
                    onChange={e => setPhone(e.target.value)}
                  />
                  <div className="text-center py-4 mt-3">
                    <SubmitBtn onClick={handleSubmit} label="Submit" />
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Resident;
