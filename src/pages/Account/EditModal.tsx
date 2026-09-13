import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, Upload, type UploadFile, type UploadProps } from "antd";
import type { User } from "../../components/types";
import { ArrowRightOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";



interface EditModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (isEditModalOpen: boolean) => void,
    user: User
}

const EditModal: React.FC<EditModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    user
}) => {
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = useState(false);

    const existingResumeUrl = 'https://res.cloudinary.com/dkqxunpgd/image/upload/v1788710899/itbf3ct3iribd2mmxohk.pdf'
    useEffect(() => {
        if (isEditModalOpen && user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                bio: user.bio,
                resume: [
                    {
                        uid: "-1",
                        name: "Current Resume.pdf",
                        status: "done",
                        url: existingResumeUrl,
                    },
                ],

            });
        }
    }, [isEditModalOpen, user, form]);



    const handleSubmit = async (values: any) => {

        try {

            const formData = new FormData()
            const resumeFile = values.resume?.[0];
            if (resumeFile?.originFileObj) {
                // New PDF selected
                formData.append("resume", resumeFile.originFileObj);
            } else if (resumeFile?.url) {
                // Existing PDF — user did not replace it
                console.log("Keep existing resume:", resumeFile.url);
            }

        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

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

            return false;
        },

        onRemove: () => {
            form.setFieldValue("resume", undefined);
        },
    };


    return (
        <Modal
            title="Edit User"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
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
                    onFinish={handleSubmit}

                >

                    <Form.Item
                        name="name"
                        label={
                            <span style={{ color: "#fff" }}>
                                Full Name
                            </span>
                        }
                        rules={[{ required: true, message: 'Name is required' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Enter Your Name" size='large' />
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
                        name="phone_number"
                        label={
                            <span style={{ color: "#fff" }}>
                                Phone Number
                            </span>
                        }
                        rules={[{ required: true, message: 'Phone is required' }]}
                    >
                        <Input prefix={<PhoneOutlined rotate={90} />} placeholder="Enter Your  Phone No." size='large' />
                    </Form.Item>

                    {user?.role !== 'jobseeker' &&
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
                                    <Button icon={<UploadOutlined />} style={{ margin: 4 }}>
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
                                ? "Updating..."
                                : "Update"}
                        </Button>
                    </Form.Item>


                </Form>

            </Card>
        </Modal>
    );
};

export default EditModal;
