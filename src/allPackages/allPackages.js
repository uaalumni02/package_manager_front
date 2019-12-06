import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

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
      <MDBCol>
        {packages.map(delivery => (
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>
              <MDBCardTitle>{delivery.name.name}</MDBCardTitle>
              <MDBCardText>
                Delivery Date:
                {moment.unix(delivery.deliveryDate).format("MM/DD/YYYY hh:mmA")}
              </MDBCardText>
              <MDBCardText>{delivery.companyName.companyName}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        ))}
      </MDBCol>
    </>
  );
};

export default AllPackages;
