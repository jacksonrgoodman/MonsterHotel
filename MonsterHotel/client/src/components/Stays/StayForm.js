import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../../modules/roomManager';
import { addStay, checkByRoomId } from '../../modules/stayManager';
import { useHistory } from 'react-router-dom';
import { getCurrentProfile } from '../../modules/userProfileManager';


const StayForm = () => {
    let placeholderDate = "1900-01-01T00:00:00"
    const [user, setUser] = useState({});
    const [stay, setStay] = useState({
        roomId: 0,
        guestId: 4,
        handlerId: user.id,
        checkInTime: placeholderDate,
        checkOutTime: placeholderDate,
        isCheckedIn: false,
        isActive: true
    });
    const [stayRoomSelect, setStayRoomSelect] = useState('');
    const [stayRoomList, setStayRoomList] = useState([])
    const [stayRoomCheck, setStayRoomCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()



    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setUser(user)
            console.log("123", user)
            console.log("456", user)
        });
    };

    const roomCheck = (id) => {
        console.log("roomcheck", id)
        checkByRoomId(id).then((roomcheck) => {
            console.log("ping", roomcheck.status)


            if (roomcheck.status == 404) {


                console.log("FIRE", user.id)
                setStayRoomCheck(true)


            } else {
                setStayRoomCheck(false)

            }
        })



    }
    console.log(stayRoomList)
    //fetch list of all categories for dropdown
    useEffect(() => {
        getUserId()
        getAllRooms()
            .then(res => {
                setStayRoomList(res)
            })
    }, [])

    //Handle input changes and parse user ID
    const handleControlledInputChange = (e) => {
        let newStay = { ...stay };
        let selectedVal = e.target.value

        if (e.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        newStay[e.target.id] = selectedVal
        setStay(newStay);
    };

    //Handle input changes and parse user ID
    const handleDropdownChange = (e) => {
        e.preventDefault()

        let selectedVal = e.target.value;
        setStayRoomSelect(selectedVal);
        roomCheck(selectedVal);
    };

    //Takes new stay entry and sends it to the DB
    const handleClickSaveEntry = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newStay = { ...stay };
        newStay.handlerId = user.id
        newStay.RoomId = parseInt(stayRoomSelect);
        if (stayRoomSelect === '') {
            alert("Please select a Room")
        } else if (stayRoomSelect === 'Please Select A Room') {
            alert("Please check if the room is open.")
        } else if (stayRoomCheck === false) {
            alert("Please check if the room is open.")
        } else {
            addStay(newStay).then(() => history.push('/myStays'))
        }
    }

    return (
        <>
            <fieldset>
                <div className='stay-form'>
                    <div className='stayRoom-dropdown'>

                        <label htmlFor="stayRooms" >Stay Category:</label>
                        <select value={stayRoomSelect} name="stayRooms" onChange={handleDropdownChange}>
                            <option selected>Please Select A Room</option>
                            {stayRoomList.map(c => (

                                <option
                                    htmlFor={c.fullName}
                                    key={c.id
                                        * Math.random()
                                    }
                                    value={c.id}
                                    onSelect={handleControlledInputChange}
                                >
                                    {c.fullName}
                                </option>
                            ))
                            }
                        </select>
                    </div>

                    {/* <form action="">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required className='form-control' placeholder='Enter a title' defaultValue={stay.title} />
                        <label htmlFor="imageLocation">Optional Image URL:</label>
                        <input type="text" id="imageLocation" onChange={handleControlledInputChange} className='form-control' placeholder='Image URL (optional)' defaultValue={stay.imageLocation} />
                        <label htmlFor="description">Description:</label>
                        <textarea type="text" id="description" onChange={handleControlledInputChange} required className='form-control' placeholder="Write stuff here..." rows="3" defaultValue={stay.description} />
                    </form> */}
                </div>
            </fieldset>
            {!stayRoomCheck &&
                <>
                    <p><strong>Select An Empty Room!</strong></p>
                </>
            }
            {stayRoomCheck &&
                <div className='save-button'>
                    <button className='btn open' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>Add Stay</button>
                </div>
            }
        </>
    )

};

export default StayForm;