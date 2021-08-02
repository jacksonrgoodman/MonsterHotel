import React, { useEffect, useState } from "react";
import StayCard from "./StayCard";
import { getStaysByHandlerId } from "../../modules/stayManager";
import { getCurrentProfile } from "../../modules/userProfileManager";

export default function MyStays({ isLoggedIn }) {

    const [userProfile, setUserProfile] = useState();
    const [myStays, setMyStays] = useState([]);


    const getUser = () => {
        getCurrentProfile().then((user) => {
            // if (!userProfile == undefined) {
            setUserProfile(user);
            console.log("CURRENT USER?", user)
            getStays(user.id);
            // }
        });
    };
    const getStays = (id) => {
        debugger
        getStaysByHandlerId(id).then((stays) =>
            setMyStays(stays));

    }
    useEffect(() => {
        if (isLoggedIn) {
            getUser();
        }
    }, [isLoggedIn]);

    return (
        < section >
            <h1>My Stays</h1>
            {
                console.log("MyStays", myStays)}
            {myStays.map(q =>
                <StayCard key={q.id} Stay={q} />
            )
            }
        </section >
    );
}