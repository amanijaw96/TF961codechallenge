import React from "react";
import EmployeesAPI from "../Employees/api";
import CustomInput from "../../components/CustomInput";
import * as immutable from "object-path-immutable";

export default function Employee({ ...props }) {
  const [employees, setEmployees] = React.useState([]);
  const [employee, setEmployee] = React.useState();
  const [edit, setEdit] = React.useState(false);

  //  on Mount
  React.useEffect(() => {
    let query = props.location.search;
    let searchParams = new URLSearchParams(query);

    var i = searchParams.entries();
    let x = i.next();
    let queries = {};

    while (!x.done) {
      if (x.value[0] !== "employee") {
        queries[x.value[0]] = x.value[1];
      }
      x = i.next();
    }
    EmployeesAPI.GetEmployees(queries)
      .then((res) => {
        setEmployees(res.data.results);
        setEmployee(
          res.data.results.filter(
            (emp) => emp.login.uuid === searchParams.get("employee")
          )[0]
        );
      })
      .catch((err) => console.log(err));
  }, [props.location.search]);

  const handleValueChange = (e, path) => {
    let value = e.target.value;
    document.getElementById("employeeForm").classList.add("was-validated");
    setEmployee((curr) => immutable.set(curr, path, value));
  };

  const Value = (name, value, edit, type, path) => {
    return (
      <div className="d-flex pl-3 pr-3 pt-2 ">
        <div
          className={
            edit
              ? "mt-3 d-flex flex-column text-left"
              : "mt-3 d-flex flex-md-row flex-column align-items-start"
          }
          style={{ width: "100%" }}
        >
          <span className="font-weight-bold mr-2">{name}</span>
          <CustomInput
            onChange={(e) => handleValueChange(e, path)}
            type={type}
            edit={edit}
            value={value}
            required
          ></CustomInput>
        </div>
      </div>
    );
  };

  return employee ? (
    <div className="container">
      <div
        className="card p-3 mt-2"
        style={{ maxWidth: 500, margin: "0 auto", minHeight: 616 }}
      >
        <div className="row">
          <div className="col-12 text-right">
            <i
              onClick={() => setEdit((curr) => !curr)}
              className={!edit ? "fa fa-edit pr-3" : "fa fa-close pr-3"}
            />
          </div>
        </div>

        <img
          style={{ objectFit: "contain" }}
          src={employee.picture.large}
          alt="profile"
        ></img>
        <div className="mt-4">
          <form id="employeeForm">
            {Value(
              "First Name:",
              employee.name.first,
              edit,
              "string",
              "name.first"
            )}
            {Value(
              "Last Name:",
              employee.name.last,
              edit,
              "string",
              "name.last"
            )}
            {Value("Phone:", employee.phone, edit, "string", "phone")}
            {Value("Age:", employee.dob.age, edit, "number", "dob.age")}
            {Value("Email:", employee.email, edit, "email", "email")}
            {Value("Nationality", employee.nat, edit, "string", "nat")}
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
