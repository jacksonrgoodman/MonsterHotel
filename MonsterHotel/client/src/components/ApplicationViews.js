import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingProfilePage from "./UserProfile/LandingProfilePage";
import HomePage from "./HomePage";
import About from "./About";
import WeeklyEvents from "./WeeklyEvents";
import MyStays from "./Stays/MyStays";
import StayForm from "./Stays/StayForm";
import StayCheckOut from "./Stays/StayCheckOut";
import StayCheckIn from "./Stays/StayCheckIn";
import MyTickets from "./Tickets/MyTickets";
import DeactivatedTickets from "./Tickets/DeactivatedTickets";
import IssueTickets from "./Tickets/IssueTickets";
import TicketForm from "./Tickets/TicketForm";
import MyTicketsGuestView from "./Tickets/MyTicketsGuestView";
import GuestDeactivatedTickets from "./Tickets/GuestDeactivatedTickets";
import TicketEdit from "./Tickets/TicketEdit";
import GuestList from "./UserProfile/GuestList";
import { getCurrentProfile } from '../modules/userProfileManager';

export default function ApplicationViews({ isLoggedIn }) {
    const [isCheckedIn, setIsCheckedIn] = useState(true);
    const [isGuest, setIsGuest] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true);

    const currentUserId = () => {
        getCurrentProfile().then((user) => {
            // console.log(user.id)
            if (user.userType.name === "Guest") {
                setIsGuest(true);
            } else {
                setIsGuest(false)
            }
        });
    };
    const userIsCheckedIn = () => {
        getCurrentProfile().then((user) => {
            console.log("IS CHECKED IN", user.isCheckedIn)
            if (user.userType.name === "Guest") {
                setIsCheckedIn(true);
            } else {
                setIsCheckedIn(false)
            }
        });
    };
    const userIsGuest = () => {
        getCurrentProfile().then((user) => {
            // console.log(user.userType.name)
            if (user.userType.name === "Guest") {
                setIsGuest(true);
            } else {
                setIsGuest(false)
            }
        });
    };
    const userIsAdmin = () => {
        getCurrentProfile().then((user) => {
            // console.log(user.userType.name)
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
            userIsCheckedIn();
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
                {/* <Route path="/Stays/edit" >
                    {isLoggedIn && isAdmin ?
                        <StayEdit />
                        : <Redirect to="/about" />
                    }
                </Route> */}
                <Route path="/Tickets" exact>
                    {isLoggedIn && !isAdmin ?
                        <MyTicketsGuestView />
                        :
                        <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Tickets/Old" exact>
                    {isLoggedIn && !isAdmin ?
                        <GuestDeactivatedTickets />
                        :
                        <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Tickets/edit/:id" >
                    {isLoggedIn && isAdmin ?
                        <TicketForm />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/Stays/create" >
                    {isLoggedIn && isAdmin ?
                        <StayForm />
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
                <Route path="/Checkout" >
                    {isLoggedIn && isCheckedIn ?
                        <StayCheckOut />
                        : <Redirect to="/about" />
                    }
                </Route>
                <Route path="/CheckIn" >
                    {isLoggedIn && isCheckedIn ?
                        <StayCheckIn />
                        : <Redirect to="/about" />
                    }
                </Route>

                <Route path="/WeeklyEvents">
                    <WeeklyEvents />
                </Route>
                <Route path="/HomePage">
                    <HomePage />
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