import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

const SubmitBtn = (props) => {
  return (
    <MDBBtn
      className="btn btn-outline-purple"
      type="submit"
      onClick={props.onClick}
    >
     {props.label}
      <MDBIcon far icon="paper-plane" className="ml-2" />
    </MDBBtn>
  );
};

export default SubmitBtn;
