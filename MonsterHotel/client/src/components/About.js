import React from "react";
import { Card, CardBody } from "reactstrap";

export default function About({ Stay }) {
    console.log("Stay", Stay)
    return (
        <Card className="m-4">
            <CardBody>
                <h1>Monster Hotel</h1>
                <p><strong>About: </strong></p>
                <p><strong></strong></p>
                <p><strong>Created By: </strong>Jackson Goodman for C47's Backend</p>
                <p><strong>With Thanks To: </strong>
                    My Family,
                    Nashville Software School's Cohort 47,
                    all of my colleagues, mentors, and peers.
                </p>
                <h5> Including:</h5>
                <ul>
                    <li>
                        Tyler Hilliard
                    </li>
                    <li>
                        Andy Collins
                    </li>
                    <li>
                        Nick Patton
                    </li>
                    <li>
                        Brandon Hill
                    </li>
                    <li>
                        Carter Culkin
                    </li>
                    <li>
                        David Darden
                    </li>
                    <li>
                        Meg McGregor
                    </li>
                    <li>
                        Christine Doza
                    </li>
                    <li>
                        Brenda Long
                    </li>
                    <li>
                        Bryan Nilsen
                    </li>
                    <li>
                        Monica Kay Provence
                    </li>
                    <li>
                        Red Tilson
                    </li>
                </ul>

            </CardBody>
        </Card>
    );
}