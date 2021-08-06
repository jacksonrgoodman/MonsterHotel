import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { OpenTicket, IssueTicket, CloseTicket, ClaimTicket, getTicketsById } from "../../modules/ticketManager";

const TicketDetails = () => {
    const [ticket, setTicket] = useState();
    const { id } = useParams();

    const history = useHistory()

    useEffect(() => {
        // getTicketsById(id).then(ticket => setTicket(ticket));
    }, []);

    if (!ticket) {
        return null;
    };

    const handleDeactivate = (event) => {
        //debugger
        if (window.confirm("Are you sure you want to deactivate this account?")) {
            event.preventDefault()
            CloseTicket(ticket.id)
                .then(() => history.push("/Tickets/Deactivated")
                )
        } else {

            history.push("/Tickets/")
        }

    }

    const handleClaimTicket = (event) => {
        //debugger
        if (window.confirm("Are you sure you want to make this account an Admin?")) {
            event.preventDefault()
            ClaimTicket(ticket.id)
                .then(() =>
                    history.push("/Tickets/")
                )
        } else {

        }
    }
    const handleIssueTicket = (event) => {
        //debugger
        if (window.confirm("Are you sure you want to demote this account from Admin status?")) {
            event.preventDefault()
            IssueTicket(ticket.id)
                .then(() => history.push("/Tickets/Issues")
                )
        } else {

        }
    }

    //* console.log("USER ID: ",id);
    //* console.log("USERPROFILE OBJ: ", ticket);
    const defaultProfileImage = "https://robohash.org/numquamutut.png?size=150x150&set=set1";
    const createTime = (ticket.createDateTime.split("T"))
    const time = (createTime.pop())
    const date = (createTime.shift())
    const timeSplit = ((time).split(":"))
    const dateSplit = ((date).split("-"))
    const year = (dateSplit[0])
    const day = (dateSplit[2])
    const month = (dateSplit[1])
    const hour = (timeSplit[0])
    const minute = (timeSplit[1])
    const midnightCheck = (hour === "00" ? "12" : hour)
    const nightNoon = (hour > 12 ? " PM" : " AM")
    const TimeStamp = (day + "/" + month + "/" + year + " @ " + midnightCheck + ":" + minute + "" + nightNoon);


    return (
        <>
            <Link to={`/Tickets/`}>
                <h3>Back To User Profiles</h3>
            </Link>
            <Card className="alignCenter border alignCenter justifyCenter">
                <img id="profilePhoto" src={`${ticket.imageLocation ? ticket.imageLocation : defaultProfileImage}`} alt="default profile" />
                <h3><strong>{ticket.displayName}</strong>, <em>{ticket.userType.name}</em></h3>
                <h5><strong>Profile Created On: </strong>{TimeStamp}</h5>

                <CardBody className="alignCenter border alignCenter justifyCenter">
                    <div className="alignCenter border alignCenter justifyCenter">
                        <p><strong>Name: </strong>{ticket.fullName}</p>
                        <p><strong>User Type: </strong>{ticket.userType.name}</p>
                        <p><strong>Email: </strong>{ticket.email}</p>
                    </div>

                </CardBody>
                <br />
                {ticket.userTypeId === 1
                    ? <button type="button" className="btn btn-primary"
                        onClick={handleIssueTicket}>Demote to Author</button>
                    : <button type="button" className="btn btn-primary"
                        onClick={handleClaimTicket}>Promote to Admin</button>
                }
                <br />
                {/* ! NEEDS WORK */}
                <button type="button" className="btn btn-primary"
                    onClick={handleDeactivate}>
                    Deactivate User
                </button>
            </Card >
        </>
    );
};

export default TicketDetails;
