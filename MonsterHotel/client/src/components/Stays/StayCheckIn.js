import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../../modules/roomManager';
import { getStayById, CheckIn, getAllStaysDeactive } from '../../modules/stayManager';
import { useHistory } from 'react-router-dom';
import { CheckInUser, getCurrentProfile } from '../../modules/userProfileManager';
import StayCardGuestView from "./StayCardGuestView";

const StayForm = () => {
    // const placeholderDate = new DateTime.Now()
    const [currentUser, setCurrentUser] = useState({});
    const [stay, setStay] = useState({});
    const [stayRoomSelect, setStayRoomSelect] = useState('');
    const [stayList, setStayList] = useState([])
    const [stayRoomCheck, setStayRoomCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()



    const getDeactivated = () => {
        getAllStaysDeactive().then((user) => {
            setStayList(user)

        });
    };
    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setCurrentUser(user)
            getStayById(user.id).then((stay) => {
                setStay(stay)
            });
        });
    };


    //fetch list of all categories for dropdown
    useEffect(() => {
        getDeactivated()
        getUserId()
        console.log("staylist", stayList)

    }, [])

    return (
        <>
            {stayList.map(q =>
                <StayCardGuestView key={q.id} Stay={q} />
            )
            }



        </>
    )

};

export default StayForm;