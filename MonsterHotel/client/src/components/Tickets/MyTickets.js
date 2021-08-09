import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { Card, CardBody } from "reactstrap";
import { getTickets } from "../../modules/ticketManager";

export default function GuestList() {
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);
    useEffect(() => {
        getTickets().then(setTickets);
    }, [closeTicket]);

    return (

        <Card className="m-4">
            <CardBody>
                <h1>My Tickets</h1>
                <img className="miniLogo mlRUCorner" src="../../img/vamp.png" />
                {tickets.map(q =>
                    <TicketCard key={q.id} Ticket={q} closeTicket={closeTicket} setCloseTicket={setCloseTicket} />
                )
                }
            </CardBody>
        </Card>
    );
}