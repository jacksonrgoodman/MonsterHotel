import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getAllGuests } from "../../modules/userProfileManager";

export default function GuestList() {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllGuests().then(setUserProfiles);
    }, []);

    return (
        < section >
            {
                console.log("ActiveGuests", userProfiles)}
            {userProfiles.map(q =>
                <UserProfileCard key={q.id} UserProfile={q} />
            )
            }
        </section >
    );
}