
import { useAppData } from '../../context/AppContext';
import Cookies from "js-cookie";
import Info from './Info';
import { notification, Spin } from 'antd';
import Skills from './Skills';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { User } from '../../components/types';
import { useParams } from 'react-router-dom';
const user_service = import.meta.env.VITE_USER_SERVICE;

const Account = () => {
    const { isAuth, user, loading } = useAppData();
    const { id } = useParams()
    const [loadingUserById, setLoadingUserById] = useState(false);
    const [userById, setUserById] = useState<User | null>(null);

    const token = Cookies.get('token');

    const fetchUserById = async () => {
        try {
            setLoadingUserById(true);
            const { data } = await axios.get(`${user_service}/api/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setUserById(data);
        } catch (error) {
            notification.error({ message: 'Failed to fetch user data. Please login again.' });
        } finally {
            setLoadingUserById(false);
        }
    }


    useEffect(() => {
        if (id)
            fetchUserById();
    }, [id]);

    return (
        <Spin spinning={loading}>
            {/* {user && <div style={{ width: '90%', margin: 'auto' }}>
                <Info user={user} isYourAccount={true} />
                {user.role === 'jobseeker' && <Skills user={user} isYourAccount={true} />}
            </div>} */}

            {id ? <>{userById && <div style={{ width: '90%', margin: 'auto' }}>
                <Info user={userById} isYourAccount={false} />
                {userById.role === 'jobseeker' && <Skills user={userById} isYourAccount={false} />}
            </div>}</> : <>{user && <div style={{ width: '90%', margin: 'auto' }}>
                <Info user={user} isYourAccount={true} />
                {user.role === 'jobseeker' && <Skills user={user} isYourAccount={true} />}
            </div>} </>}
        </Spin>
    )
}

export default Account