import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Card, CardBody } from "reactstrap";
import { CloseTicket, OpenTicket, IssueTicket, DeactivateTicket, ActivateTicket } from "../../modules/ticketManager";

export default function GuestTicketCard({ Ticket }) {
    console.log("Ticket", Ticket)
    const history = useHistory()
    const handleCloseTicket = (event) => {

        if (window.confirm("Are you sure you want to close this ticket?")) {
            event.preventDefault()
            CloseTicket(Ticket.id)
                .then(() =>
                    DeactivateTicket(Ticket.id).then(() =>
                        history.push("/myTickets")
                    )
                )
        } else {
            history.push("/")
        }

    }
    const handleIssueTicket = (event) => {

        if (window.confirm("Are you sure you want to upgrade this ticket to Issue Status?")) {
            event.preventDefault()
            IssueTicket(Ticket.id)
                .then(() => history.push("/myTickets")
                )
        } else {
            history.push("/")
        }

    }
    const handleOpenTicket = (event) => {


        event.preventDefault()
        OpenTicket(Ticket.id)
            .then(() =>
                ActivateTicket(Ticket.id).then(() =>
                    history.push("/myTickets")
                )
            )

    }
    useEffect(() => {

    }, []);
    return (
        <div className="" >
            <Card className="m-4">
                {/* <img className="profilePicture" src={Ticket.imageLocation} /> */}
                <CardBody className="displayFlex">
                    <div className="displayFlex alignCenter">

                        <div className="ticketCol">
                            <h2 className="textAlign">Title:
                            </h2>
                            <h2 className="textAlign">{Ticket.title}
                            </h2>
                        </div>
                        {/* {/* <p><strong>{Ticket.Guest} User: </strong>{Ticket.fullName}</p> */}
                        <div className="ticketCol">
                            <h2 className="textAlign">Desc:
                            </h2>
                            <h4 className="textAlign">{Ticket.description}
                            </h4>
                        </div>
                        <div className="displayFlex row">
                            <div className="displayFlex col alignCenter">
                                <button className="col claimed">Details</button>
                                {Ticket.ticketStatus.name !== "Closed" &&
                                    <button onClick={handleCloseTicket} title="Close Ticket" className="col closed">CLOSE</button>
                                }
                                {Ticket.ticketStatus.name === "Closed" &&
                                    <button onClick={handleOpenTicket} title="Open Ticket" className="col open">REOPEN</button>
                                }
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}