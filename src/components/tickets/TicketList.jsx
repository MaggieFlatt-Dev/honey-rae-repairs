import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css"
import { Ticket } from "./Ticket";

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
      <div className="filter-bar">
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true);
          }}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false);
          }}
        >
          Show All
        </button>
        <input
          onChange={(event) => {setSearchTerm(event.target.value)}}
          type="text"
          placeholder="Search Tickets"
          className="ticket-search"
        />
      </div>
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          console.log(ticketObj);
          return <Ticket ticket={ticketObj} key={ticketObj.id} name="Joe" />
        })}
      </article>
    </div>
  );
};
