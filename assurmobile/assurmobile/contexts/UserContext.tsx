import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { storage } from '@/utils/storage';

type UserContextValue = {
    user: any;
    setUser: (user: any) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children?: any }): any => {
    const [user, setUserState] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = await storage.getItem('token');
                if (token) {
                    const decoded: any = jwtDecode(token);
                    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                        setUserState({ token, ...decoded });
                    } else {
                        await storage.deleteItem('token');
                    }
                }
            } catch (e) {
                console.error('Erreur restauration session:', e);
            } finally {
                setIsLoading(false);
            }
        };
        restoreSession();
    }, []);

    const setUser = async (data: any) => {
        if (data?.token) {
            await storage.setItem('token', data.token);
            const decoded: any = jwtDecode(data.token);
            setUserState({ token: data.token, ...decoded });
        }
    };

    const logout = async () => {
        await storage.deleteItem('token');
        setUserState(undefined);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useCurrentUser = () => useContext(UserContext);