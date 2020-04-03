import React, { useEffect, useContext, useReducer } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";

import settings from "../config/configData";
import TextArea from "../components/textArea";

const initialState = {
  companyName: "",
  name: "",
  additionalInfo: "",
  deliveryDate: ""
};

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};

const PackageConfirmation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn } = useContext(UserContext);
  const fetchPackageData = () => {
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
        dispatch({
          field: "companyName",
          value: response.data.companyName.companyName
        });
        dispatch({
          field: "name",
          value: response.data.name.name
        });
        dispatch({
          field: "additionalInfo",
          value: response.data.additionalInfo
        });
        dispatch({
          field: "deliveryDate",
          value: response.data.deliveryDate
        });
      })
      .catch(error => console.error("Error:", error));
  };
  useEffect(() => {
    fetchPackageData();
  }, []);

  const onChange = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  const { companyName, name, additionalInfo, deliveryDate } = state;

  return (
    <>
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
                    name="companyName"
                    value={companyName}
                    onChange={onChange}
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
                    name="name"
                    value={name}
                    onChange={onChange}
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
                    name="deliveryDate"
                    value={moment
                      .unix(deliveryDate)
                      .format("MM/DD/YYYY hh:mmA")}
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
