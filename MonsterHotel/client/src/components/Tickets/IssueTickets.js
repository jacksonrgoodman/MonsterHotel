import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { getIssueTickets } from "../../modules/ticketManager";
import { Card, CardBody } from "reactstrap";
export default function IssueTicketsList() {
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);

    useEffect(() => {
        getIssueTickets().then(setTickets);
    }, [closeTicket]);

    return (
        <>
            <Card className="m-4">
                <CardBody>
                    < section >
                        <h1>Issue Tickets</h1>
                        <img className="miniLogo mlRUCorner" src="../../img/vamp.png" />
                        {
                            console.log("ActiveGuests", tickets)}
                        {tickets.map(q =>
                            <TicketCard key={q.id} closeTicket={closeTicket} setCloseTicket={setCloseTicket} Ticket={q} />
                        )
                        }
                    </section >
                </CardBody>
            </Card>
        </>
    );
}