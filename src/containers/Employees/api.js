import { api_client } from "../../Utils/api";

export default class EmployeesAPI {
  static GetEmployees = (params) => {
    return api_client({
      method: "GET",
      resource: "https://randomuser.me/api/",
      body: params,
    }).then((response) => response);
  };
}
