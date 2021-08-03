import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../../modules/roomManager';
import { getStayById, CheckOut } from '../../modules/stayManager';
import { useHistory } from 'react-router-dom';
import { CheckOutUser, getCurrentProfile } from '../../modules/userProfileManager';


const StayForm = () => {
    // const placeholderDate = new DateTime.Now()
    const [currentUser, setCurrentUser] = useState({});
    const [stay, setStay] = useState({});
    const [stayRoomSelect, setStayRoomSelect] = useState('');
    const [stayRoomList, setStayRoomList] = useState([])
    const [stayRoomCheck, setStayRoomCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()



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
        getUserId()
        console.log("CurrentUser", currentUser.id)

    }, [])



    //Takes new stay entry and sends it to the DB
    const handleClickSaveEntry = (e) => {
        debugger
        console.log(stay)
        if (window.confirm("Are you sure you want to Check Out?")) {
            e.preventDefault();
            setIsLoading(true);
            console.log("fire1", stay.id)
            console.log("fire2", currentUser.id)
            debugger
            CheckOut(stay.id).then(() =>
                CheckOutUser(currentUser.id).then(() =>
                    history.push('/')))
        } else {
            history.push("/")
        }
    }

    return (
        <>

            <div className='save-button'>
                <button className='btn open' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>CHECK OUT</button>
            </div>

        </>
    )

};

export default StayForm;