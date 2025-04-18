import React, { useState, useEffect, createContext } from "react";
import { getToken, removeToken, setToken } from "../api/token";
import { useUser } from "../hooks/useUser";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
});

export function AuthProvider({ children }) {
    const {getMe} = useUser();
    const [auth, setAuth] = useState(undefined)
    useEffect(()=>{
        (async()=>{
            const token = getToken()
            if(token){
                const me = await getMe(token);
                setAuth({me,token})
            }else{
                setAuth(null)
            }
        })()
    },[]);
    const login = async(token) =>{
        setToken(token);
        const me = await getMe(token);
        setAuth({me,token})
    };
    const logout = () =>{
        if(auth){
            setAuth(null);
            removeToken();
        }
    }
    const valueContext = {
        auth,
        login,
        logout
    };

    if(auth === undefined) return null

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}