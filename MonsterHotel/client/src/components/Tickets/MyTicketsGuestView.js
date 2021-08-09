import React, { useEffect, useState } from "react";
import GuestTicketCard from "./GuestTicketCard";
import { Link } from "react-router-dom";
import { getTicketsById } from "../../modules/ticketManager";
import { getCurrentProfile } from '../../modules/userProfileManager';
import { Card, CardBody } from "reactstrap";

export default function TicketGuestList() {
    const [user, setUser] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [closeTicket, setCloseTicket] = useState(false);

    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setUser(user)
            console.log("TESTTESTTEST", user)
            getTicketsById(user.id).then(setTickets);

        });
    };
    useEffect(() => {
        getUserId();
    }, [closeTicket]);

    return (
        <>
            <Card>
                <CardBody>

                    < section >
                        <h1>My Tickets</h1>
                        {
                            console.log("ActiveTicketsGuests", tickets)}
                        {tickets.map(q =>
                            <GuestTicketCard key={q.id} Ticket={q} closeTicket={closeTicket} setCloseTicket={setCloseTicket} />
                        )
                        }
                    </section >
                </CardBody>
                <img className="cornerLogoGhost" src="../../img/ghostie.png" />
            </Card>
            <br />
            <div className="centerBigButton">
                <Link to="/Tickets/Old"><button className="closedStay border"><h1 className="fa fa-history"> Older Tickets...</h1></button></Link>
            </div>
        </>
    );
}