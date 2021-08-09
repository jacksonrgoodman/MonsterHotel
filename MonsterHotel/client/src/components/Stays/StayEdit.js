import React, { useEffect, useState } from "react";
import { editStay, getStayById } from "../../modules/stayManager";
import { Card, CardBody } from "reactstrap";
import { useParams, Link } from "react-router-dom";

import { useHistory } from 'react-router';

//Display all published stays
const EditStay = () => {
    const [stay, setStay] = useState({});
    const { id } = useParams();
    const history = useHistory();
    const [categorySelect, setCategorySelect] = useState('');
    const [categoryList, setCategoryList] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const fetchStays = () => {
        return getStayById(id).then(stay => setStay(stay));
    }

    //fetch list of all categories for dropdown
    //     useEffect(() => {
    //         getAllCategories()
    //             .then(res => {
    //         setCategoryList(res)
    //     })
    // }, [])

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
        setCategorySelect(selectedVal);
    };

    //Takes new stay entry and sends it to the DB
    const handleClickSaveEntry = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newStay = { ...stay };

        if (categorySelect === '') {
            newStay.categoryId = newStay.category.id;
        } else {
            newStay.categoryId = categorySelect;
        }
        editStay(newStay).then(() => history.push('/MyStays'))
    }

    useEffect(() => {
        fetchStays();
    }, []);

    return (
        <>
            <fieldset>
                <div className='stay-form'>
                    <div className='category-dropdown'>

                        <label htmlFor="categories" >Choose a Category</label>
                        <select value={categorySelect} name="categories" onChange={handleDropdownChange}>
                            <option defaultValue={stay?.category?.name} >{stay?.category?.name}</option>
                            {categoryList.map(c => (
                                <option
                                    htmlFor={c.name}
                                    key={c.id * Math.random()}
                                    value={c.id}
                                    selected={stay?.category?.name}
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
                <button className='btn open' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>Save Stay</button>
            </div>
        </>
    )
};

export default EditStay;