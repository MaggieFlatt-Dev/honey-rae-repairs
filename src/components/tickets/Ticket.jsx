import { useState, useEffect } from "react";
import { getAllEmployees } from "../../services/employeeService";

export const Ticket = ({ ticket }) => {
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState({});

  //set employees
  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setEmployees(employeesArray);
    });
  }, []);

  //search employees array and find the employee that matches the service ticket employee Id
  useEffect(() => {
    const foundEmployee = employees.find(
      (employee) => (employee.id = ticket.employeeTickets[0]?.employeeId) //runs ticket then the ? will evaluate if employeeTickets has a ticket in it's array
    );
    setAssignedEmployee(foundEmployee);
  }, [employees, ticket]); //once employees has been set. needs ticket too since our function also relies on ticket to run

  return (
    <section className="ticket">
      <header className="ticket-info">#{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>
            {assignedEmployee ? assignedEmployee.user?.fullName : "none"}
          </div>
        </div>
        <div>
          <div className="ticket-info">emergency</div>
          <div>{ticket.emergency ? "yes" : "no"}</div>
        </div>
      </footer>
    </section>
  );
};
