import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingProfilePage from "./UserProfile/LandingProfilePage";
import About from "./About";
import MyStays from "./Stays/MyStays";
import StayForm from "./Stays/StayForm";
import StayEdit from "./Stays/StayEdit";
import MyTickets from "./Tickets/MyTickets";
import DeactivatedTickets from "./Tickets/DeactivatedTickets";
import IssueTickets from "./Tickets/IssueTickets";
import TicketForm from "./Tickets/TicketForm";
import TicketEdit from "./Tickets/TicketEdit";
import GuestList from "./UserProfile/GuestList";
import { getCurrentProfile } from '../modules/userProfileManager';

export default function ApplicationViews({ isLoggedIn }) {
    const [isGuest, setIsGuest] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true);

    const userIsGuest = () => {
        getCurrentProfile().then((user) => {
            console.log(user.userType.name)
            if (user.userType.name === "Guest") {
                setIsGuest(true);
            } else {
                setIsGuest(false)
            }
        });
    };
    const userIsAdmin = () => {
        getCurrentProfile().then((user) => {
            console.log(user.userType.name)
            if (user.userType.name === "Admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false)
            }
        });
    };

    const userIsSuperAdmin = () => {
        getCurrentProfile().then((user) => {
            console.log(user.userType.name)
            if (user.userType.name === "SuperAdmin") {
                setIsAdmin(true);
                setIsSuperAdmin(true);
            } else {
                setIsSuperAdmin(false)
            }
        });
    };
    useEffect(() => {
        if (isLoggedIn) {
            userIsGuest();
            userIsAdmin();
        }
    }, [isLoggedIn]);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {!isLoggedIn ?
                        <Redirect to="/login" />
                        : <LandingProfilePage isLoggedIn={isLoggedIn} />
                    }
                </Route>

                <Route path="/Guests" exact>
                    {isLoggedIn && isAdmin ?
                        <GuestList />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Stays/create" >
                    {isLoggedIn && isAdmin ?
                        <StayForm />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/myStays" exact>
                    {isLoggedIn && isAdmin ?
                        <MyStays isLoggedIn={isLoggedIn} />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Tickets/create" >
                    {isLoggedIn && isGuest ?
                        <TicketForm />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/myTickets">
                    {isLoggedIn && isAdmin ?
                        <MyTickets isLoggedIn={isLoggedIn} />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Tickets/Deactivated">
                    {isLoggedIn && isAdmin ?
                        <DeactivatedTickets isLoggedIn={isLoggedIn} />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Tickets/Issues">
                    {isLoggedIn && isAdmin ?
                        <IssueTickets isLoggedIn={isLoggedIn} />
                        : <Redirect to="/about" />
                    }
                </Route>

                <Route path="/about">
                    <About />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};