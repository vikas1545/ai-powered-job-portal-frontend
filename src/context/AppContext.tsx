import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { notification } from "antd";
import type { AppContextType, AppProviderProps, User } from "../components/types";
import Loading from "../components/Loading";
const user_service = import.meta.env.VITE_USER_SERVICE;









const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [btnLoading, setBtnLoading] = useState<boolean>(true);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    //const token = Cookies.get('token');


    const logOut = async () => {
        Cookies.remove('token');
        setUser(null)
        setIsAuth(false)
        notification.success({ message: 'Logged Out successfully' });
    }


    const fetchUser = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('token');
            const { data } = await axios.get(`${user_service}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } });
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            notification.error({ message: 'Failed to fetch user data. Please login again.' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <Loading />
    }

    return <AppContext.Provider value={{ user, setUser, loading, setLoading, isAuth, setIsAuth, btnLoading, setBtnLoading, logOut }}>
        {children}
    </AppContext.Provider>
}



export const useAppData = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within AppProvider");
    }
    return context;
}