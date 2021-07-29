import React from "react";
import { Card, CardBody } from "reactstrap";

export default function UserProfileCard({ UserProfile }) {
    console.log("UserProfile", UserProfile)
    return (
        <Card className="m-4">
            <img src={UserProfile.imageLocation} />
            <CardBody>
                <p><strong>{UserProfile.userType.name} User:</strong>{UserProfile.fullName}</p>
                <p><strong>Display Name:</strong>{UserProfile.displayName}</p>
            </CardBody>
        </Card>
    );
}