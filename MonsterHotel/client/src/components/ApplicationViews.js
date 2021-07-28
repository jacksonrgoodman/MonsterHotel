import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingProfilePage from "./UserProfile/LandingProfilePage";
import GuestList from "./UserProfile/GuestList";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ?
                        <LandingProfilePAge />
                        : <Redirect to="/login" />}
                </Route>

                <Route path="/Guests">
                    {isLoggedIn ?
                        <GuestList />
                        : <Redirect to="/login" />}
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