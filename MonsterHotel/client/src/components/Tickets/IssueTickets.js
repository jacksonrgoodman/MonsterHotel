import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getIssueTickets } from "../../modules/ticketManager";

export default function IssueTicketsList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getIssueTickets().then(setTickets);
    }, []);

    return (
        < section >
            <h1>Issue Tickets</h1>
            {
                console.log("ActiveGuests", tickets)}
            {tickets.map(q =>
                <TicketCard key={q.id} Ticket={q} />
            )
            }
        </section >
    );
}