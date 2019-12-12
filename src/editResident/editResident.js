import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const EditResident = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { loggedIn } = useContext(UserContext);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  
  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch("http://localhost:3000/api/resident/" + id, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
       setName(response.data.name)
       setEmail(response.data.email)
       setPhone(response.data.phone)
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
    fetch("http://localhost:3000/api/resident/" +id, {
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
  }

  return (
    <> 
    <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="residentCenter"
        />
      </header>
      <br></br>
      {updateConfirmation ? <Redirect to={`/allResidents/`} /> : ""}
      <MDBRow>
        <MDBCol md="6">
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
                  value={name}
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
                  value={email}
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
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn onClick={updateResident} className="btn btn-outline-purple" type="submit">
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default EditResident;
