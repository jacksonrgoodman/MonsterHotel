import React, { useEffect, useState } from "react";
import GuestTicketCard from "./GuestTicketCard";
import { getCurrentProfile } from '../../modules/userProfileManager';
import { getDeactivatedTicketsById } from "../../modules/ticketManager";
import { Card, CardBody } from "reactstrap";

export default function GuestDeactivatedList() {
    const [user, setUser] = useState([]);
    const [tickets, setTickets] = useState([]);
    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setUser(user)
            console.log("TESTTESTTEST", user)
            getDeactivatedTicketsById(user.id).then(setTickets);

        });
    };
    useEffect(() => {
        getUserId();
    }, []);

    return (
        < section >
            <Card>
                <CardBody>
                    <h1>Older Tickets</h1>
                    <img className="cornerLogoGhost" src="../../img/vamp.png" />
                    {
                        console.log("ActiveGuests", tickets)}
                    {tickets.map(q =>
                        <GuestTicketCard key={q.id} Ticket={q} />
                    )
                    }
                </CardBody>
            </Card>
        </section >
    );
}