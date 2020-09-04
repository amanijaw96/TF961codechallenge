import React from "react";
import EmployeesAPI from "../Employees/api";

export default function Employee({ ...props }) {
  const [employees, setEmployees] = React.useState([]);
  const [employee, setEmployee] = React.useState();

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
        console.log(res);
        setEmployees(res.data.results);
        setEmployee(
          res.data.results.filter(
            (emp) => emp.login.uuid === searchParams.get("employee")
          )[0]
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return employee ? <div className="container">hi</div> : null;
}
