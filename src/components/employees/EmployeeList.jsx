import { useEffect, useState } from "react";
import { getStaffUsers } from "../../services/UserService";
import { User } from "../users/User";
import "./Employees.css";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getStaffUsers().then((employeeArray) => {
      setEmployees(employeeArray);
    });
  }, []);

  return (
    <div className="customers">
      {employees.map((employeeObj) => {
        return <User user={employeeObj} key={employeeObj.id} />;
      })}
    </div>
  );
};
