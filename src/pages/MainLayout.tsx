
import { Breadcrumb, Button, Divider, Flex, Image, Layout, Menu, Popover, theme, Typography } from 'antd';
import IMAGE_LIST from '../components/images';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography

const isAuth = true;

const items = [
    {
        key: 'Home',
        label: 'Home',
    },
    {
        key: 'Jobs',
        label: 'Jobs',
    },
    {
        key: 'About',
        label: 'About',
    }
]

const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const currentYear = new Date().getFullYear();

    const content = (
        <Flex vertical gap={4} align='baseline' justify='stretch'>
            <Flex vertical gap={2}>
                <Text strong>Vikas kumar</Text>
                <Typography.Paragraph>vikaskumar.vk0612@gmail.com</Typography.Paragraph>
            </Flex>
            <Divider size='small' style={{ marginTop: -10 }} />
            <Button block icon={<UserOutlined />}>My Profile</Button>
            <Button danger block icon={<LogoutOutlined />}>Logout</Button>
        </Flex>
    );

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between',position:'fixed',width:'100%',zIndex:10 }}>
                <Image src={IMAGE_LIST.HireFastLogo} preview={false} style={{ backgroundColor: 'white' }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['Home']}
                    items={items}
                    style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}

                />
                <div>{isAuth ? <Popover content={content} trigger="hover" placement='leftBottom'>
                    <Button size='large' shape='circle'>V</Button>
                </Popover> : <Button size='large' icon={<LoginOutlined />}>Sign In</Button>}</div>
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
                    <Outlet/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>HireFast ©{currentYear} Created by vikas</Footer>
        </Layout>
    );
};

export default MainLayout;