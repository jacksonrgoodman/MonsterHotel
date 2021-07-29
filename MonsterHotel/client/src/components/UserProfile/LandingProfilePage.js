import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getCurrentProfile } from "../../modules/userProfileManager";

export default function UserProfileList({ isLoggedIn }) {
    const [userProfile, setUserProfile] = useState();

    const getUser = () => {
        getCurrentProfile().then((user) => {
            console.log("LandingPage Request:", user)
            if (user.isActive) {
                console.log("LandingPage User displayName: ", user.displayName)
                setUserProfile(user);
            } else {
                console.log("USER IS NOT ACTIVE: ", user.displayName)
                getUser();
            }
        });
    };
    useEffect(() => {
        if (isLoggedIn) {
            // debugger
            getUser();
        }
    }, [isLoggedIn]);

    return (
        < section >
            {/* <h1>Welcome to Monster Hotel, {userProfile.firstName}!</h1> */}
            {/* <UserProfileCard key={userProfile.id} UserProfile={userProfile} /> */}
        </section >
    );
}