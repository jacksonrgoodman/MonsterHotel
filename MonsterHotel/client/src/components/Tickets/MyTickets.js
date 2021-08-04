import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getTickets } from "../../modules/ticketManager";

export default function GuestList() {
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);
    useEffect(() => {
        getTickets().then(setTickets);
    }, [closeTicket]);

    return (
        < section >
            <h1>My Tickets</h1>
            {
                console.log("ActiveGuests", tickets)}
            {tickets.map(q =>
                <TicketCard key={q.id} Ticket={q} closeTicket={closeTicket} setCloseTicket={setCloseTicket} />
            )
            }
        </section >
    );
}