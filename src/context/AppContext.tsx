import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { notification } from "antd";
import type { AppContextType, AppProviderProps, User } from "../components/types";

const user_service = import.meta.env.VITE_USER_SERVICE;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const token = Cookies.get('token');

    const logOut = async () => {
        Cookies.remove('token');
        setUser(null)
        setIsAuth(false)
        notification.success({ message: 'Logged Out successfully' });
    }

    const updateProfilePic = async (formData: any) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${user_service}/api/user/update/pic`, formData, { headers: { Authorization: `Bearer ${token}` } });

            notification.success({ message: 'Profile pic updated' })
            fetchUser()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to update profile pic' });
        } finally {
            setLoading(false);
        }
    }

    const resumeUpdate = async (formData: any) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${user_service}/api/user/update/resume`, formData, { headers: { Authorization: `Bearer ${token}` } });

            notification.success({ message: 'resume updated' })
            fetchUser()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to update resume' });
        } finally {
            setLoading(false);
        }
    }

    const resumeDelete = async (resume: string, publicId: string) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${user_service}/api/user/delete/resume/${publicId}`,
                { resume }, { headers: { Authorization: `Bearer ${token}` } });
            fetchUser()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to remove resume' });
        } finally {
            setLoading(false);
        }
    }

    const addSkills = async (skill: string) => {
        try {
            setBtnLoading(true);
            const { data } = await axios.post(`${user_service}/api/user/skill/add`, { skillName: skill }, { headers: { Authorization: `Bearer ${token}` } });
            notification.success({ message: data.message || 'Skills added' })
            await fetchUser()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to add skills' });
        } finally {
            setBtnLoading(false);
        }
    }

    const deleteSkill = async (skill: string) => {
        try {
            setBtnLoading(true);

            await axios.delete(`${user_service}/api/user/skill/delete`, {
                data: { skillName: skill },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchUser();
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message || 'Failed to remove skill',
            });
        } finally {
            setBtnLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            setLoading(true);
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


    return <AppContext.Provider value={{
        user, setUser, loading, setLoading, isAuth, setIsAuth, btnLoading, setBtnLoading, logOut, updateProfilePic,
        resumeUpdate, resumeDelete, addSkills,deleteSkill
    }}>
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