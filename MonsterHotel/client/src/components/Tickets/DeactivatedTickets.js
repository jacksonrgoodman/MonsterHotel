import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getDeactivatedTickets } from "../../modules/ticketManager";

export default function DeactivatedList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getDeactivatedTickets().then(setTickets);
    }, []);

    return (
        < section >
            <h1>Deactivated Tickets</h1>
            {
                console.log("ActiveGuests", tickets)}
            {tickets.map(q =>
                <TicketCard key={q.id} Ticket={q} />
            )
            }
        </section >
    );
}