import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css"
import { Ticket } from "./Ticket";
import { TicketFilterBar } from "./TicketFilterBar";

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
      console.log("tickets set");
    });
  }, []); //when array is empty it ONLY runs on initial render of component. Will run when value changes if something in array

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]); // When the dependency contains multiple state variables, the useEffect is      watching for any time any of the values change.
  
  useEffect(() => {
      const foundTickets = allTickets.filter(ticket =>
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])
  

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
      />
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          console.log(ticketObj);
          return <Ticket ticket={ticketObj} key={ticketObj.id} />
        })}
      </article>
    </div>
  );
};
