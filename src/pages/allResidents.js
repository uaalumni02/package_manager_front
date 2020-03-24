import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import ActionBtn from "../components/ActionBtn";

import settings from "../config/configData";

const AllResidents = () => {
  const [residents, setResidents] = useState([]);
  const { loggedIn } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const fetchResidentData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/resident`, {
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
    fetch(`${settings.apiBaseUrl}/api/resident/` + deleteId, {
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

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
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
              <td>
                <ActionBtn
                  onClick={event =>
                    (window.location.href = `/editResident/${resident._id}`)
                  }
                  label="Edit"
                />
                <ActionBtn
                  onClick={() => {
                    setDeleteId(resident._id);
                    toggle();
                  }}
                  label="Delete"
                />
                <MDBContainer>
                  <MDBModal isOpen={modal} onClick={toggle}>
                    <MDBModalHeader onClick={toggle}>
                      Delete Confirmation
                    </MDBModalHeader>
                    <MDBModalBody>Please Confirm Deletion</MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggle}>
                        Close
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => {
                          deleteResident(resident);
                          toggle();
                        }}
                        color="primary"
                      >
                        Delete
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllResidents;
