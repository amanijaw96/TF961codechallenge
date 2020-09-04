import React from "react";

export default function CustomInput(props) {
  return props.edit === false || props.edit === undefined ? (
    <div>{props.value}</div>
  ) : (
    <input
      className="form-control"
      {...props}
      style={{ width: "100%" }}
    ></input>
  );
}
