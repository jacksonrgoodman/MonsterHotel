import React, { useEffect, useState } from 'react';
import { getAllTicketTypes } from '../../modules/ticketTypeManager';
import { addTicket } from '../../modules/ticketManager';
import { useHistory } from 'react-router-dom';
import { getCurrentProfile } from '../../modules/userProfileManager';

const TicketForm = () => {
    const [user, setUser] = useState([]);
    const [ticket, setTicket] = useState({
        tickeTypeId: "",
        title: "",
        description: "",
        imagUrl: "",
        CreateDateTime: "",
        userId: user.id,
        ticketStatusId: 1,
        isActive: true
    });
    const [ticketTypeSelect, setTicketTypeSelect] = useState('');
    const [ticketTypeList, setTicketTypeList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()
    const getUserId = () => {
        getCurrentProfile().then((user) => {
            setUser(user)
            console.log("TESTTESTTEST", user)
        });
    };

    //fetch list of all categories for dropdown
    useEffect(() => {
        getUserId()
        getAllTicketTypes()
            .then(res => {
                setTicketTypeList(res)
            })
    }, [])

    //Handle input changes and parse user ID
    const handleControlledInputChange = (e) => {
        let newTicket = { ...ticket };
        let selectedVal = e.target.value

        if (e.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        newTicket[e.target.id] = selectedVal
        setTicket(newTicket);
    };

    //Handle input changes and parse user ID
    const handleDropdownChange = (e) => {
        e.preventDefault()

        let selectedVal = e.target.value;
        setTicketTypeSelect(selectedVal);
    };

    //Takes new ticket entry and sends it to the DB
    const handleClickSaveEntry = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newTicket = { ...ticket };

        newTicket.ticketTypeId = ticketTypeSelect;
        if (ticketTypeSelect === '') {
            alert("Please select a Ticket Category")
        } else {
            addTicket(newTicket).then(() => history.push('/myTickets'))
        }
    }

    return (
        <>
            <fieldset>
                <div className='ticket-form'>
                    <div className='ticketType-dropdown'>

                        <label htmlFor="ticketTypes" >Ticket Category:</label>
                        <select value={ticketTypeSelect} name="ticketTypes" onChange={handleDropdownChange}>
                            <option selected>Please Select a Ticket Category</option>
                            {ticketTypeList.map(c => (
                                <option
                                    htmlFor={c.name}
                                    key={c.id * Math.random()}
                                    value={c.id}
                                    onSelect={handleControlledInputChange}
                                >
                                    {c.name}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                    <form action="">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required className='form-control' placeholder='Enter a title' defaultValue={ticket.title} />
                        <label htmlFor="imageLocation">Optional Image URL:</label>
                        <input type="text" id="imageLocation" onChange={handleControlledInputChange} className='form-control' placeholder='Image URL (optional)' defaultValue={ticket.imageLocation} />
                        <label htmlFor="description">Description:</label>
                        <textarea type="text" id="description" onChange={handleControlledInputChange} required className='form-control' placeholder="Write stuff here..." rows="3" defaultValue={ticket.description} />
                    </form>
                </div>
            </fieldset>
            <div className='save-button'>
                <button className='btn open' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>Add Ticket</button>
            </div>
        </>
    )

};

export default TicketForm;