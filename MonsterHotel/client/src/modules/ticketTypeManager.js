
import "firebase/auth";
import { getToken } from './authManager'

const baseUrl = '/api/TicketType';

export const getAllTicketTypes = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};