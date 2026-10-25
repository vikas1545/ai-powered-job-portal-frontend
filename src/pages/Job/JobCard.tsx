
import { Avatar, Button, Card, Col, Flex, notification, Row, Space, Spin, Tag, Typography } from 'antd';
import { ArrowRightOutlined, BankOutlined, CheckCircleOutlined, EnvironmentOutlined, SolutionOutlined, WalletOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useAppData } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import type { JobCardProps } from '../../components/types';

const { Title, Text } = Typography;
const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";

const JobCard: React.FC<JobCardProps> = ({ applications, j, applyJob, }) => {
    const { isAuth, user, loading } = useAppData();
    const [isApplied, setIsApplied] = useState(false);
    //const [loadingData, setIsLoadingData] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (applications && j.job_id) {
            const isAppliedJob = applications?.some((ap: any) => ap.job_id === j.job_id)
            setIsApplied(isAppliedJob)
        }
    }, [applications, j.job_id])


    return (
        <Spin spinning={loading}>
            <Card actions={
                [<Flex justify='space-between' style={{ padding: '0px 4px' }}>
                    <Button icon={<ArrowRightOutlined />} iconPosition='end' onClick={() => navigate(`/company/${j.company_id}`)}>View Details</Button>
                    {user && user.role === 'jobseeker' &&
                        <>
                            {isApplied ? <Tag icon={<CheckCircleOutlined />} color='green' style={{ paddingTop: 5, fontWeight: 500, cursor: 'not-allowed' }}>Applied</Tag>

                                : <Button icon={<SolutionOutlined />} type='primary' disabled={!j.is_active}
                                    onClick={() => applyJob(j.job_id)}>{j.is_active ? 'Easy Apply' : 'Position Closed'}</Button>
                            }

                        </>}

                </Flex>]} size='small' style={{ height: '100%' }}>


                <Flex justify='space-between'>
                    <Flex vertical>
                        <div>
                            <Title level={4} style={{ margin: 0, color: textColor }}>{j.role}</Title>
                        </div>
                        <Space size={6} style={{ marginTop: 4 }}>
                            <BankOutlined size={15} color={textColor} />
                            <Text style={{ color: subText }}>{j.company_name}</Text>
                        </Space>

                        <Space size={6} style={{ marginTop: 4 }}>
                            <EnvironmentOutlined size={15} />
                            <Tag ><Text style={{ color: subText }} >{j.location}</Text></Tag>
                        </Space>

                        <Space size={6} style={{ marginTop: 4 }}>
                            <WalletOutlined size={15} />
                            <Text style={{ color: subText }} >{j.salary}</Text>
                        </Space>
                    </Flex>

                    <div>
                        <Avatar
                            size={56}
                            src={j?.company_logo}
                            style={{
                                border: `4px solid ${cardBg}`,
                                background: "#606a80",
                                fontSize: 36,
                            }}
                        >
                            {!j?.company_logo && j?.company_name?.[0]}
                        </Avatar>

                    </div>
                </Flex>

            </Card>
        </Spin>
    )
}

export default JobCard