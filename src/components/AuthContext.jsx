import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [authUser, setAuthUser] =  useState(null);

    const authLogin = (data) => {
        setAuthUser(data)
    }

    const authLogout = () => {
        setAuthUser(null)
    }

    return (
        <AuthContext.Provider value={{authUser, authLogin, authLogout}}>
            {children}
        </AuthContext.Provider>
    )

}
