import { useEffect, useState } from "react";
import type { Application, JobApplicationProps } from "../../components/types"
import { Button, Card, Flex, notification, Select, Space, Spin, Tag, Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const user_service = import.meta.env.VITE_USER_SERVICE;
const VITE_JOB_SERVICE = import.meta.env.VITE_JOB_SERVICE;

const { Title } = Typography;

const textColor = "#1f2430";
const subText = "#8c8c8c";
const borderColor = "#eceef2";
const colorMatch = {
    'Submitted': 'gold',
    'Hired': 'green',
    'Rejected': '#f50'
}

const JobApplications: React.FC<JobApplicationProps> = ({ user, job_id }) => {

    const [loadingData, setLoadingData] = useState(false);
    const [applications, setApplications] = useState<Application[]>([]);
    const [filterStatus, setFilterStatus] = useState('All');

    const token = Cookies.get('token');

    const fetchApplications = async () => {
        try {
            setLoadingData(true);
            const { data } = await axios.get(`${VITE_JOB_SERVICE}/api/job/application/${job_id}`,
                { headers: { Authorization: `Bearer ${token}` } });
            setApplications(data)
        } catch (error) {
            notification.error({ message: 'Failed to fetch job applications.' });
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [user, job_id])


    const updateApplication = async (status: string, applicationId: number) => {
        try {
            setLoadingData(true);
            const { data } = await axios.put(`${VITE_JOB_SERVICE}/api/job/application/${applicationId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } });
            notification.success({ message: data?.message || 'Job Application Status Changed' })
            fetchApplications()
        } catch (error) {
            notification.error({ message: 'Failed to update job application status' });
        } finally {
            setLoadingData(false);
        }
    }

    const filteredApplications = filterStatus === 'All' ? applications :
        applications.filter((app) => app.status === filterStatus)

    return (
        <Spin spinning={loadingData}>
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
                <Card
                    style={{
                        width: "100%",
                        maxWidth: 720,
                        overflow: "hidden",
                        borderColor,
                    }}

                    styles={{ body: { padding: '0px 8px 16px 16px' } }}
                >

                    <Flex justify="space-between" gap={8} wrap align="baseline">
                        <div><Title level={5} color={textColor}>All Applications</Title></div>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Filter"
                            onSelect={(v) => setFilterStatus(v)}
                            value={filterStatus}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'Submitted', label: 'Submitted' },
                                { value: 'Hired', label: 'Hired' },
                                { value: 'Rejected', label: 'Rejected' },
                            ]}
                        />
                    </Flex>

                    <div style={{ marginTop: 8 }}>
                        {filteredApplications.length === 0 ? <Flex justify="center">
                            <Title level={5} style={{ color: subText, marginTop: '5px' }}>
                                No Applications {filterStatus === 'All' ? "Yet !" : 'With Status {filterStatus}!'}
                            </Title></Flex>
                            : filteredApplications.map(app => <Card key={app.applicant_id} size="small" style={{ marginTop: 8 }}>
                                <Flex vertical gap={8} justify="flex-end">
                                    <div>
                                        <Tag color={colorMatch[app.status]} style={{ padding: 5,width:70,textAlign:'center', fontWeight: 500, float: 'right' }}>{app.status}</Tag>
                                    </div>


                                    <Flex justify="center" gap={8} align="center">
                                        <Link target="_blank" to={app.resume}>View Resume</Link>
                                        <Link target="_blank" to={`/account/${app.applicant_id}`}>View Profile</Link>
                                    </Flex>

                                    <Select
                                        showSearch
                                        placeholder="Update Status"
                                        onSelect={(v) => updateApplication(v, app.application_id)}
                                        options={[
                                            { value: 'Submitted', label: 'Submitted' },
                                            { value: 'Hired', label: 'Hired' },
                                            { value: 'Rejected', label: 'Rejected' },
                                        ]}
                                    />
                                </Flex>

                            </Card>)

                        }
                    </div>

                </Card>

            </div>
        </Spin>
    )
}

export default JobApplications