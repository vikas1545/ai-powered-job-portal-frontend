import { ArrowRightOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const auth_service = import.meta.env.VITE_AUTH_SERVICE;

function ResetPassword() {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams()

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${auth_service}/api/auth/reset/${token}`, values);
            notification.success({ message: data?.message || 'Password reset successfully', placement: 'top' })
            navigate('/login');
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to reset password' })
        } finally {
            setLoading(false);
        }
    }


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

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        label={
                            <span style={{ color: "#fff" }}>
                                Password
                            </span>
                        }
                        rules={[{ required: true, message: 'Password is required' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" size='large' minLength={4} />
                    </Form.Item>

                    <Form.Item >
                        <Button
                            htmlType="submit"
                            type="primary"
                            block
                            size="large"
                            loading={loading}
                            style={{ marginTop: 8 }}
                            icon={!loading ? <ArrowRightOutlined style={{ color: 'white' }} /> : null}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </Flex></Content></Layout>
    )
}

export default ResetPassword