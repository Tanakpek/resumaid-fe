

import { ClientUserData } from "@/lib/types/auth";
import  { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState(null);
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
