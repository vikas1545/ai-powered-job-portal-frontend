
import React, { useState } from 'react'
import type { Job } from "../../components/types";
import { Button, Card, Flex, Tag, Typography } from "antd";

import {
    CheckCircleOutlined, CloseCircleOutlined, EnvironmentOutlined, EyeOutlined, LaptopOutlined,
    PlusOutlined, ShopTwoTone, UsergroupAddOutlined, WalletOutlined
} from "@ant-design/icons";
import JobModal from "./JobModal";

const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";;
const { Title, Text } = Typography;
interface JobSectionProps {
    jobs?: Job[],
    isYourAccount: boolean,
    fetChSpecificCompany: () => Promise<void>
}

const JobSection: React.FC<JobSectionProps> = ({ jobs, isYourAccount, fetChSpecificCompany }) => {
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);


    return (

        <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
            <Card
                style={{
                    width: "100%",
                    maxWidth: 720,
                    margin: 'auto',
                    backgroundColor: 'rgb(29, 78, 216)'
                }}
                styles={{ body: { background: cardBg } }}
                title={<Tag style={{ padding: '3px 5px' }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>}
                extra={<Flex align='center' gap={20}><Title level={5} style={{ color: 'white', marginTop: '5px' }}>
                    {jobs?.length} Active Jobs</Title>
                    <Button icon={<PlusOutlined />} onClick={() => setIsJobModalOpen(true)}>New Jobs</Button></Flex>}
            >


                {jobs && jobs.length > 0 ?
                    jobs?.map(j => (<Card size="small" key={j.job_id} style={{marginBottom:8}} >
                        <Flex gap={12} align='center' wrap justify='space-between'>

                            <Flex vertical gap={8} align='start' justify="space-between" wrap>
                                <Flex gap={8} justify="space-between" align="center">
                                    <Title level={5} style={{ margin: 0, color: textColor }} >
                                        {j.title}
                                    </Title>
                                    <div >{j.is_active ? <Tag color='green' icon={<CheckCircleOutlined />}>Active</Tag>
                                        : <Tag color='red' icon={<CloseCircleOutlined />}>In Active</Tag>
                                    }
                                    </div>
                                </Flex>

                                <Text style={{ color: subText, wordBreak: "break-word" }}>
                                    {j.description}
                                </Text>

                                <Flex gap={8} wrap style={{ marginTop: 5 }}>
                                    <Tag icon={<LaptopOutlined />}>{j.role}</Tag>
                                    <Tag icon={<WalletOutlined />}>{j.salary}</Tag>
                                    <Tag icon={<EnvironmentOutlined />}>{j.location}</Tag>
                                    <Tag icon={<LaptopOutlined />}>{`${j.work_location} (${j.job_type})`}</Tag>
                                    <Tag icon={<UsergroupAddOutlined />}>{j.openings}</Tag>
                                </Flex>

                            </Flex>

                            <Button size="large" shape="circle"
                                onClick={() => { setSelectedJob(j); setIsJobModalOpen(true) }}
                                style={{ marginLeft: 'auto' }}
                            >
                                <EyeOutlined />
                            </Button>

                        </Flex>
                    </Card>))
                    : <Flex justify='center' vertical align='center'>
                        <Tag style={{ padding: '10px', borderRadius: 20 }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>
                        <Title level={5} style={{ color: subText, marginTop: '15px' }}>No Job posteded Yet !</Title>
                        <Title level={5} style={{ color: subText }}>Post Your First Job To Start Hiring Best Candidates !</Title>
                    </Flex>}

            </Card>

            {isJobModalOpen && <JobModal isJobModalOpen={true} setIsJobModalOpen={setIsJobModalOpen} 
            selectedJob={selectedJob} fetChSpecificCompany={fetChSpecificCompany}
            />}
        </div>
    )

}
export default JobSection;