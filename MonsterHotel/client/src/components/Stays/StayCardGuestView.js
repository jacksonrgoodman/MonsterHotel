import React, { useEffect, useState, useContext } from "react";
import { getStayById, CheckIn, getAllStaysDeactive } from '../../modules/stayManager';
import { Card, CardBody } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { CheckInUser, getCurrentProfile } from '../../modules/userProfileManager';
import { headerContext } from "../../modules/headerProvider"

export default function StayCardGuestView({ Stay, setStayCheckIn }) {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [stay, setStay] = useState({});
    const history = useHistory()
    const { setIsCheckedIn } = useContext(headerContext)

    const handleClickSaveEntry = (e) => {
        //debugger
        console.log(stay)
        if (window.confirm("Are you sure you want to Check In?")) {
            e.preventDefault();
            setIsLoading(true);
            console.log("fire1", Stay.id)
            console.log("fire2", currentUser.id)
            //debugger
            CheckIn(4).then(() =>
                CheckInUser(currentUser.id).then(() => {
                    setIsCheckedIn(true)
                    history.push('/')
                }
                )
            )
        } else {
            history.push("/")
        }
    }
    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setCurrentUser(user)

        });
    };

    useEffect(() => {
        getUserId()

    }, [])
    return (
        <Card className="m-4">

            <CardBody>
                <h1>Stay #{Stay.id}</h1>
                <h1>Room {Stay.room.fullName}</h1>

                <div className='save-button'>
                    <button className='btn open' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>CHECK IN</button>
                </div>
            </CardBody>
        </Card>
    );
}