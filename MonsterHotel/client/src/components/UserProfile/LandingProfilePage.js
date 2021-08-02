import React, { useEffect, useState } from "react";
import { getCurrentProfile } from "../../modules/userProfileManager";
import { Card, CardBody } from "reactstrap";

export default function UserProfileList({ isLoggedIn }) {
    const [userProfile, setUserProfile] = useState();
    const [isActive, setIsActive] = useState();
    const getUser = () => {
        getCurrentProfile().then((user) => {
            // if (!userProfile == undefined) {
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
            // // debugger
            getUser();
            userIsActive();
        }
        if (userProfile == undefined) {
            getUser();
        }
    }, [isLoggedIn]);
    // console.log("USESTATE USERPROFILE", userProfile);
    // console.log("USESTATE ISACTIVE", isActive);
    return (
        < section >

            {userProfile && isActive &&
                <>
                    <h1>Welcome to Monster Hotel, {userProfile.firstName}!</h1>
                    <Card className="m-4">
                        <div className="displayFlex">
                            <img className="profilePicture border" src={userProfile.imageLocation} al="Profile" />
                            <CardBody className="">
                                <p><strong>{userProfile.userType.name} User: </strong>{userProfile.fullName}</p>
                                <p><strong>Display Name: </strong>{userProfile.displayName}</p>
                                {userProfile.isCheckedIn &&
                                    <>
                                        <p><strong>Checked In!</strong></p>
                                    </>
                                }
                            </CardBody>
                        </div>
                    </Card>
                </>
            }
        </section >
    );
}