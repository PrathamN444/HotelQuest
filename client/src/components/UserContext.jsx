import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if(!user){
            axios.get("/profile").then(({data}) => {
                setUser(data);
                setReady(true);
            });
        }
    }, [])
    // console.log(user);

    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};