import React from "react";

import { MDBBtn } from "mdbreact";

const ActionBtn = props => {
  return (
    <MDBBtn name={props.name} value={props.value} color="" size="sm" onClick={props.onClick}>
      {props.label}
    </MDBBtn>
  );
};

export default ActionBtn;
