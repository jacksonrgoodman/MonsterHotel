import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { getStayById } from "../../modules/stayManager";
import { getCurrentProfile } from '../../modules/userProfileManager';

export default function UserProfileCard({ UserProfile }) {
    const [activeStay, setActiveStay] = useState();
    const [isCheckedIn, setIsCheckedIn] = useState(true);
    console.log("UserProfile", UserProfile)

    const userIsCheckedIn = () => {
        getCurrentProfile().then((user) => {
            console.log("UPCARD CHECK:", user)
            console.log("UPCARD CHECK isCheckedIn:", user.isCheckedIn)

        })
    }



    const getStay = (id) => {
        getStayById(id).then((stay) => {
            console.log("STAY", stay)
            setActiveStay(stay)
        });
    }
    useEffect(() => {

        console.log(UserProfile)
        userIsCheckedIn();
        getStay()

    })
    return (
        <Card className="m-4">
            <img className="profilePicture" src={UserProfile.imageLocation} />
            <CardBody>
                <p><strong>{UserProfile.userType.name} User: </strong>{UserProfile.fullName}</p>
                <p><strong>Display Name: </strong>{UserProfile.displayName}</p>
                {UserProfile.isCheckedIn &&
                    <>
                        <p><strong>Checked In!</strong></p>
                        <button className="open">Ask For Help!</button>
                        {/* <p><strong>Room: </strong>{activeStay.room.floor}</p> */}
                    </>
                }
            </CardBody>
        </Card>
    );
}