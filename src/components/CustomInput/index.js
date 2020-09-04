import React from "react";

export default function CustomInput(props) {
  return props.edit === false || props.edit === undefined ? (
    props.value
  ) : (
    <input
      className="form-control"
      {...props}
      style={{ width: "100%" }}
    ></input>
  );
}
