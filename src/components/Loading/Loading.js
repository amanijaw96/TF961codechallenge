import React from "react";
import { ClipLoader } from "react-spinners";
import { LoadingContainer } from "./Loading_styled";

export default function Loading() {
  return (
    <LoadingContainer>
      <ClipLoader color={"#000000"} />
    </LoadingContainer>
  );
}
