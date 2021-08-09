import React, { useEffect, useState } from "react";
import GenericProfileCard from "./GenericProfileCard";
import { getAllGuests } from "../../modules/userProfileManager";
import { Card, CardBody } from "reactstrap";

export default function GuestList() {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllGuests().then(setUserProfiles);
    }, []);

    return (
        <Card>
            <CardBody>
                <h1>Guest List</h1>
                < section >
                    {
                        console.log("ActiveGuests", userProfiles)}
                    {userProfiles.map(q =>
                        <GenericProfileCard key={q.id} UserProfile={q} />
                    )
                    }
                </section >
            </CardBody>

        </Card>
    );
}