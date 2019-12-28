import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBCol } from "mdbreact";

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
              <MDBBtn color="" size="sm" onClick={deleteResident}>
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
