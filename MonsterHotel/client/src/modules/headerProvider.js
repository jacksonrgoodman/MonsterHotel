import React, { useEffect, useState, createContext } from 'react';
import { getCurrentProfile } from '../modules/userProfileManager';




export const headerContext = createContext()
export function HeaderProvider(props) {
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    const userIsCheckedIn = () => {
        getCurrentProfile().then((user) => {
            console.log("NAVBAR CHECK:", user)
            console.log("NAVBAR CHECK isCheckedIn:", user.isCheckedIn)
            if (user.isCheckedIn) {
                setIsCheckedIn(true);
            } else {
                setIsCheckedIn(false);
            }
        });
    };

    return (<headerContext.Provider value={{ userIsCheckedIn, setIsCheckedIn, isCheckedIn }}>{props.children}</headerContext.Provider>);
}