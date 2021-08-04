
import "firebase/auth";
import { getToken } from './authManager'

const baseUrl = '/api/Room';

export const getAllRooms = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};