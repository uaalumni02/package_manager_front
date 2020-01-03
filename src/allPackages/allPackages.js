import React, { useState, useEffect, useContext } from "react";
import * as moment from "moment";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";
import "./allPackages.css";
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
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const { loggedIn } = useContext(UserContext);

  const [modal, setModal] = useState(false);

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
        response.data.sort((a, b) => b.deliveryDate - a.deliveryDate);
        response.data.sort((a, b) => a.isDelivered - b.isDelivered);
        let newArray = response.data.filter(el => {
          return !el.isDeleted;
        });
        setPackages(newArray);
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
    fetch("http://localhost:3000/api/package/" + delivery._id, {
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
    fetch("http://localhost:3000/api/package/" + delivery._id, {
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
    setSearch(e.target.value);
  };

  let filteredPackages = packages.filter(delivery => {
    return delivery.name.name.toLowerCase().includes(search.toLowerCase());
  });

  const toggle = () => {
    setModal(!modal);
  };

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
      <MDBTable bordered>
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
                <MDBBtn
                  disabled={delivery.isDelivered}
                  onClick={() => deliverPackage(delivery)}
                  color=""
                  size="sm"
                >
                  Pick Up
                </MDBBtn>
                <MDBBtn
                  color=""
                  size="sm"
                  onClick={event =>
                    (window.location.href = `/editPackage/${delivery._id}`)
                  }
                >
                  Edit
                </MDBBtn>
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
                <MDBBtn color="" size="sm" onClick={toggle}>
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AllPackages;
