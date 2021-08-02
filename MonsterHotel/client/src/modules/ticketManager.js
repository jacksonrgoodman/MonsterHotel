import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from './authManager'

const baseUrl = '/api/Ticket';

export const getTickets = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getDeactivatedTickets = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Deactivated`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const getIssueTickets = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Issues`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()));
};
export const addTicket = (ticket) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
    });
};
export const ActivateTicket = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Activate/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
export const OpenTicket = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Open/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
export const CloseTicket = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Close/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
export const IssueTicket = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/IssueTicket/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
export const DeactivateTicket = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //.then((res) => res.json())
    );
}
