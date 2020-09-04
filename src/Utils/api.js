import axios from "axios";

export function api_client({
  authorize = true,
  method,
  resource,
  body,
  cancelToken,
  returnData = false,
  contentType = "application/json",
}) {
  let axiosParams = {
    url: resource,
    method,
    cancelToken,
    headers: {},
  };

  if (["POST", "PATCH", "PUT"].includes(method)) {
    axiosParams.headers["Content-Type"] = contentType;
  }
  if (method === "GET") {
    axiosParams.params = body;
  } else {
    axiosParams.data = body;
  }

  const instance = axios.create();

  return instance(axiosParams).then((response) =>
    returnData ? response.data : response
  );
}
