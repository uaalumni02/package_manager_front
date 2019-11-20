import React, { useState, useEffect } from "react";
import * as moment from 'moment'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

const PackageConfirmation = () => {
    const [companyName, setCompanyNames] = useState("");
    const [name, setResidentNames] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
  const fetchPackageData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch("http://localhost:3000/api/package/" + id, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        setCompanyNames(response.data.companyName.companyName)
        setResidentNames(response.data.name.name)
        setAdditionalInfo(response.data.additionalInfo)
        setDeliveryDate(response.data.deliveryDate)
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageData();
  }, []);
  return (
    <MDBContainer>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="center"
        />
      </header>
      <br></br>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Delivery Confirmation</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Company
                </label>
                <textarea
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  value = {companyName}
                />
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Resident
                </label>
                <textarea
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  value = {name}
                />
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                   Date and Time Received
                </label>
                <textarea
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  value = {moment.unix(deliveryDate).format('MM/DD/YYYY hh:mmA')}
                />
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Additionl Information
                </label>
                <textarea
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  value = {additionalInfo}
                />
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default PackageConfirmation;
