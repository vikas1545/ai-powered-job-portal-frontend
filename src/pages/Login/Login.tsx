import { Button, Flex, Form, Input, Layout, notification, Card, Typography, Image, Divider, Space } from 'antd';

import {
  MailOutlined,
  ArrowRightOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useAppData } from '../../context/AppContext';
import IMAGE_LIST from '../../components/images';
const { Content } = Layout;
const auth_service = import.meta.env.VITE_AUTH_SERVICE;

export default function Login() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { isAuth, setIsAuth, setUser } = useAppData();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {

    try {
      setLoading(true);
      const { data } = await axios.post(`${auth_service}/api/auth/login`, values);
      notification.success({ message: data?.message || 'LoggedIn Successfully', placement: 'top' })
      Cookies.set('token', data.token, {
        expires: 15,
        secure: true,
        path: '/'
      })
      setUser(data.userObject);
      setIsAuth(true)
      navigate('/');
    } catch (error: any) {
      notification.error({ message: error?.response?.data?.message || 'Failed to log in' })
      setIsAuth(false);

    } finally {
      setLoading(false);
    }
  }


  // if (userLoading) {
  //   return <Loading />
  // }

  return (<Layout> <Content>
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
        background: "#111827",
        padding: 24,
        marginTop: '4%'
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 448,
          background: "#1f2937",
          border: "1px solid #374151",
          borderRadius: 8,
          padding: 16,
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Flex
          vertical
          align="center"
          style={{
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Flex
            justify="center"
            align="center"
            style={{
              marginBottom: 16,
            }}
          >
            <Image src={IMAGE_LIST.HireFastLogo} preview={false} style={{ backgroundColor: 'white' }} />
          </Flex>

          <Title
            level={1}
            style={{
              color: "#fff",
              margin: "0 0 12px",
              fontSize: 36,
            }}
          >
            Welcome to HireFast
          </Title>

          <Text
            style={{
              color: "#d1d5db",
              fontSize: 18,
            }}
          >
            Login to continue your journey
          </Text>
        </Flex>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label={
              <span style={{ color: "#fff" }}>
                Email Address
              </span>
            }
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Email"
              size="large"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span style={{ color: "#fff" }}>
                Password
              </span>
            }
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" size='large' />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              loading={loading}
              style={{ marginTop: 8 }}
              icon={!loading ? <ArrowRightOutlined /> : null}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <Flex justify='center' align='center' gap={4} style={{ padding: 8 ,fontSize:16}} wrap>
          <Text style={{ color: 'white' }}>Don't have an account ? </Text>
          <Link to='/register'>Create an account</Link>
          </Flex>
      </Card>
    </Flex>
  </Content>
  </Layout>
  )
}
