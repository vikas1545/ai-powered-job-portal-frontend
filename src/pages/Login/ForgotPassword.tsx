import { ArrowRightOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const auth_service = import.meta.env.VITE_AUTH_SERVICE;

function ForgotPassword() {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${auth_service}/api/auth/forgot`, values);
            notification.success({ message: data?.message || 'Reset link sent on this email', placement: 'top' })
            navigate('/');
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to update password' })
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

                    <Form.Item >
                        <Button
                            htmlType="submit"
                            type="primary"
                            block
                            size="large"
                            loading={loading}
                            style={{ marginTop: 8 }}
                            icon={!loading ? <ArrowRightOutlined style={{ color: 'white' }} /> : null}
                        >Submit
                        </Button>
                    </Form.Item>

                    <Flex justify='end' align='end' style={{ fontSize: 16 }}>
                        <Link to='/login'>Go to login</Link>
                    </Flex>
                </Form>

            </Card>
        </Flex></Content></Layout>
    )
}

export default ForgotPassword