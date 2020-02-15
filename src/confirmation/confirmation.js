import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";

const PackageConfirmation = () => {
  const [companyName, setCompanyNames] = useState("");
  const [name, setResidentNames] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const { loggedIn } = useContext(UserContext);

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
        setCompanyNames(response.data.companyName.companyName);
        setResidentNames(response.data.name.name);
        setAdditionalInfo(response.data.additionalInfo);
        setDeliveryDate(response.data.deliveryDate);
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageData();
  });
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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="col-md-8 mx-auto">
            <MDBCard className="package">
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
                    value={companyName}
                    onChange={e => setCompanyNames(e.target.value)}
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
                    value={name}
                    onChange={e => setResidentNames(e.target.value)}
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
                    value={moment
                      .unix(deliveryDate)
                      .format("MM/DD/YYYY hh:mmA")}
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
                    value={additionalInfo}
                    onChange={e => setAdditionalInfo(e.target.value)}
                  />
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
export default PackageConfirmation;
