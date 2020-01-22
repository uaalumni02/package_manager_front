import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const AllResidents = () => {
  const [residents, setResidents] = useState([]);
  const { loggedIn } = useContext(UserContext);

  const role = localStorage.getItem("role");

  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/resident", {
      method: "GET",
      headers: {
        Authorization: bearer,
        role: role
      }
    })
      .then(res => res.json())
      .then(response => {
        let newArray = response.data.filter(el => {
          return !el.isDeleted;
        });
        setResidents(newArray);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchResidentData();
  });

  const deleteResident = resident => {
    const deleteResident = { ...resident, isDeleted: true };
    const { isDeleted } = deleteResident;
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/resident/" + resident._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        role: role
      },
      body: JSON.stringify({
        isDeleted
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.success) {
          fetchResidentData();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <>
      {/* <div>{loggedIn ? <NavbarPage /> : ""}</div> */}
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        />
      </header>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br>
      <MDBTable bordered>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {residents.map(resident => (
            <tr value={resident._id} key={resident._id}>
              <td>{resident.name}</td>
              <td>{resident.email}</td>
              <td>{resident.phone}</td>
              <MDBBtn
                color=""
                size="sm"
                onClick={event =>
                  (window.location.href = `/editResident/${resident._id}`)
                }
              >
                Edit
              </MDBBtn>
              <MDBBtn
                color=""
                size="sm"
                onClick={() => {
                  deleteResident(resident);
                }}
              >
                Delete
              </MDBBtn>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllResidents;
