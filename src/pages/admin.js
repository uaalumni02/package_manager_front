import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";
import settings from "../config/configData"


const Admins = () => {
  const [users, setUsers] = useState([]);
  const { loggedIn } = useContext(UserContext);
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/user`, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const declineAdminRequest = user => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/user/` + user._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        role: "standard"
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
  const approveRequest = user => {
    const approve = { ...user, role: "admin" };
    const { role } = approve;

    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/user/` + user._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        role
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
      {/* <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        />
      </header> */}
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <MDBTable bordered className="table-responsive-md">
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
                  disabled={user.role === "admin"}
                  color=""
                  size="sm"
                  onClick={() => {
                    approveRequest(user);
                  }}
                >
                  Approve
                </MDBBtn>
                <MDBBtn
                  disabled={user.role === "standard"}
                  color=""
                  size="sm"
                  onClick={() => {
                    declineAdminRequest(user);
                  }}
                >
                  Decline
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
