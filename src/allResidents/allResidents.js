import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { Redirect } from "react-router-dom";
import "./allResidents.css";
import { MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";

let resident = "";
const AllResidents = () => {
  const [residents, setResidents] = useState([]);
  const { loggedIn } = useContext(UserContext);
  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/resident", {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          resident = response.data[i]._id;
        }
        setResidents(response.data);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchResidentData();
  }, []);

  const deleteResident = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/resident/" + resident, {
      method: "DELETE",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        fetchResidentData();
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="center"
        />
      </header>
      <br></br>
      <div className="residentBody">
        {residents.map(resident => (
          <div className="card residentCards" style={{ width: "18rem" }}>
            <MDBCardBody className="card-body">
              <MDBCardTitle value={resident._id} key={resident._id}>
                {resident.name}
              </MDBCardTitle>
              <MDBCardText>Email: {resident.email}</MDBCardText>
              <MDBCardText>Phone: {resident.phone}</MDBCardText>
              <MDBBtn
                onClick={event =>
                  (window.location.href = `/editResident/${resident._id}`)
                }
              >
                Edit
              </MDBBtn>
              <MDBBtn onClick={deleteResident}>Delete</MDBBtn>
            </MDBCardBody>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllResidents;
