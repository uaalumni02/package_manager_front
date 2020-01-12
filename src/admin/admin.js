import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const Admins = () => {
  const [users, setUsers] = useState([]);
  const [noApprovals, setNoApprovals] = useState("");
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
        console.log(newArray.length);
        setUsers(newArray);
        if (newArray.length === 0) {
          setNoApprovals("No pending user approvals");
        }
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
        if (response.success) {
          fetchUserData();
        }
      })
      .catch(error => console.error("Error:", error));
  };
  const approveRequest = user => {
    const approve = { ...user, isAdmin: true };
    const { isAdmin } = approve;

    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/user/" + user._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        isAdmin
      })
    })
      .then(res => res.json())
      .then(response => {
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
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={() => {
                    approveRequest(user);
                  }}
                >
                  Approve
                </MDBBtn>
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={() => {
                    deleteAdminRequest(user);
                  }}
                >
                  Decline
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <center>
        <h1>{noApprovals}</h1>
      </center>
    </>
  );
};

export default Admins;
