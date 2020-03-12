import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import moment from "moment";
import settings from "../config/configData";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBContainer
} from "mdbreact";

const EditPackage = () => {
  const [companyName, setCompanyNames] = useState([]);
  const [name, setResidentNames] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [residentId, setResidentId] = useState("");
  const [packageConfirmation, setPackageConfirmation] = useState(false);
  const [currentPackageData, setCurrentPackageData] = useState(null);
  const [isDelivered] = useState(false);
  const { loggedIn } = useContext(UserContext);

  const fetchCompanyData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/company`, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        const companies = response.data;
        setCompanyId(companies[0]._id);
        setCompanyNames(companies);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchCompanyData();
    fetchResidentData();
  });

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
        const residents = response.data;
        setResidentId(residents[0]._id);
        setResidentNames(residents);
      })
      .catch(error => console.error("Error:", error));
  };

  const fetchPackageToEdit = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/package/` + id, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        setCurrentPackageData(response.data);
        setAdditionalInfo(response.data.additionalInfo);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageToEdit();
  }, []);
  const updatePackage = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/package/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name: residentId,
        companyName: companyId,
        deliveryDate,
        additionalInfo,
        isDelivered
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === true) {
          setPackageConfirmation(true);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      {packageConfirmation ? <Redirect to={`/allPackages/`} /> : ""}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="col-md-8 mx-auto">
            <MDBCard className="package">
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Edit Package</p>
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
                      console.log(currentPackageData);
                      const selected =
                        currentPackageData &&
                        currentPackageData.companyName._id === company._id;
                      return (
                        <option
                          value={company._id}
                          key={company._id}
                          selected={selected}
                        >
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
                      const selected =
                        currentPackageData &&
                        currentPackageData.name._id === resident._id;
                      return (
                        <option
                          value={resident._id}
                          key={resident._id}
                          selected={selected}
                        >
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
                    value={
                      currentPackageData
                        ? moment
                            .unix(currentPackageData.deliveryDate)
                            .format("YYYY-MM-DDTH:mm")
                        : ""
                    }
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
                    value={additionalInfo}
                    onChange={e => setAdditionalInfo(e.target.value)}
                  />

                  <div className="text-center py-4 mt-3">
                    <MDBBtn
                      onClick={updatePackage}
                      className="btn btn-outline-purple"
                      type="submit"
                    >
                      Edit
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default EditPackage;
