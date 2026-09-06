import { Button, Flex, Form, Input, Layout, notification, Card, Typography, Image, Divider, Space, Select, Upload, message, type UploadProps } from 'antd';

import {
    MailOutlined,
    ArrowRightOutlined,
    LockOutlined,
    UploadOutlined,
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

export default function Register() {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('');
    const { isAuth, setIsAuth, setUser } = useAppData();
    const navigate = useNavigate();

    const uploadProps: UploadProps = {
        accept: ".pdf,application/pdf",
        maxCount: 1,

        beforeUpload: (file) => {
            const isPdf = file.type === "application/pdf";

            if (!isPdf) {
                message.error("You can only upload PDF files!");
                return Upload.LIST_IGNORE;
            }

            const isLt5MB = file.size / 1024 / 1024 < 5;

            if (!isLt5MB) {
                message.error("PDF must be smaller than 5MB!");
                return Upload.LIST_IGNORE;
            }

            // Prevent automatic upload
            return false;
        },

        onRemove: () => {
            form.setFieldValue("resume", undefined);
        },
    };

    // const onFinish = async (values: any) => {

    //     try {
    //         setLoading(true);
    //         const { data } = await axios.post(`${auth_service}/api/auth/register`, values);
    //         notification.success({ message: data?.message || 'Sign Up Successfully', placement: 'top' })
    //         Cookies.set('token', data.token, {
    //             expires: 15,
    //             secure: true,
    //             path: '/'
    //         })
    //         setUser(data.registeredUser);
    //         setIsAuth(true)
    //         navigate('/');
    //     } catch (error: any) {
    //         notification.error({ message: error?.response?.data?.message || 'Failed to sign up' })
    //         setIsAuth(false)
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    const onFinish = async (values: any) => {
        try {
            setLoading(true);

            const formData = new FormData();
           
            formData.append("role", values.role);
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("password", values.password);

            if(values.role==='jobseeker'){
            formData.append("bio", values.bio);
            const resumeFile = values.resume?.[0]?.originFileObj;
            formData.append("file", resumeFile, resumeFile.name);
            }

            const { data } = await axios.post(`${auth_service}/api/auth/register`, formData);

            notification.success({ message: data?.message || "Sign Up Successfully", placement: "top" });

            Cookies.set("token", data.token, { expires: 15, secure: true, path: "/" });

            setUser(data.registeredUser);
            setIsAuth(true);
            navigate("/");
        } catch (error: any) {
            console.error("Registration error:", error);
            notification.error({ message: error?.response?.data?.message || "Failed to sign up", placement: "top" });
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    };

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
                        Register youself to continue your journey
                    </Text>
                </Flex>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item name='role' label='I Want To'>
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select Your Wish"
                            onSelect={(v) => setRole(v)}
                            onClear={() => setRole('')}
                            options={[
                                { value: 'jobseeker', label: 'Find Job' },
                                { value: 'recruiter', label: 'Hire Talent' },

                            ]}
                        />

                    </Form.Item>
                    {role && <>
                        <Form.Item
                            name="name"
                            label={
                                <span style={{ color: "#fff" }}>
                                    Full Name
                                </span>
                            }
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="Enter Your Name" size='large' />
                        </Form.Item>

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
                            name="phoneNumber"
                            label={
                                <span style={{ color: "#fff" }}>
                                    Phone Number
                                </span>
                            }
                            rules={[{ required: true, message: 'Phone is required' }]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="Enter Your  Phone No." size='large' />
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

                        {role === 'jobseeker' &&
                            <>
                                <Form.Item
                                    label="Resume (PDF)"
                                    name="resume"
                                    rules={[{ required: true, message: "Please upload your resume!" }]}
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => {
                                        if (Array.isArray(e)) {
                                            return e;
                                        }

                                        return e?.fileList;
                                    }}
                                >
                                    <Upload {...uploadProps} listType='picture' style={{ backgroundColor: 'white' }}>
                                        <Button icon={<UploadOutlined />} >
                                            Upload
                                        </Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    label="Bio"
                                    name="bio"
                                >
                                    <Input.TextArea rows={2} placeholder='Tell us about yourself...'></Input.TextArea>

                                </Form.Item>
                            </>
                        }


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
                                    ? "Signing Up..."
                                    : "Sign Up"}
                            </Button>
                        </Form.Item>
                    </>
                    }
                </Form>

                <Flex justify='center' align='center' gap={4} style={{ padding: 8, fontSize: 16 }} wrap>
                    <Text style={{ color: 'white' }}>Already have an account ? </Text>
                    <Link to='/login'>Login</Link>
                </Flex>
            </Card>
        </Flex>
    </Content>
    </Layout>
    )
}
