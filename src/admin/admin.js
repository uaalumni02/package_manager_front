import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const Admins = () => {
  const [users, setUsers] = useState([]);
  const { loggedIn } = useContext(UserContext);
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        let newArray = response.data.filter(el => {
          return !el.isAdmin;
        });
        setUsers(newArray);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const deleteAdminRequest = user => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/user/" + user._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.success) {
          fetchUserData();
        }
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
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users.map(user => (
            <tr value={user._id} key={user._id}>
              <td>{user.username}</td>
              <td>
                <MDBBtn color="" size="sm">
                  Approve
                </MDBBtn>
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={() => {
                    deleteAdminRequest(user);
                  }}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default Admins;
