import "./App.css";
import { CustomerList } from "./components/customers/CustomerList";
import { TicketList } from "./components/tickets/TicketList";
import { EmployeeList } from "./components/employees/EmployeeList";

export const App = () => {
  return (
    <>
      {/* <TicketList />  */}
      {/* <CustomerList /> */}
      <EmployeeList />
    </>
  );
};
