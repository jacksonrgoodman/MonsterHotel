import React, { useEffect } from "react";
import { Card, CardBody } from "reactstrap";

export default function Events() {
    return (
        <Card className="m-4 bg-gray">
            <CardBody className="displayFlex  alignSelf row">
                <div>
                    <img className="eventPhoto justifyContentEvenly alignSelf" src="./img/halloween-party.jpg" alt="Events" />
                </div>
                <div className="col alignCenter">

                    <h1>Weekly Events</h1>
                    <p><strong>Find something scary. </strong>Here's a list of activities available.</p>

                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col"></th>


                                <th scope="col">8:00PM</th>
                                <th scope="col">8:30PM</th>
                                <th scope="col">9:00PM</th>
                                <th scope="col">9:30PM</th>
                                <th scope="col">10:00PM</th>
                                <th scope="col">10:30PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Monday</th>
                                <td>|Warlocks Anonymous</td>
                                <td></td>
                                <td>|Cyclopean Terrors</td>
                                <td></td>
                                <td></td>
                                <td>|Werewolf Charades</td>

                            </tr>
                            <tr>
                                <th scope="row">Tuesday</th>
                                <td>|Mind Over Monster Lecture</td>
                                <td></td>
                                <td>|Transylvania Golf</td>
                                <td></td>
                                <td></td>
                                <td>|Zombie Night</td>

                            </tr>
                            <tr>
                                <th scope="row">Wednsday</th>
                                <td></td>
                                <td>|Bloodbank Withdrawal</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <th scope="row">Thursday</th>
                                <td>|Scream 1</td>
                                <td></td>
                                <td>|Scream 2</td>
                                <td></td>
                                <td></td>
                                <td>|Ghouls' Night</td>

                            </tr>
                            <tr>
                                <th scope="row">Friday</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>|Skeleton Shots</td>

                            </tr>
                            <tr>
                                <th scope="row">Saturday</th>
                                <td>|Fishman Karaoke</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>|Yeti Mixer</td>
                                <td></td>

                            </tr>
                            <tr>
                                <th scope="row">Sunday</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>|Sports Night</td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardBody>
            <br />
            <br />
            <br />
            <img className="cornerLogoGhost" src="../../img/ghostie.png" />
            <img className="miniLogo mlLUCorner" src="../../img/frank.png" />
            <img className="miniLogoGhost" src="../../img/ghostie.png" />
        </Card>
    );
}
