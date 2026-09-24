import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, notification, Upload, type UploadFile, type UploadProps } from "antd";
import type { Company, User } from "../../components/types";
import { ArrowRightOutlined, BankOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";

const job_service = import.meta.env.VITE_JOB_SERVICE;

interface CompanyModalProps {
    isCompanyModalOpen: boolean;
    setIsCompanyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: User | null;
    fetChCompany: () => Promise<void>;
    selectedCompany: Company | null;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
    isCompanyModalOpen,
    setIsCompanyModalOpen,
    fetChCompany,
    user,
    selectedCompany
}) => {
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');

    const uploadProps: UploadProps = {
        accept: ".pdf,application/pdf",
        maxCount: 1,

        beforeUpload: (file: File) => {
            const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp";
            if (!isImage) {
                message.error("You can only upload images!");
                return Upload.LIST_IGNORE;
            }
            const isLt5MB = file.size / 1024 / 1024 < 5;

            if (!isLt5MB) {
                message.error("Image must be smaller than 5MB!");
                return Upload.LIST_IGNORE;
            }

            return false;
        }
        ,

        onRemove: () => {
            form.setFieldValue("logo", undefined);
        },
    };



    const existingResumeUrl = 'https://res.cloudinary.com/dkqxunpgd/image/upload/v1788710899/itbf3ct3iribd2mmxohk.pdf'
    useEffect(() => {
        if (isCompanyModalOpen && user) {
            // form.setFieldsValue({
            //     name: user.name,
            //     email: user.email,
            //     phone_number: user.phone_number,
            //     bio: user.bio,
            //     resume: [
            //         {
            //             uid: "-1",
            //             name: "logo",
            //             status: "done",
            //             url: existingResumeUrl,
            //         },
            //     ],

            // });
        }
    }, [isCompanyModalOpen, user, form]);



    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("website", values.website);
            const logo = values.logo?.[0]?.originFileObj;
            formData.append("file", logo, logo.name);
            const { data } = await axios.post(`${job_service}/api/job/company/new`, formData, { headers: { Authorization: `Bearer ${token}` } });
            notification.success({ message: data?.message || "Company details saved Successfully", placement: "top" });
            fetChCompany()
            setIsCompanyModalOpen(false)
        } catch (error: any) {
            console.error("Registration error:", error);
            notification.error({ message: error?.response?.data?.message || "Failed to save company details", placement: "top" });

        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="My Company"
            open={isCompanyModalOpen}
            onCancel={() => setIsCompanyModalOpen(false)}
            destroyOnHidden
            maskClosable={false}
            footer={false}
        >
            <Card
                size="small"
                style={{
                    width: "100%",
                    background: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: 8,
                    padding: 16,
                }}
                styles={{ body: { padding: 0 } }}
            >


                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}

                >

                    <Form.Item
                        name="name"
                        label={
                            <span style={{ color: "#fff" }}>
                                Company Name
                            </span>
                        }
                        rules={[{ required: true, message: 'Company name is required' }]}
                    >
                        <Input prefix={<BankOutlined />} placeholder="Enter Company Name" size='large' />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={
                            <span style={{ color: "#fff" }}>
                                Description
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Description is required",
                            }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter Company Description"
                            size="large"
                            rows={2}
                        />
                    </Form.Item>

                    <Form.Item
                        name="website"
                        label={
                            <span style={{ color: "#fff" }}>
                                Website
                            </span>
                        }
                        rules={[{ required: true, message: 'Phone is required' }]}
                    >
                        <Input prefix={<GlobalOutlined rotate={90} />} placeholder="Enter Website URL" size='large' />
                    </Form.Item>

                    <Form.Item
                        label="Logo"
                        name="logo"
                        rules={[{ required: true, message: "Please Upload Company Logo !" }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }

                            return e?.fileList;
                        }}
                    >
                        <Upload {...uploadProps} listType='picture' style={{ backgroundColor: 'white' }}>
                            <Button icon={<UploadOutlined />} style={{ margin: 4 }}>
                                Upload
                            </Button>
                        </Upload>

                    </Form.Item>


                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            block
                            size="large"
                            loading={loading}
                            style={{ marginTop: 8 }}
                        // icon={!loading ? <ArrowRightOutlined /> : null}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Company"}
                        </Button>
                    </Form.Item>


                </Form>

            </Card>
        </Modal>
    );
};

export default CompanyModal;
