
import "firebase/auth";
import { getToken } from './authManager'

const baseUrl = '/api/Stay';


export const getAllActiveStays = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/CurrentStays`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getStayById = (Id) => {

    return getToken().then((token) =>
        fetch(`${baseUrl}/Guest/${Id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};
export const checkByRoomId = (Id) => {

    return getToken().then((token) =>
        fetch(`${baseUrl}/Room/${Id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};
export const getStaysByHandlerId = (Id) => {

    return getToken().then((token) =>
        fetch(`${baseUrl}/Handler/${Id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};
export const getAllStays = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getAllStaysDeactive = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Deactivated`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};

export const addStay = (stay) => {

    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stay)
        })
    });
};
export const CheckIn = (stay) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/CheckIn/${stay.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stay)
        })
    })
}
export const CheckOut = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/CheckOut/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
    })
}