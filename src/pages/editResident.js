import React, { useState, useContext, useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import settings from "../config/configData";
import reducer from "../store/reducer";

import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBContainer
} from "mdbreact";

const initialState = {
  name: "",
  email: "",
  phone: "",
};


const EditResident = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn } = useContext(UserContext);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);

  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/resident/` + id, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        let { name, email, phone } = response.data;
        dispatch({ field: "name", value: name });
        dispatch({ field: "email", value: email });
        dispatch({ field: "phone", value: phone });
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchResidentData();
  }, []);

  const updateResident = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/resident/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === true) {
          setUpdateConfirmation(true);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const handleInput = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  const { name, email, phone } = state;

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      {updateConfirmation ? <Redirect to={`/allResidents/`} /> : ""}
      <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="col-md-8 mx-auto">
          <MDBCard className="residentCard">
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Edit Resident</p>
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
                  defaultValue={name}
                  onChange={ handleInput }
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
                  defaultValue={email}
                  onChange={ handleInput }
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
                  name="phone"
                  placeholder="999-999-9999"
                  defaultValue={phone}
                  onChange={ handleInput }
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn
                    onClick={updateResident}
                    className="btn btn-outline-purple"
                    type="submit"
                  >
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
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

export default EditResident;
