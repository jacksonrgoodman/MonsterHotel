import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingProfilePage from "./UserProfile/LandingProfilePage";
import GuestList from "./UserProfile/GuestList";
import { getCurrentProfile } from '../modules/userProfileManager';

export default function ApplicationViews({ isLoggedIn }) {
    console.log(isLoggedIn)
    const [isAdmin, setIsAdmin] = useState(true);

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
    useEffect(() => {
        if (isLoggedIn) {
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

                <Route path="/Guests">
                    {isLoggedIn && isAdmin ?
                        <GuestList />
                        : <Redirect to="/about" />
                    }
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