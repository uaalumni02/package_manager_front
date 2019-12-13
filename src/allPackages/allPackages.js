import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

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
        console.log(response.data);

        setPackages(response.data);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageData();
  }, []);

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
            <th>Delivered</th>
            <th>Name</th>
            <th>Date</th>
            <th>Company</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {packages.map(delivery => (
            <tr>
              <td>{delivery.isDelivered}</td>
              <td>{delivery.name.name}</td>
              <td>
                {moment.unix(delivery.deliveryDate).format("MM/DD/YYYY hh:mmA")}
              </td>
              <td>{delivery.companyName.companyName}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllPackages;
