import React, { useState, createContext, useContext, useEffect } from 'react';

type TAuthContext = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);
const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuthContext };
export type { TAuthContext };