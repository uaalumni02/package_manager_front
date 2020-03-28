import React from "react";

import { MDBInput } from "mdbreact";

const UserName = props => {
  return (
    <MDBInput
      name={props.name}
      label="Your username"
      onChange={props.onChange}
      group
      type="text"
      validate
    />
  );
};

export default UserName;
