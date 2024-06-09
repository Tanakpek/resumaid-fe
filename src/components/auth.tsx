

import { ClientUserData } from "@/lib/types/auth";
import  { useState, createContext, useContext, useEffect } from "react";
import dotenv from 'dotenv';

import   { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
import {verify} from 'jsonwebtoken';

const AuthContext = createContext(null);

export const AuthProvider = ({ children } : any) => {
    

    const [user, setUser] = useState(null);
    const handleOauthLogin = async (token:any) => {
        const resp = await fetch('http://127.0.0.1:3000/login/oauth/', 
        {
            'method': 'POST', 
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.credential,
            }, 
            'body': JSON.stringify({'token': token })
        })
        console.log(resp)
    
    }

    const login = (user: ClientUserData) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        
        <AuthContext.Provider value={{ user, login, logout } as any} >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
}
