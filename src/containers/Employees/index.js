import React from "react";
import EmployeesAPI from "./api";
import { FiltersWrapper } from "./Employees_styled";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Skeleton from "react-loading-skeleton";

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
  const [gender, setGender] = React.useState("gender");
  const [Loading, setLoading] = React.useState(false);
  const [Page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState({ results: page_size, seed: "abc" });

  const GetEmployees = (query) => {
    setLoading(true);
    EmployeesAPI.GetEmployees(query)
      .then((res) => {
        setLoading(false);
        setEpmloyees(res.data.results);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // on Component Mount
  React.useEffect(() => {
    GetEmployees({ results: page_size, seed: "abc" });
  }, []);

  React.useEffect(() => {
    if (gender !== "gender") {
      setQuery({ results: page_size, gender: gender });
      setPage(0);
      GetEmployees({ results: page_size, gender: gender });
    }
  }, [gender]);

  React.useEffect(() => {
    if (Page !== 0) {
      setGender("gender");
      setQuery({ results: page_size, page: Page, seed: "abc" });
      GetEmployees({ results: page_size, page: Page, seed: "abc" });
    }
  }, [Page]);

  const handleEmployeeClick = (employee) => {
    var searchParams = new URLSearchParams({
      ...query,
      employee: employee.login.uuid,
    });
    props.history.push("/employee/?" + searchParams.toString());
  };

  return (
    <div className="container">
      <FiltersWrapper className="p-2">
        <h1>Employees</h1>
        <div className="d-flex">
          <CustomSelect
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            style={{ width: 200, marginRight: 10 }}
            options={[
              { value: "Select gender", label: "Select gender" },
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
            ]}
          ></CustomSelect>
          <CustomSelect
            value={Page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
            options={[
              {
                value: 1,
                label: "page 1",
              },
              {
                value: 2,
                label: "page 2",
              },
              {
                value: 3,
                label: "page 3",
              },
            ]}
            style={{ width: 200 }}
          ></CustomSelect>
        </div>
      </FiltersWrapper>

      {Loading ? (
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <Skeleton count={5} height={200} />
          </div>
          <div className="col-lg-4 col-md-6">
            <Skeleton count={5} height={200} />
          </div>
          <div className="col-lg-4 col-md-6">
            <Skeleton count={5} height={200} />
          </div>
        </div>
      ) : (
        <div className="row">
          {employees.map((employee) => {
            return (
              <div className="col-lg-4 col-md-6">
                <div
                  className="card p-3 mt-3"
                  onClick={() => handleEmployeeClick(employee)}
                >
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
      )}
    </div>
  );
}
