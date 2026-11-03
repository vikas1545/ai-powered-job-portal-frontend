import React, { useEffect,useState } from 'react'
import type { Application, Job } from '../../components/types';
import Cookies from "js-cookie";
import axios from 'axios';
import { Avatar, Button, Card, Col, Drawer, Flex, Input, notification, Row, Select, Space, Spin, Tag, Typography } from 'antd';
import { EnvironmentOutlined, FilterOutlined, SearchOutlined, SolutionOutlined, } from '@ant-design/icons';

import JobCard from './JobCard';
const VITE_JOB_SERVICE = import.meta.env.VITE_JOB_SERVICE;
const user_service = import.meta.env.VITE_USER_SERVICE;
const { Title, } = Typography;
const { Search } = Input;

const textColor = "#1f2430";
const subText = "#8c8c8c";


const locationArr: string[] = ['Delhi', 'Mumbai', 'Banglore', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Remote'];

function JobPage() {

    const [loadingData, setLoadingData] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[] | null>(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const token = Cookies.get('token');
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


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
        fetchApplications()
    }, [])

    useEffect(() => {
        fetchJobs()
    }, [title, location])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitle(searchInput);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);


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

                                <div>
                                    <Title level={4} style={{ color: subText, marginTop: -10, marginBottom: 20 }}>{jobs.length} Jobs </Title>
                                </div>
                             
                            </Flex>

                           <Flex vertical gap={8} align='flex-end'>
                             <Button onClick={showDrawer} type='dashed' size='large' icon={<FilterOutlined />} style={{width:100}}>Filter</Button>
                               <Flex wrap justify='flex-end' gap={8} align='flex-end'>
                                    {location && <Tag closable icon={<EnvironmentOutlined />} color={textColor} style={{ padding: 8,margin:0 }}
                                        onClose={(e: React.MouseEvent<HTMLElement>) => {
                                            e.preventDefault();
                                            setLocation('')
                                        }}

                                    >{location}</Tag>}
                                    {title && <Tag
                                        closable icon={<SolutionOutlined />}
                                        style={{ padding: 8,margin:0 }}
                                        color={textColor}
                                        onClose={(e: React.MouseEvent<HTMLElement>) => {
                                            e.preventDefault();
                                            setSearchInput('')
                                            setTitle('');
                                        }}
                                    >{title}</Tag>}
                                </Flex> </Flex>
                        </Flex>
                    </div>
                </section>

                <section>
                    {
                        jobs.length > 0 ? <Row gutter={[16, 16]}>
                            {jobs.map(j => <Col xs={24} sm={12} md={8} xl={6} key={j.job_id}>
                                <JobCard job={j} applyJob={applyJob} applications={applications} />
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



            <Drawer
                title="Job Filter"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
                <Flex vertical gap={12}>
                    <Search
                        size="large"
                        placeholder="Job title, keywords, or company"
                        prefix={<SearchOutlined style={{ color: "#999" }} />}
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                        allowClear
                        onClear={()=>setSearchInput('')}
                    />

                    <Select
                        showSearch
                        allowClear
                        size="large"
                        prefix={<EnvironmentOutlined style={{ color: "#999" }} />}
                        placeholder="City or location"
                        onSelect={(v) => setLocation(v)}
                        style={{ width: '100%' }}
                        value={location?location:undefined}
                        onClear={()=>setLocation('')}
                    >
                        {locationArr.map(l => <Select.Option key={l} value={l}>{l}</Select.Option>)}
                    </Select>
                </Flex>
            </Drawer>
        </Spin>
    )

}

export default JobPage