import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const Package = () => {
  const [startDate, setStartDate] = useState(new Date());
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
                <p className="h4 text-center py-4">Package Delivery</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Company
                </label>
                <select id="defaultFormCardNameEx" className="form-control">
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option selected value="coconut">
                    Coconut
                  </option>
                  <option value="mango">Mango</option>
                </select>
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Resident
                </label>
                <select id="defaultFormCardNameEx" className="form-control">
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option selected value="coconut">
                    Coconut
                  </option>
                  <option value="mango">Mango</option>
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
                />
                <br />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Additionl Information
                </label>
                <input
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn btn-outline-purple" type="submit">
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Package;
