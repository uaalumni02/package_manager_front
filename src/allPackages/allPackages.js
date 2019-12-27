import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const { loggedIn } = useContext(UserContext);
  const fetchPackageData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/package", {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageData();
  }, []);

  const deliverPackage = delivery => {
    const deliveredPackage = { ...delivery, isDelivered: true };
    const { isDelivered } = deliveredPackage;

    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/package/" + delivery._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        isDelivered
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === true) {
          fetchPackageData();
        }
      })
      .catch(error => console.error("Error:", error));
  };
  const deletePackage = delivery => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/package/" + delivery._id, {
      method: "DELETE",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === true) {
          fetchPackageData();
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
            <th>Name</th>
            <th>Delivery Date</th>
            <th>Company</th>
            <th>Additional Info</th>
            <th>Retrieved</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {packages.map(delivery => (
            <tr value={delivery._id} key={delivery._id}>
              <td>{delivery.name.name}</td>
              <td>
                {moment.unix(delivery.deliveryDate).format("MM/DD/YYYY hh:mmA")}
              </td>
              <td>{delivery.companyName.companyName}</td>
              <td>{delivery.additionalInfo}</td>
              <td>{delivery.isDelivered ? "Yes" : "No"}</td>
              <td>
                <MDBBtn
                  disabled={delivery.isDelivered}
                  onClick={() => deliverPackage(delivery)}
                  color=""
                  size="sm"
                >
                  Pick Up
                </MDBBtn>
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={event =>
                    (window.location.href = `/editPackage/${delivery._id}`)
                  }
                >
                  Edit
                </MDBBtn>
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={() => deletePackage(delivery)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <p>Total Packages: {packages.length}</p>
    </>
  );
};

export default AllPackages;
