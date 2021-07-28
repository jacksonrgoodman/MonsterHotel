import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/UserProfile';
export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getAllActiveProfiles = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getAllUserProfilesDeactive = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Deactivated`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getCurrentUserType = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/GetCurrentUserType`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
    )
};