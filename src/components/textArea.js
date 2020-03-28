import React from "react";

const TextArea = props => {
  return (
    <textarea
      name={props.name}
      type="text"
      id="defaultFormCardNameEx"
      className="form-control"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default TextArea;
