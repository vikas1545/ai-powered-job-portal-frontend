
import { Avatar, Breadcrumb, Button, Divider, Flex, Image, Layout, Menu, Popover, theme, Typography } from 'antd';
import IMAGE_LIST from '../components/images';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppContext';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography

//const isAuth = true;

const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const { isAuth, user, logOut } = useAppData()

    const currentYear = new Date().getFullYear();

    const items = [
        {
            key: 'Home',
            label: 'Home',
            onClick: () => navigate("/"),
        },
        {
            key: 'Jobs',
            label: 'Jobs',
        },
        {
            key: "About",
            label: "About",
            onClick: () => navigate("/about"),
        }
    ]
    const content = (
        <Flex vertical gap={4} align='baseline' justify='stretch'>
            <Flex vertical gap={2}>
                <Text strong>{user?.name}</Text>
                <Typography.Paragraph>{user?.email}</Typography.Paragraph>
            </Flex>
            <Divider size='small' style={{ marginTop: -10 }} />
            <Button block icon={<UserOutlined />}>My Profile</Button>
            <Button danger block icon={<LogoutOutlined />} onClick={logOut}>Logout</Button>
        </Flex>
    );

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', zIndex: 10 }}>
                <Image src={IMAGE_LIST.HireFastLogo} preview={false} style={{ backgroundColor: 'white' }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['Home']}
                    items={items}
                    style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}

                />
                <Flex align='center'>{isAuth ? <Popover content={content} trigger="hover" placement='leftBottom'>


                    {user?.profile_pic ? <Button size="large" shape="circle" style={{ padding: 0 }}>
                        <Avatar
                            size={60}
                            src={user.profile_pic}
                            alt="u"
                        />
                    </Button> : <Button size='large' shape='circle'>{user?.name?.charAt(0)?.toUpperCase()}</Button>}

                </Popover> : <Button size='large' icon={<LoginOutlined />} onClick={() => navigate('/login')}>Sign In</Button>}
                </Flex>
            </Header>

            <Content>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                // items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>HireFast ©{currentYear} Created by vikas</Footer>
        </Layout>
    );
};

export default MainLayout;