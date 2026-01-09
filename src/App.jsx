import "./App.css";
import { CustomerList } from "./components/customers/CustomerList";
import { TicketList } from "./components/tickets/TicketList";
import { EmployeeList } from "./components/employees/EmployeeList";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/tickets" element={<TicketList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/employees" element={<EmployeeList />} />
    </Routes>
  );
};
