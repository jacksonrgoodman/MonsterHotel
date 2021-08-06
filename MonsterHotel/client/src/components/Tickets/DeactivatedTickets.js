import { Card, CardBody } from "reactstrap";
import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getDeactivatedTickets } from "../../modules/ticketManager";

export default function DeactivatedList() {
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);
    useEffect(() => {

        getDeactivatedTickets().then(setTickets);
    }, [closeTicket]);

    return (
        <>
            <Card className="m-4">
                <CardBody>
                    < section >
                        <h1>Deactivated Tickets</h1>
                        <img className="miniLogo mlRUCorner" src="../../img/frank.png" />
                        {
                            console.log("ActiveGuests", tickets)}
                        {tickets.map(q =>
                            <TicketCard key={q.id} Ticket={q} closeTicket={closeTicket} setCloseTicket={setCloseTicket} />
                        )
                        }
                    </section >
                </CardBody>
            </Card>
        </>
    );
}