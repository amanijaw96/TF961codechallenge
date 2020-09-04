import React from "react";

export default function CustomButton({ ...props }) {
  return <button className="form-control btn btn-primary" {...props}></button>;
}
