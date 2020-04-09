import React, { useState, useEffect, useContext, useReducer } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import "../static/allPackages.css";
import reducer from "../reducer/reducer";
import ActionBtn from "../components/ActionBtn";
import settings from "../config/configData";
import initialState from "../store/allPackages";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";


const AllPackages = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn } = useContext(UserContext);
  const [deleteId, setDeleteId] = useState("");

  const fetchPackageData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/package`, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        response.data.sort((a, b) => b.deliveryDate - a.deliveryDate);
        response.data.sort((a, b) => a.isDelivered - b.isDelivered);
        let newArray = response.data.filter(el => {
          return !el.isDeleted;
        });
        dispatch({
          field: "packages",
          value: newArray
        });
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
    fetch(`${settings.apiBaseUrl}/api/package/` + delivery._id, {
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
        if (response.success) {
          fetchPackageData();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const deletePackage = delivery => {
    const deletePackage = { ...delivery, isDeleted: true };
    const { isDeleted } = deletePackage;

    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/deletePackage/` + deleteId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      body: JSON.stringify({
        isDeleted
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          fetchPackageData();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const handleInput = e => {
    dispatch({
      field: "search",
      value: e.target.value
    });
  };

  const toggle = () => {
    dispatch({
      field: "modal",
      value: !modal
    });
  };

  const { packages, search, modal } = state;

  let filteredPackages = packages.filter(delivery => {
    return delivery.name.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <MDBCol className="search" md="6">
        <form className="form-inline mt-4 mb-4">
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInput}
          />
        </form>
      </MDBCol>
      <br></br>
      <br></br>
      <MDBTable bordered className="table-responsive-md">
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
          {filteredPackages.map(delivery => (
            <tr value={delivery._id} key={delivery._id}>
              <td>{delivery.name.name}</td>
              <td>
                {moment.unix(delivery.deliveryDate).format("MM/DD/YYYY hh:mmA")}
              </td>
              <td>{delivery.companyName.companyName}</td>
              <td>{delivery.additionalInfo}</td>
              <td>{delivery.isDelivered ? "Yes" : "No"}</td>
              <td>
                <ActionBtn
                  disabled={delivery.isDelivered}
                  onClick={() => deliverPackage(delivery)}
                  label="Pick Up"
                />
                <ActionBtn
                  onClick={event =>
                    (window.location.href = `/editPackage/${delivery._id}`)
                  }
                  label="Edit"
                />
                <MDBContainer>
                  <MDBModal isOpen={modal} onClick={toggle}>
                    <MDBModalHeader onClick={toggle}>
                      Delete Confirmation
                    </MDBModalHeader>
                    <MDBModalBody>Please Confirm Deletion</MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggle}>
                        Close
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => {
                          deletePackage(delivery);
                          toggle();
                        }}
                        color="primary"
                      >
                        Delete
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
                <ActionBtn
                  onClick={() => {
                    setDeleteId(delivery._id);
                    toggle();
                  }}
                  label="Delete"
                />
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllPackages;