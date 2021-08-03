import React, { useEffect, useState } from 'react';
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
import { getCurrentProfile } from '../modules/userProfileManager';

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(true);
    const [isActive, setIsActive] = useState(true);
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
    const userIsCheckedIn = () => {
        getCurrentProfile().then((user) => {
            console.log("NAVBAR CHECK:", user)
            console.log("NAVBAR CHECK isCheckedIn:", user.isCheckedIn)
            if (user.isCheckedIn) {
                setIsCheckedIn(true);
            } else {
                setIsCheckedIn(false);
            }
        });
    };
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
                <NavbarBrand tag={RRNavLink} to="/">MonsterHotel</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && isActive && isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Stays/Create">Add A Stay</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/guests">Guests</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Tickets">Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myStays">My Stays</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myTickets">My Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {isLoggedIn && isActive && isCheckedIn && !isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Tickets/create">Add A Ticket</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Tickets">Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/CheckOut">Check Out</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {isLoggedIn && isActive && !isCheckedIn && !isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/CheckIn">Check In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {isLoggedIn && !isActive &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Remediating Your Account</NavLink>
                                </NavItem>
                                {/* <NavItem>
                                            <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                        </NavItem> */}
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}
