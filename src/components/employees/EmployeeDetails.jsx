import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeByUserId } from "../../services/employeeService";
import "./Employees.css"

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { employeeId } = useParams();

  useEffect(() => {
    getEmployeeByUserId(employeeId).then((data) => {
      const employeeObj = data[0];
      setEmployee(employeeObj);
    });
  }, [employeeId]);

  return (
    <section className="employee">
      <header className="employee-header">{employee?.user?.fullName}</header>
      <div>
        <span className="employee-info">Email : </span>
        {employee?.user?.email}
      </div>
      <div>
        <span className="employee-info">Specialty : </span>
        {employee?.specialty}
      </div>
      <div>
        <span className="employee-info">Hourly Rate : </span>
        {employee?.rate}
      </div>
      <div className="ticket-count-section">
        <span className="ticket-count">Currently working on {employee?.employeeTickets?.length}</span>
        <span className="ticket-count"> ticket(s) </span>
      </div>
    </section>
  );
};
