import React, { useEffect, useState } from 'react'
import type { Application, Job } from '../../components/types';
import Cookies from "js-cookie";
import axios from 'axios';
import { Avatar, Button, Card, Col, Flex, notification, Row, Space, Spin, Tag, Typography } from 'antd';
import { ArrowRightOutlined, BankOutlined, CheckCircleOutlined, EnvironmentOutlined, SolutionOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppContext';
import JobCard from './JobCard';
const VITE_JOB_SERVICE = import.meta.env.VITE_JOB_SERVICE;
const user_service = import.meta.env.VITE_USER_SERVICE;
const { Title, Text } = Typography;

const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";


const location: string[] = ['Delhi', 'Mumbai', 'Banglore', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Remote'];

function JobPage() {

    const [loadingData, setLoadingData] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[] | null>(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');

    const token = Cookies.get('token');

    const fetchApplications = async () => {
        try {
            setLoadingData(true);
            const { data } = await axios.get(`${user_service}/api/user/application/all`,
                { headers: { Authorization: `Bearer ${token}` } });
            setApplications(data)
        } catch (error) {
            notification.error({ message: 'Failed to fetch job applications.' });
        } finally {
            setLoadingData(false);
        }
    }

    const fetchJobs = async () => {
        try {
            setLoadingData(true);
            const { data } = await axios.get(`${VITE_JOB_SERVICE}/api/job/all?title=${title}&location=${location}`,
                { headers: { Authorization: `Bearer ${token}` } });
            setJobs(data)
        } catch (error) {
            notification.error({ message: 'Failed to fetch jobs.' });
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        fetchJobs()
        fetchApplications()
    }, [])


    const applyJob = async (job_id: number) => {
        try {
            setLoadingData(true);
            const { data } = await axios.post(`${user_service}/api/user/apply/job`, { job_id }, { headers: { Authorization: `Bearer ${token}` } });
            notification.success({ message: data.message || 'You have applied for job successfully' })
            fetchJobs()
            fetchApplications()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to apply for job' });
        } finally {
            setLoadingData(false)
        }
    }


    return (
        <Spin spinning={loadingData}>
            <div className="about-page">

                <section>
                    <div className="mission-container1">
                        <Flex justify='space-between' align='center'>
                            <Flex vertical>
                                <Title level={1} className="mission-title">
                                    Explore
                                    <span className="mission-highlight">Opportunities</span>
                                </Title>

                                <div><Title level={4} style={{ color: subText, marginTop: -10, marginBottom: 20 }}>{jobs.length} Jobs </Title></div>
                            </Flex>

                            <Button>Filter</Button>
                        </Flex>
                    </div>
                </section>

                <section>
                    {
                        jobs.length > 0 ? <Row gutter={[16, 16]}>
                            {jobs.map(j => <Col xs={24} sm={12} md={8} xl={6} key={j.job_id}>
                                <JobCard j={j} applyJob={applyJob} applications={applications} />
                            </Col>)}
                        </Row>
                            :
                            <Flex justify='center' vertical align='center'>
                                <Tag style={{ padding: '10px', borderRadius: 20 }}><SolutionOutlined style={{ fontSize: 55 }} /></Tag>
                                <Title level={3} style={{ color: subText, marginTop: '15px' }}>No Jobs !</Title>
                            </Flex>
                    }


                </section>
            </div>
        </Spin>
    )

}

export default JobPage