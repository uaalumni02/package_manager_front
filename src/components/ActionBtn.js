import React from "react";

import { MDBBtn } from "mdbreact";

const ActionBtn = props => {
  return (
    <MDBBtn
      color=""
      size="sm"
      onClick={props.onClick}
    >
      {props.label}
    </MDBBtn>
  );
};

export default ActionBtn;
