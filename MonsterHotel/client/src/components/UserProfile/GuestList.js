import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getAllActiveProfiles } from "../../modules/userProfileManager";

export default function UserProfileList() {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllActiveProfiles().then(setUserProfiles);
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