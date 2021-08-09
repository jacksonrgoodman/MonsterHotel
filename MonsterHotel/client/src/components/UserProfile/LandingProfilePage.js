import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../modules/userProfileManager";
import { Card, CardBody } from "reactstrap";

export default function UserProfileList({ isLoggedIn }) {
    const [userProfile, setUserProfile] = useState();
    const [isActive, setIsActive] = useState();
    const getUser = () => {
        getCurrentProfile().then((user) => {
            // if (!userProfile === undefined) {
            setUserProfile(user);
            // }
        });
    };

    const userIsActive = () => {
        getCurrentProfile().then((user) => {
            // console.log("LandingPage CHECK:", user)
            // console.log("LandingPage CHECK isActive:", user.isActive)
            if (user.isActive) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    };

    useEffect(() => {
        if (isLoggedIn) {

            getUser();
            userIsActive();
        }
        // if (userProfile === undefined) {
        //     getUser();
        // }
    }, [isLoggedIn]);
    // console.log("USESTATE USERPROFILE", userProfile);
    // console.log("USESTATE ISACTIVE", isActive);
    return (
        < section >

            {userProfile && isActive &&
                <>
                    <Card className="m-4">
                        <CardBody className="m-4">
                            <h1>Welcome to Monster Hotel, {userProfile.firstName}!</h1>
                            <div className="displayFlex">
                                <img className="profilePicture border" alt={userProfile.displayName} src={userProfile.imageLocation} al="Profile" />
                                <img className="cornerLogoGhost" src="../../img/ghostie.png" />
                                <br />
                                <CardBody className="">
                                    <p><strong>{userProfile.userType.name} User: </strong>{userProfile.fullName}</p>
                                    <p><strong>Display Name: </strong>{userProfile.displayName}</p>
                                    {!userProfile.isCheckedIn && userProfile.userType.id == 1 &&
                                        <div >
                                            <div className="centerBigButton">
                                                <Link to="/myTickets/"><button className="closedStay"><h1>Take Care Of Tickets!</h1></button></Link>
                                            </div>
                                        </div>
                                    }
                                    {userProfile.isCheckedIn && userProfile.userType.id == 2 &&
                                        <div >
                                            <div>
                                                <p className="openStay border fa fa-bed"> Checked In!</p>
                                            </div>
                                            <div className="centerBigButton">
                                                <Link to="/Tickets/create"><button className="closedStay"><h1>Ask For Some Help?</h1></button></Link>
                                            </div>
                                        </div>
                                    }
                                    {!userProfile.isCheckedIn && userProfile.userType.id == 2 &&
                                        <>
                                            <p className="issueStay border fa fa-times"><strong> Not Checked In!</strong></p>
                                        </>
                                    }
                                </CardBody>
                            </div>
                        </CardBody>
                    </Card>
                </>
            }
        </section >
    );
}