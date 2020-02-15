import React from "react";


import { MDBBtn } from "mdbreact";

const Button = (props) => {
  return (
    <MDBBtn
      color="danger"
      type="submit"
      className="btn-block z-depth-2"
      onClick={props.onClick}
    >
      {props.title}
      {props.label}
    </MDBBtn>
  );
};

export default Button;
