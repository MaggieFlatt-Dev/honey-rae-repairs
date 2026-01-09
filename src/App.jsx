import "./App.css";
import { CustomerList } from "./components/customers/CustomerList";
import { TicketList } from "./components/tickets/TicketList";

export const App = () => {
  return (
    <>
      {/* <TicketList />  */}
      <CustomerList />
    </>
  );
};
