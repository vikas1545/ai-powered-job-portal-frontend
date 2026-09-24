

import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import type { Company, Job } from "../../components/types";
import { Avatar, Button, Card, Col, Flex, message, notification, Form, Row, Space, Typography, Upload, type UploadFile, type UploadProps, InputNumber, Input, Select, Switch, Tag, Popconfirm } from "antd";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EyeOutlined, PlusOutlined, ShopTwoTone } from "@ant-design/icons";
import JobModal from "./JobModal";
const job_service = import.meta.env.VITE_JOB_SERVICE;

const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";
const borderColor = "#eceef2";
const brandBlue = "#2f6fed";
const { Title, Paragraph, Text } = Typography;

const JobSection = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [company, setCompany] = useState<Company | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    ;
    const [form] = Form.useForm<Job>();

    return (

        <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
            <Card
                style={{
                    width: "100%",
                    maxWidth: 720,
                    margin: 'auto',
                    backgroundColor: 'rgb(29, 78, 216)'
                }}
                loading={loadingData}
                styles={{ body: { background: cardBg } }}
                title={<Tag style={{ padding: '3px 5px' }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>}
                extra={<Flex align='center' gap={20}><Title level={5} style={{ color: 'white', marginTop: '5px' }}>
                     {jobs.length} Active Jobs</Title>
                    <Button icon={<PlusOutlined />} onClick={() => setIsJobModalOpen(true)}>New Jobs</Button></Flex>}
            >


                {jobs.length > 0 ?
                    jobs.map(c => (<Card size="small" key={c.company_id}>
                        {/* <Flex gap={8} align='center' wrap justify='space-between'>
                            <div style={{ width: 60 }}><Avatar
                                size={55}
                                src={c.logo}
                                icon={!c.logo ? <BankOutlined /> : undefined}
                            />
                            </div>

                            <Flex vertical gap={4} align='start' style={{ flexGrow: 1, maxWidth: 480 }}>
                                <Title
                                    level={5}
                                    style={{
                                        margin: 0,
                                        color: textColor,
                                    }}
                                >
                                    {c.name}
                                </Title>

                                <Text
                                    style={{
                                        color: subText,
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {c.description}
                                </Text>

                                <Button
                                    type="link"
                                    onClick={() => window.open(c.website)}
                                    style={{
                                        padding: 0,
                                        height: "auto",
                                        whiteSpace: "normal",
                                        textAlign: "left",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {c.website}
                                </Button>

                            </Flex>

                            <Flex gap={8} justify='end'>
                                <Button size="large" shape="circle" onClick={() => setSelectedCompany(c)}>
                                    <EyeOutlined />
                                </Button>

                                <Popconfirm
                                    title='Are You sure want to delete this job'
                                    placement='topLeft'
                                    open={open}
                                    onConfirm={() => handleDelete(c.company_id)}
                                    okButtonProps={{ loading: loading }}
                                    onCancel={() => { setOpen(false) }}
                                >
                                    <Button size="large" shape="circle" danger onClick={() => setOpen(true)}>
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>

                            </Flex>
                        </Flex> */}
                    </Card>))
                    : <Flex justify='center' vertical align='center'>
                        <Tag style={{ padding: '10px', borderRadius: 20 }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>
                        <Title level={5} style={{ color: subText, marginTop: '15px' }}>No Job posteded Yet !</Title>
                        <Title level={5} style={{ color: subText }}>Post Your First Job To Start Hiring Best Candidates !</Title>
                    </Flex>}

            </Card>

            {isJobModalOpen && <JobModal isJobModalOpen={true} setIsJobModalOpen={setIsJobModalOpen}
            />}
        </div>
    )

}
export default JobSection;