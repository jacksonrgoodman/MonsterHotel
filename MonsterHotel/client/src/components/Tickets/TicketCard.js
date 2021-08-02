import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Card, CardBody, Button } from "reactstrap";
import { CloseTicket, OpenTicket, IssueTicket, DeactivateTicket, ActivateTicket } from "../../modules/ticketManager";

export default function UserProfileCard({ Ticket }) {
    console.log("Ticket", Ticket)
    const history = useHistory()
    const handleCloseTicket = (event) => {
        //debugger
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
        //debugger
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
        //debugger

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
                        {Ticket.ticketStatus.name == "Open" &&
                            <div className="ticketBadge ticketCol ticketCol open"><h1 className="textAlign">{Ticket.ticketStatus.name} Ticket!</h1></div>
                        }
                        {Ticket.ticketStatus.name == "Claimed" &&
                            <div className="ticketBadge ticketCol claimed"><h1 className="textAlign">{Ticket.ticketStatus.name}</h1></div>
                        }
                        {Ticket.ticketStatus.name == "Issue" &&
                            <div className="ticketBadge ticketCol issue"><h1 className="textAlign">!{Ticket.ticketStatus.name}!</h1></div>
                        }
                        {Ticket.ticketStatus.name == "Waiting" &&
                            <div className="ticketBadge ticketCol waiting"><h1 className="textAlign">...{Ticket.ticketStatus.name}...</h1></div>
                        }
                        {Ticket.ticketStatus.name == "Closed" &&
                            <div className="ticketBadge ticketCol  closed">
                                <h1 className="textAlign">/{Ticket.ticketStatus.name}/
                                </h1>
                            </div>
                        }
                        {!Ticket.ticketStatus &&
                            <div><h1 className="err">Ticket Status Error!</h1></div>
                        }
                        {Ticket.ticketType.name == "Food" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:
                                </h2>
                                <h2 className="textAlign food">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {Ticket.ticketType.name == "Bill" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:
                                </h2>
                                <h2 className="textAlign bill">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {Ticket.ticketType.name == "Maintenance" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:
                                </h2>
                                <h2 className="textAlign maintenance">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {Ticket.ticketType.name == "Concierge" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:
                                </h2>
                                <h2 className="textAlign concierge">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {Ticket.ticketType.name == "Parking" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:</h2>
                                <h2 className="textAlign parking">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {Ticket.ticketType.name == "Security" &&
                            <div className="ticketCol">
                                <h2 className="textAlign">Category:
                                </h2>
                                <h2 className="textAlign security">{Ticket.ticketType.name}
                                </h2>
                            </div>
                        }
                        {!Ticket.ticketType &&
                            <h2 className="ticketCol err">Ticket Type Error!</h2>
                        }
                        <div className="ticketCol">
                            <h2 className="textAlign">Title:
                            </h2>
                            <h2 className="textAlign">{Ticket.title}
                            </h2>
                        </div>
                        {/* {/* <p><strong>{Ticket.Guest} User: </strong>{Ticket.fullName}</p> */}
                        <div className="ticketCol">
                            <h2 className="textAlign">Guest:
                            </h2>
                            <h4 className="textAlign">{Ticket.guest.displayName}
                            </h4>
                        </div>
                        <div className="ticketCol">
                            {Ticket.ticketStatus.name != "Issue" &&
                                <><button onClick={handleIssueTicket} className="issue">ISSUE</button></>
                            }
                        </div>
                    </div>
                    <div className="displayFlex row">
                        <div className="displayFlex col alignCenter">
                            <button className="col claimed">Details</button>
                            {Ticket.ticketStatus.name != "Closed" &&
                                <button onClick={handleCloseTicket} title="Close Ticket" className="col closed">CLOSE</button>
                            }
                            {Ticket.ticketStatus.name == "Closed" &&
                                <button onClick={handleOpenTicket} title="Open Ticket" className="col open">REOPEN</button>
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}