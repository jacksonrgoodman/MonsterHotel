import React, { useEffect, useState } from 'react';
import { getAllTicketTypes } from '../../modules/ticketTypeManager';
import { addStay } from '../../modules/stayManager';
import { useHistory } from 'react-router-dom';

const StayForm = () => {
    const [stay, setStay] = useState({});
    const [ticketTypeSelect, setTicketTypeSelect] = useState('');
    const [ticketTypeList, setTicketTypeList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()


    //fetch list of all categories for dropdown
    useEffect(() => {
        getAllTicketTypes()
            .then(res => {
                setTicketTypeList(res)
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
        setTicketTypeSelect(selectedVal);
    };

    //Takes new stay entry and sends it to the DB
    const handleClickSaveEntry = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newStay = { ...stay };

        newStay.ticketTypeId = ticketTypeSelect;
        if (ticketTypeSelect === '') {
            alert("Please select a Ticket Category")
        } else {
            addStay(newStay).then(() => history.push('/myStays'))
        }
    }

    return (
        <>
            <fieldset>
                <div className='stay-form'>
                    <div className='ticketType-dropdown'>

                        <label htmlFor="categories" >Choose a Category</label>
                        <select value={ticketTypeSelect} name="categories" onChange={handleDropdownChange}>
                            <option value={ticketTypeSelect} selected>Please Select a Ticket Category</option>
                            {ticketTypeList.map(c => (
                                <option
                                    htmlFor={c.name}
                                    key={c.id * Math.random()}
                                    value={c.id}
                                // onSelect={ handleControlledInputChange }
                                >
                                    {c.name}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                    <form action="">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required className='form-control' placeholder='Enter a title' defaultValue={stay.title} />
                        <label htmlFor="imageLocation">Image URL:</label>
                        <input type="text" id="imageLocation" onChange={handleControlledInputChange} className='form-control' placeholder='Image URL (optional)' defaultValue={stay.imageLocation} />
                        <label htmlFor="content">Content:</label>
                        <textarea type="text" id="content" onChange={handleControlledInputChange} required className='form-control' placeholder="Write stuff here..." rows="3" defaultValue={stay.content} />
                    </form>
                </div>
            </fieldset>
            <div className='save-button'>
                <button className='btn' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>Save Stay</button>
            </div>
        </>
    )

};

export default StayForm;