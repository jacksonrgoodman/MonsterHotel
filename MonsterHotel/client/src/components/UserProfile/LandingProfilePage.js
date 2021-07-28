import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getCurrentProfile } from "../../modules/userProfileManager";

export default function UserProfileList() {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        getCurrentProfile().then(setUserProfile);
        console.log(userProfile)
    }, []);

    return (
        < section >
            {
                userProfiles.map(q =>
                    <UserProfileCard key={q.id} UserProfile={q} />
                )
            }
        </section >
    );
}