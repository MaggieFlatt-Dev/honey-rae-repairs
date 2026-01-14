import { useState, useEffect } from "react";
import { getAllEmployees } from "../../services/employeeService";
import { assignTicket, updateTicket } from "../../services/ticketService";

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState({});

  //set employees
  // useEffect(() => {
  //   getAllEmployees().then((employeesArray) => {
  //     setEmployees(employeesArray);
  //   });
  // }, []);

  useEffect(() => {
    getAllEmployees().then(setEmployees)
  }, [])

  //search employees array and find the employee that matches the service ticket employee Id
  useEffect(() => {
    const foundEmployee = employees.find(
      (employee) => employee.id === ticket.employeeTickets[0]?.employeeId //runs ticket then the ? will evaluate if employeeTickets has a ticket in it's array
    );

    setAssignedEmployee(foundEmployee);
  }, [employees, ticket]); //once employees has been set. needs ticket too since our function also relies on ticket to run

  //handleClaim function
  const handleClaim = () => {
    const currentEmployee = employees.find(
      (employee) => employee.userId === currentUser.id
    );

    const newEmployeeTicket = {
      employeeId: currentEmployee.id,
      serviceTicketId: ticket.id,
    };

    assignTicket(newEmployeeTicket).then(() => {
      getAndSetTickets();
    });
  };

  //handleClose function 
  const handleClose = () => {
    const closedTicket = {
      id: ticket.id,
      userId: ticket.userId,
      description: ticket.description,
      emergency: ticket.emergency,
      dateCompleted: new Date(),
    }

    updateTicket(closedTicket).then(() => {
      getAndSetTickets()
    })
  }

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
        <div className="btn-container">
          {/* If the logged in user us an employee and there is no employee ticket associates with the service ticket, then a button to claim the ticket should display */}
          {currentUser.isStaff && !assignedEmployee ? (
            <button className="btn btn-secondary" onClick={handleClaim}>
              Claim
            </button>
          ) : (
            ""
          )}
          {/* If the logged ij user is thr assigned employee for the ticket and there is no dateCompleted, then a button to close the ticket should display*/}
          {assignedEmployee?.userId === currentUser.id &&
          !ticket.dateCompleted ? (
            <button className="btn btn-warning" onClick={handleClose}>Close</button>
          ) : (
            ""
          )}
        </div>
      </footer>
    </section>
  );
};
