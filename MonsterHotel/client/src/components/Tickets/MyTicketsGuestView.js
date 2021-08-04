import React, { useEffect, useState } from "react";
import GuestTicketCard from "./GuestTicketCard";
import { getTicketsById } from "../../modules/ticketManager";
import { getCurrentProfile } from '../../modules/userProfileManager';

export default function TicketGuestList() {
    const [user, setUser] = useState([]);
    const [tickets, setTickets] = useState([]);

    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setUser(user)
            console.log("TESTTESTTEST", user)
            getTicketsById(user.id).then(setTickets);

        });
    };
    useEffect(() => {
        getUserId();
    }, []);

    return (
        < section >
            <h1>My Tickets</h1>
            {
                console.log("ActiveTicketsGuests", tickets)}
            {tickets.map(q =>
                <GuestTicketCard key={q.id} Ticket={q} />
            )
            }
        </section >
    );
}