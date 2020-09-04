import React from "react";
import EmployeesAPI from "./api";

const page_size = 15;

const Value = (name, value) => {
  return (
    <div className="d-flex pl-3 pr-3 pt-2 ">
      <span className="font-weight-bold mr-2">{name}</span>
      <span className="font-weight-light">{value}</span>
    </div>
  );
};

export default function Employees({ ...props }) {
  const [employees, setEpmloyees] = React.useState([]);

  // on Component Mount
  React.useEffect(() => {
    EmployeesAPI.GetEmployees({ results: page_size, seed: "abc" })
      .then((res) => {
        setEpmloyees(res.data.results);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(employees);

  return (
    <div className="container">
      <div className="row">
        {employees.map((employee) => {
          return (
            <div className="col-lg-4 col-md-6">
              <div className="card p-3 mt-3">
                <img
                  style={{ objectFit: "contain" }}
                  src={employee.picture.large}
                ></img>
                <div className="mt-2">
                  {Value("Name:", employee.name.first + employee.name.last)}
                  {Value("Phone:", employee.phone)}
                  {Value("Age:", employee.dob.age)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
