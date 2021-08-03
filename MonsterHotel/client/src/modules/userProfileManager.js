import "firebase/auth";
import { getToken } from './authManager'

const baseUrl = '/api/UserProfile';


export const getAllActiveProfiles = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getAllGuests = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Guests`, {
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
export const getCurrentProfile = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/GetCurrentUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
    )
};
export const CheckInUser = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/CheckIn/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
export const CheckOutUser = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/CheckOut/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
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