import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getAllGuests } from "../../modules/userProfileManager";

export default function UserProfileList() {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllGuests().then(setUserProfiles);
        console.log(userProfiles)
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