import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const AllResidents = () => {
  const [residents, setResidents] = useState([]);
  const { loggedIn } = useContext(UserContext);

  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("https://tz-package-manager.herokuapp.com/api/resident", {
      method: "GET",
      headers: {
        Authorization: bearer
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
    fetch("https://tz-package-manager.herokuapp.com/api/resident/" + resident._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        isDeleted
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          fetchResidentData();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <>
      {/* <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        />
      </header> */}
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
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
