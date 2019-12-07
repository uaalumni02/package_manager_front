import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import NavbarPage from "../navBar/navBar";
import "./package.css";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const Package = () => {
  const [companyName, setCompanyNames] = useState([]);
  const [name, setResidentNames] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [residentId, setResidentId] = useState("");
  const [packageConfirmation, setPackageConfirmation] = useState(false);
  const [packageId, setpackageId] = useState("");
  const { loggedIn } = useContext(UserContext);

  const fetchCompanyData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch("http://localhost:3000/api/company", {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        setCompanyNames(response.data);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchCompanyData();
    fetchResidentData();
  }, []);
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
        setResidentNames(response.data);
      })
      .catch(error => console.error("Error:", error));
  };

  const submitPackage = event => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    event.preventDefault();
    fetch("http://localhost:3000/api/package", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name: residentId,
        companyName: companyId,
        deliveryDate,
        additionalInfo
      })
    })
      .then(res => res.json())
      .then(response => {
        setpackageId(response.data._id);
        if (response.success === true) {
          setPackageConfirmation(true);
        }
      })
      .catch(error => console.error("Error:", error));
  };
  return (
    <>
    {/* <MDBContainer> */}
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        />
      </header>
      <br></br>
      {packageConfirmation ? <Redirect to={`/confirmation/${packageId}`} /> : ""}
      <MDBRow>
        <MDBCol md="6">
          <MDBCard className="package">
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Package Delivery</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Company
                </label>
                <select
                  id="defaultFormCardNameEx"
                  className="form-control"
                  onChange={e => setCompanyId(e.target.value)}
                >
                  {companyName.map(company => {
                    return (
                      <option value={company._id} key={company._id}>
                        {company.companyName}
                      </option>
                    );
                  })}
                </select>
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Resident
                </label>
                <select
                  id="defaultFormCardNameEx"
                  className="form-control"
                  onChange={e => setResidentId(e.target.value)}
                >
                  {name.map(resident => {
                    return (
                      <option value={resident._id} key={resident._id}>
                        {resident.name}
                      </option>
                    );
                  })}
                </select>
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Select Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  onChange={e => setDeliveryDate(e.target.value)}
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
                  onChange={e => setAdditionalInfo(e.target.value)}
                />

                <div className="text-center py-4 mt-3">
                  <MDBBtn
                    className="btn btn-outline-purple"
                    type="submit"
                    onClick={submitPackage}
                  >
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    {/* </MDBContainer> */}
    </>
  );
};

export default Package;