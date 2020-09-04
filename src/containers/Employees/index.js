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
  const [gender, setGender] = React.useState();
  const [Loading, setLoading] = React.useState(false);

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
      GetEmployees({ results: page_size, gender: gender });
    }
  }, [gender]);

  return (
    <div className="container">
      <FiltersWrapper className="p-2">
        <h1>Employees</h1>
        <CustomSelect
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
          style={{ width: 200 }}
          options={[
            { value: "Select gender", label: "Select gender" },
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        ></CustomSelect>
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
      )}
    </div>
  );
}
