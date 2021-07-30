import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/Stay';
export const getToken = () => firebase.auth().currentUser.getIdToken();

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
    debugger
    return getToken().then((token) =>
        fetch(`${baseUrl}/Guest/${Id}`, {
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