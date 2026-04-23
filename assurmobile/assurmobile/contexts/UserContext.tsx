import { createContext, useContext, useState } from "react";

type UserContextValue = {
    user: any;
    setUser: (user: any) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children?: any }): any => {
    const [user, setUser] = useState<any>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useCurrentUser = () => useContext(UserContext);