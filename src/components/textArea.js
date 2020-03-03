import React from "react";

const TextArea = props => {
  return (
    <textarea
      type="text"
      id="defaultFormCardNameEx"
      className="form-control"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default TextArea;
