import firebase from "firebase/app";
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
    // debugger
    return getToken().then((token) =>
        fetch(`${baseUrl}/Guest/${Id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};
export const getStaysByHandlerId = (Id) => {
    // debugger
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