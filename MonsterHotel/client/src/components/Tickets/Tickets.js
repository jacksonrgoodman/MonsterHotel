import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getTickets } from "../../modules/ticketManager";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets().then(setTickets);
    }, []);

    return (
        < section >
            <h1>Tickets</h1>
            {
                console.log("ActiveGuests", tickets)}
            {tickets.map(q =>
                <TicketCard key={q.id} Ticket={q} />
            )
            }
        </section >
    );
}