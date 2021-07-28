import React from "react";
import { Card, CardBody } from "reactstrap";

export default function UserProfileCard({ UserProfile }) {
    console.log(UserProfile)
    return (
        <Card className="m-4">
            <CardBody>
                <strong>{UserProfile.fullName}</strong>
            </CardBody>
        </Card>
    );
}