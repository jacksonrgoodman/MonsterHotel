import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getIssueTickets } from "../../modules/ticketManager";

export default function IssueTicketsList() {
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);

    useEffect(() => {
        getIssueTickets().then(setTickets);
    }, [closeTicket]);

    return (
        < section >
            <h1>Issue Tickets</h1>
            {
                console.log("ActiveGuests", tickets)}
            {tickets.map(q =>
                <TicketCard key={q.id} closeTicket={closeTicket} setCloseTicket={setCloseTicket} Ticket={q} />
            )
            }
        </section >
    );
}