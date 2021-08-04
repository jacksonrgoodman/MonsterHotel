// import React, { useEffect, useState } from "react";
// import { editTicket, getTicketById } from "../../modules/ticketManager";
// import { Card, CardBody } from "reactstrap";
// import { useParams, Link } from "react-router-dom";
// import { dateFixer } from "../../modules/helpers";
// import { useHistory } from 'react-router';
// import { getAllTicketTypes } from "../../modules/ticketTypeManager";

// //Display all published tickets
// const EditTicket = () => {
//     const [ticket, setTicket] = useState({});
//     const { id } = useParams();
//     const history = useHistory();
//     const [ticketTypeSelect, setTicketTypeSelect] = useState('');
//     const [ticketTypeList, setTicketTypeList] = useState([])
//     const [isLoading, setIsLoading] = useState(false);


//     const fetchTickets = () => {
//         return getTicketById(id).then(ticket => setTicket(ticket));
//     }

//     //fetch list of all categories for dropdown
//     useEffect(() => {
//         getAllTicketTypes()
//             .then(res => {
//                 setTicketTypeList(res)
//             })
//     }, [])

//     //Handle input changes and parse user ID
//     const handleControlledInputChange = (e) => {
//         let newTicket = { ...ticket };
//         let selectedVal = e.target.value

//         if (e.target.id.includes('Id')) {
//             selectedVal = parseInt(selectedVal)
//         }

//         newTicket[e.target.id] = selectedVal
//         setTicket(newTicket);
//     };

//     //Handle input changes and parse user ID
//     const handleDropdownChange = (e) => {
//         e.preventDefault()

//         let selectedVal = e.target.value;
//         setTicketTypeSelect(selectedVal);
//     };

//     //Takes new ticket entry and sends it to the DB
//     const handleClickSaveEntry = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         let newTicket = { ...ticket };

//         if (ticketTypeSelect === '') {
//             newTicket.ticketTypeId = newTicket.ticketType.id;
//         } else {
//             newTicket.ticketTypeId = ticketTypeSelect;
//         }
//         editTicket(newTicket).then(() => history.push('/MyTickets'))
//     }

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     return (
//         <>
//             <fieldset>
//                 <div className='ticket-form'>
//                     <div className='ticketType-dropdown'>

//                         <label htmlFor="categories" >Choose a TicketType</label>
//                         <select value={ticketTypeSelect} name="categories" onChange={handleDropdownChange}>
//                             <option defaultValue={ticket?.ticketType?.name} >{ticket?.ticketType?.name}</option>
//                             {ticketTypeList.map(c => (
//                                 <option
//                                     htmlFor={c.name}
//                                     key={c.id * Math.random()}
//                                     value={c.id}
//                                     selected={ticket?.ticketType?.name}
//                                 >
//                                     {c.name}
//                                 </option>
//                             ))
//                             }
//                         </select>
//                     </div>
//                     <form action="">
//                         <label htmlFor="title">Title:</label>
//                         <input type="text" id="title" onChange={handleControlledInputChange} required className='form-control' placeholder='Enter a title' defaultValue={ticket.title} />
//                         <label htmlFor="imageLocation">Image URL:</label>
//                         <input type="text" id="imageLocation" onChange={handleControlledInputChange} className='form-control' placeholder='Image URL (optional)' defaultValue={ticket.imageLocation} />
//                         <label htmlFor="content">Content:</label>
//                         <textarea type="text" id="content" onChange={handleControlledInputChange} required className='form-control' placeholder="Write stuff here..." rows="3" defaultValue={ticket.content} />
//                     </form>
//                 </div>
//             </fieldset>
//             <div className='save-button'>
//                 <button className='btn' type='button' disabled={isLoading} variant='primary' onClick={handleClickSaveEntry}>Save Ticket</button>
//             </div>
//         </>
//     )
// };

// export default EditTicket;