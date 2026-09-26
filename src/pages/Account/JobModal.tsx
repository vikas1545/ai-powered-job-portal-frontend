import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, InputNumber, message, Modal, notification, Row, Select, Switch, Upload, type UploadFile, type UploadProps } from "antd";
import type { Company, Job, User } from "../../components/types";
import { ArrowRightOutlined, BankOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const job_service = import.meta.env.VITE_JOB_SERVICE;

interface JobModalProps {
    isJobModalOpen: boolean;
    setIsJobModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    fetChSpecificCompany: () => Promise<void>;
    selectedJob: Job | null

}

const JobModal: React.FC<JobModalProps> = ({
    isJobModalOpen,
    setIsJobModalOpen,
    fetChSpecificCompany,
    selectedJob
}) => {
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');
    const { id } = useParams()

    useEffect(() => {
        if (selectedJob) {
            form.setFieldsValue(selectedJob)
        }
    }, [selectedJob])

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const payload = { ...values, company_id: id };

            const { data } = selectedJob
                ? await axios.put(`${job_service}/api/job/${selectedJob.job_id}`, payload, config)
                : await axios.post(`${job_service}/api/job/new`, payload, config);

            notification.success({ message: data?.message || "Job details saved Successfully", placement: "top" });
            await fetChSpecificCompany()
            setIsJobModalOpen(false)
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || "Failed To Save Job Details", placement: "top" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="My Company"
            open={isJobModalOpen}
            onCancel={() => setIsJobModalOpen(false)}
            destroyOnHidden
            maskClosable={false}
            footer={false}
        >
            <Card
                size="small"
                style={{
                    width: "100%",
                    // background: "#15181dde",
                    borderRadius: 8,
                    padding: 16,
                }}
                styles={{ body: { padding: 0 } }}
                variant="borderless"
            >

                <Form<Job>
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        {/* Title */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Job Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the job title",
                                    },
                                    {
                                        min: 3,
                                        message: "Job title must be at least 3 characters",
                                    },
                                ]}
                            >
                                <Input placeholder="e.g. Senior React Developer" />
                            </Form.Item>
                        </Col>

                        {/* Role */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the role",
                                    },
                                ]}
                            >
                                <Input placeholder="e.g. Software Engineer" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the job description",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Describe the job responsibilities, requirements, etc."
                            showCount
                            maxLength={5000}
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        {/* Salary */}
                        <Col xs={24} md={12}>
                            <Form.Item label="Salary" name="salary">
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    precision={2}
                                    placeholder="e.g. 75000"
                                />
                            </Form.Item>
                        </Col>

                        {/* Openings */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Openings"
                                name="openings"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter number of openings",
                                    },
                                    {
                                        type: "number",
                                        min: 1,
                                        message: "There must be at least 1 opening",
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={1}
                                    precision={0}
                                    placeholder="e.g. 2"
                                />
                            </Form.Item>
                        </Col>

                        {/* Location */}
                        <Col xs={24} md={12}>
                            <Form.Item label="Location" name="location">
                                <Input placeholder="e.g. New Delhi, India" />
                            </Form.Item>
                        </Col>

                        {/* Job Type */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Job Type"
                                name="job_type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select job type",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select job type"
                                    options={[
                                        {
                                            label: "Full-time",
                                            value: "Full-time",
                                        },
                                        {
                                            label: "Part-time",
                                            value: "Part-time",
                                        },
                                        {
                                            label: "Contract",
                                            value: "Contract",
                                        },
                                        {
                                            label: "Internship",
                                            value: "Internship",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        {/* Work Location */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Work Location"
                                name="work_location"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select work location",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select work location"
                                    options={[
                                        {
                                            label: "On-site",
                                            value: "On-site",
                                        },
                                        {
                                            label: "Remote",
                                            value: "Remote",
                                        },
                                        {
                                            label: "Hybrid",
                                            value: "Hybrid",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        {/* Active */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Status"
                                name="is_active"
                                valuePropName="checked"
                            >
                                <Switch
                                    checkedChildren="Active"
                                    unCheckedChildren="Inactive"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            Save Job
                        </Button>
                    </Form.Item>
                </Form>


            </Card>
        </Modal>
    );
};

export default JobModal;
