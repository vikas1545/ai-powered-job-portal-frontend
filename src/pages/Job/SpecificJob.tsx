
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from 'react'
import type { Job } from "../../components/types";
import { Card, Flex, notification, Space, Typography, Spin, Tag, Row, Col, Statistic, Button } from "antd";
import { useLocation, useParams } from "react-router-dom";
import {
    CheckCircleOutlined, CloseCircleOutlined, EnvironmentOutlined, FileTextOutlined,
    SolutionOutlined, UsergroupAddOutlined, WalletOutlined
} from "@ant-design/icons";
import { useAppData } from "../../context/AppContext";
import JobApplications from "./JobApplications";
const job_service = import.meta.env.VITE_JOB_SERVICE;

const cardBg = "#ffffff";
const textColor = "#1f2430";
const borderColor = "#eceef2";
const brandBlue = "#2f6fed";
const { Title, Paragraph, Text } = Typography;
const user_service = import.meta.env.VITE_USER_SERVICE;

const SpecificJob = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [isYourAccount, setIsYourAccount] = useState(false);
    const [job, setJob] = useState<Job | null>(null);
    const location = useLocation()
    const { isApplied = false } = location.state || {};
    const [markedApplied, setMarkedApplied] = useState(isApplied);

    const { id } = useParams()
    const token = Cookies.get('token');
    const { user, loading } = useAppData();

    const fetChSpecificJob = async () => {
        try {
            setLoadingData(true)
            const { data } = await axios.get(`${job_service}/api/job/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (data?.posted_by_recruiter_id === user?.user_id && user?.role === 'recruiter') {
                setIsYourAccount(true)
            }
            setJob(data)

        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || '' });
        }
        finally {
            setLoadingData(false)
        }
    }


    useEffect(() => {
        if (id && user)
            fetChSpecificJob()
    }, [id, user])


    const applyJob = async (job_id: number) => {
        try {
            setLoadingData(true);
            const { data } = await axios.post(`${user_service}/api/user/apply/job`, { job_id }, { headers: { Authorization: `Bearer ${token}` } });
            notification.success({ message: data.message || 'You have applied for job successfully' })
            setMarkedApplied(true)
            fetChSpecificJob()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to apply for job' });
        } finally {
            setLoadingData(false)
        }
    }


    return (
        <div>
            <Spin spinning={loadingData || loading}>

                <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
                    <Card
                        style={{
                            width: "100%",
                            maxWidth: 720,
                            overflow: "hidden",
                            borderColor,
                        }}

                        styles={{ body: { padding: 0 } }}
                    >

                        <div
                            style={{
                                height: 120,
                                width: "100%",
                                background: `linear-gradient(135deg, ${brandBlue}, #1d4ed8)`,
                                position: "relative",
                                padding: 12
                            }}
                        >

                            <div >{job?.is_active ? <Tag color='green' icon={<CheckCircleOutlined />}>Active</Tag>
                                : <Tag color='red' icon={<CloseCircleOutlined />}>In Active</Tag>
                            }
                            </div>

                            <div style={{ marginTop: 16, marginBottom: 24 }}>
                                <Flex justify="space-between" gap={8} align="center">
                                    <Title level={2} style={{ margin: 0, color: cardBg }}>
                                        {job?.title}
                                    </Title>

                                    {(user && user.role === 'jobseeker' && job?.is_active) &&
                                        <> {markedApplied ? <Tag icon={<CheckCircleOutlined />}
                                            color='green' style={{ paddingTop: 5, fontWeight: 500, cursor: 'not-allowed' }}>Already Applied</Tag>
                                            : <Button icon={<SolutionOutlined />} type='dashed'
                                                onClick={() => applyJob(job.job_id)}>Easy Apply</Button>
                                        }
                                        </>}
                                </Flex>
                            </div>

                        </div>

                        <Row gutter={[8, 8]} style={{ padding: 8, marginTop: 8 }} justify='space-between'>
                            <Col xs={24} sm={12} md={8} >
                                <Card size="small">
                                    <Statistic
                                        title="Location"
                                        value={job?.location || '-'}
                                        prefix={<EnvironmentOutlined size={15} />}
                                    />
                                </Card>
                            </Col>

                            <Col xs={12} sm={12} md={8} >
                                <Card size="small">
                                    <Statistic
                                        title="Salary"
                                        value={job?.salary || '-'}
                                        prefix={<WalletOutlined />}
                                    />
                                </Card>
                            </Col>

                            <Col xs={12} sm={12} md={8} >

                                <Card size="small">
                                    <Statistic
                                        title="Openings"
                                        value={job?.openings || '-'}
                                        prefix={<UsergroupAddOutlined />}
                                    />
                                </Card>
                            </Col>
                        </Row>


                        <div style={{ padding: 8, marginBottom: 8 }}>
                            <Card
                                size="small"
                            >
                                <Space size={8} style={{ marginBottom: 8 }}>
                                    <FileTextOutlined size={16} color={textColor} />
                                    <Text strong style={{ color: textColor, fontSize: 15 }}>
                                        Job Description
                                    </Text>
                                </Space>
                                <Paragraph style={{ margin: 0, color: textColor }}>
                                    {job?.description ? job.description : "No description yet."}
                                </Paragraph>
                            </Card>

                        </div>
                    </Card>
                </div>
            </Spin>

            {isYourAccount && user?.role === 'recruiter' && job &&
                user.user_id === job.posted_by_recruiter_id && (
                    <JobApplications
                        user={user}
                        job_id={job.job_id}
                    />
                )}
        </div>
    );

}

export default SpecificJob;