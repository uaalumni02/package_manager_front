import React from "react";
import { MDBInput } from "mdbreact";

const Password = props => {
  return (
    <MDBInput
      label="Your password"
      group
      type="password"
      validate
      containerClass="mb-0"
      onChange={props.onChange}
    />
  );
};

export default Password;
