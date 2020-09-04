import React from "react";

export default function CustomSelect(props) {
  return (
    <select className="form-control" {...props}>
      {props.options.map((option) => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
}
