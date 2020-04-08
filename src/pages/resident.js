import React, { useReducer, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import SubmitBtn from "../components/submitBtn";
import reducer from "../store/reducer";
import settings from "../config/configData";

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";


const initialState = {
  name: "",
  email: "",
  phone: "",
  isDeleted: false,
  residentConfirmation: false
};

const Resident = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
          dispatch({
            field: "residentConfirmation",
            value: true
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const onChange = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  const { name, email, phone, isDeleted, residentConfirmation } = state;

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
                    name="name"
                    value={name}
                    onChange={onChange}
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
                    name="email"
                    value={email}
                    onChange={onChange}
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
                    name="phone"
                    value={phone}
                    onChange={onChange}
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
