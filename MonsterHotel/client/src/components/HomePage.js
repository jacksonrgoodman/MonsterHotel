import React from "react";
import { Card, CardBody } from "reactstrap";

export default function HomePage() {
    return (
        <Card className="m-4">
            <CardBody>
                <h1>WELCOME</h1>
                <div>
                    <img className="eventPhoto justifyContentEvenly alignSelf" src="./img/monster-hotel.png" alt="Monster Hotel" />
                </div>
                <p><strong>Monster Hotel Aims To Please: </strong></p>
                <p><strong></strong></p>
                <p><strong>Have Fun. </strong>Jackson Goodman for C47's Backend</p>
                <p><strong>Relax While Travelling </strong>
                    <img className="cornerLogoGhost" src="../../img/ghostie.png" />
                </p>
            </CardBody>
        </Card>
    );
}