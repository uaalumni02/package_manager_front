import React, { useEffect, useContext, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import settings from "../config/configData";
import SubmitBtn from "../components/submitBtn";
import TextArea from "../components/textArea";
import reducer from "../reducer/reducer";
import initialState from "../store/package";

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";

const Package = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        dispatch({
          field: "companyId",
          value: companies[0]._id
        });
        dispatch({
          field: "companyName",
          value: companies
        });
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
    fetch(`${settings.apiBaseUrl}/api/resident`, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        const residents = response.data;
        let newArray = response.data.filter(el => {
          return !el.isDeleted;
        });
        dispatch({
          field: "residentId",
          value: residents[0]._id
        });
        dispatch({
          field: "name",
          value: newArray
        });
      })
      .catch(error => console.error("Error:", error));
  };

  const submitPackage = event => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/package`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        name: residentId,
        companyName: companyId,
        deliveryDate,
        additionalInfo,
        isDelivered,
        isDeleted
      })
    })
      .then(res => res.json())
      .then(response => {
        dispatch({
          field: "packageId",
          value: response.data._id
        });
        if (response.success === true) {
          dispatch({
            field: "packageConfirmation",
            value: true
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const onChange = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  const {
    companyName,
    name,
    deliveryDate,
    additionalInfo,
    companyId,
    residentId,
    packageConfirmation,
    packageId,
    isDelivered,
    isDeleted
  } = state;

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      {packageConfirmation ? (
        <Redirect to={`/confirmation/${packageId}`} />
      ) : (
        ""
      )}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="col-md-8 mx-auto">
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
                    name="companyId"
                    value={companyId}
                    onChange={onChange}
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
                    name="residentId"
                    value={residentId}
                    onChange={onChange}
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
                    name="deliveryDate"
                    value={deliveryDate}
                    onChange={onChange}
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardNameEx"
                    className="grey-text font-weight-light"
                  >
                    Additionl Information
                  </label>
                  <TextArea
                    name="additionalInfo"
                    value={additionalInfo}
                    onChange={onChange}
                  />
                  <div className="text-center py-4 mt-3">
                    <SubmitBtn onClick={submitPackage} label="Submit" />
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

export default Package;
