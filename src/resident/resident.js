import React, { useState } from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const Resident = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/resident", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name,
        email,
        phone
      })
    })
      .then(res => res.json())
      .then(response => {
      })
      .catch(error => console.error("Error:", error));
  };
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
        <MDBCol md="6">
          <MDBCard>
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
                  <MDBBtn
                    className="btn btn-outline-purple"
                    type="submit"
                    onClick={handleSubmit}
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
  );
};

export default Resident;