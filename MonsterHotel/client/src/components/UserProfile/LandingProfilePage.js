import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getCurrentProfile } from "../../modules/userProfileManager";

export default function UserProfileList({ isLoggedIn }) {
    const [userProfile, setUserProfile] = useState();
    const [isActive, setIsActive] = useState(true);
    const getUser = () => {
        getCurrentProfile().then((user) => {
            // if (!userProfile == undefined) {
            setUserProfile(user);
            // }
        });
    };

    const userIsActive = () => {
        getCurrentProfile().then((user) => {
            console.log("LandingPage CHECK:", user)
            console.log("LandingPage CHECK isActive:", user.isActive)
            if (user.isActive) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            // debugger
            getUser();
            userIsActive();
        }
        if (userProfile == undefined) {
            getUser();
        }
    }, [isLoggedIn]);
    console.log("USESTATE USERPROFILE", userProfile);
    console.log("USESTATE ISACTIVE", isActive);
    return (
        < section >

            {userProfile && isActive &&
                <>
                    <h1>Welcome to Monster Hotel, {userProfile.firstName}!</h1>
                    <UserProfileCard key={userProfile.id} UserProfile={userProfile} />
                </>
            }
        </section >
    );
}