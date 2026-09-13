
import { useAppData } from '../../context/AppContext';
import Loading from '../../components/Loading';
import Info from './Info';
import { Spin } from 'antd';

const Account = () => {
    const { isAuth, user, loading } = useAppData();

    return (
        <Spin spinning={loading}>
            {user && <div style={{ width: '90%', margin: 'auto' }}>
                <Info user={user} isYourAccount={true} />
            </div>}
        </Spin>
    )
}

export default Account