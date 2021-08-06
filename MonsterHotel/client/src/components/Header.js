import React, { useEffect, useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logout } from "../modules/authManager";
import { headerContext } from '../modules/headerProvider';
import { getCurrentProfile } from '../modules/userProfileManager';


export default function Header({ isLoggedIn, props }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const { userIsCheckedIn, isCheckedIn } = useContext(headerContext)
    const toggle = () => setIsOpen(!isOpen);

    const userIsAdmin = () => {
        getCurrentProfile().then((user) => {
            // console.log("NAVBAR CHECK:", user)
            // console.log("NAVBAR CHECK UserType:", user.userType.name)
            if (user.userType.name !== "Admin") {
                setIsAdmin(false);
            } else {
                setIsAdmin(true)
            }
        });
    };
    // const userIsCheckedIn = () => {
    //     getCurrentProfile().then((user) => {
    //         console.log("NAVBAR CHECK:", user)
    //         console.log("NAVBAR CHECK isCheckedIn:", user.isCheckedIn)
    //         if (user.isCheckedIn) {
    //             setIsCheckedIn(true);
    //         } else {
    //             setIsCheckedIn(false);
    //         }
    //     });
    // };
    const userIsActive = () => {
        getCurrentProfile().then((user) => {
            // console.log("NAVBAR CHECK:", user)
            // console.log("NAVBAR CHECK isActive:", user.isActive)
            if (user.isActive) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    };
    useEffect(() => {
        if (isLoggedIn) {
            userIsAdmin();
            userIsCheckedIn();
            userIsActive();
        }
    }, [isLoggedIn]);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/HomePage"><img className="logoPhoto" src="./img/ghostie-mini.png" /></NavbarBrand>
                <NavbarBrand tag={RRNavLink} to="/">MonsterHotel</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && isActive &&
                            <NavItem>
                                <NavLink className="fa fa-calendar-week fa-lg" title="Events" tag={RRNavLink} to="/WeeklyEvents"> Events</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn && isActive && isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink className="fa fa-calendar-plus fa-lg" title="Create A Stay" tag={RRNavLink} to="/Stays/Create">Add Room</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-user fa-lg" title="View Guests" tag={RRNavLink} to="/guests">Guests</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-comment fa-lg" title="Tickets" tag={RRNavLink} to="/myTickets">Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-comment-slash fa-lg" title="Closed Tickets" tag={RRNavLink} to="/Tickets/Deactivated">Old Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-exclamation-triangle fa-lg" title="Issue Tickets" tag={RRNavLink} to="/Tickets/Issues">Issues</NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink tag={RRNavLink} to="/myStays">My Stays</NavLink>
                                </NavItem> */}

                            </>
                        }
                        {isLoggedIn && isActive && isCheckedIn && !isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink className="fa fa-comment-medical fa-lg" title="Add A Ticket" tag={RRNavLink} to="/Tickets/create">Add Ticket</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-comment fa-lg" title="My Tickets" tag={RRNavLink} to="/Tickets">My Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fas fa-caret-square-up fa-lg" title="Check In" tag={RRNavLink} to="/CheckOut">Check Out</NavLink>
                                </NavItem>

                            </>
                        }
                        {isLoggedIn && isActive && !isCheckedIn && !isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink className="fas fa-caret-square-down fa-lg" title="Check In" tag={RRNavLink} to={{ pathname: "/CheckIn", state: { isCheckedIn: isCheckedIn } }}>Check In</NavLink>
                                </NavItem>

                            </>
                        }
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="fa fa-question-circle fa-lg" title="About" tag={RRNavLink} to="/about">About</NavLink>
                            </NavItem>
                        </Nav>
                        {isLoggedIn && isActive &&
                            <>
                                <Nav>
                                    <NavItem>
                                        <NavLink className="fa fa-sign-out-alt fa-lg" title="Logout" aria-current="page"
                                            style={{ cursor: "pointer" }} onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </>
                        }
                        {isLoggedIn && !isActive &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Remediating Your Account</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-sign-out-alt fa-lg" title="Logout" aria-current="page"

                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink className="fa fa-sign-in-alt fa-lg" title="Login" tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="fa fa-flag fa-lg" title="Register" tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>

        </div >
    );
}
