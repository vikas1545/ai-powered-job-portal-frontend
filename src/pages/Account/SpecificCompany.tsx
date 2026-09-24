
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import type { Company, Job } from "../../components/types";
import { Avatar, Button, Card, Col, Flex, message, notification, Form, Row, Space, Typography, Upload, type UploadFile, type UploadProps, InputNumber, Input, Select, Switch } from "antd";
import { useParams } from "react-router-dom";
import { FileTextOutlined, IdcardOutlined } from "@ant-design/icons";
import JobSection from "./JobSelction";
const job_service = import.meta.env.VITE_JOB_SERVICE;

const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";
const borderColor = "#eceef2";
const brandBlue = "#2f6fed";
const { Title, Paragraph, Text } = Typography;

const SpecificCompany = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [company, setCompany] = useState<Company | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm<Job>();

    const { id } = useParams()

    const token = Cookies.get('token');

    const fetChCompany = async () => {
        try {
            setLoadingData(true)
            const { data } = await axios.get(`${job_service}/api/job/company/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setCompany(data)
            setFileList([
                {
                    uid: "-1",
                    name: "logo",
                    status: "done",
                    url: '',
                },
            ],)
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || '' });
        }
        finally {
            setLoadingData(false)
        }
    }


    useEffect(() => {
        if (id)
            fetChCompany()
    }, [id])

    const imageUrl = fileList[0]?.originFileObj ? URL.createObjectURL(fileList[0].originFileObj) : undefined;

    console.log('imageUrl :', imageUrl);

    const isYourAccount = true;

  
    return (
      <>  <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
            <Card
                style={{
                    width: "100%",
                    maxWidth: 720,
                    // borderRadius: 16,
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
                    }}
                />


                <div style={{ padding: "0 32px 32px" }}>
                    <div style={{ position: "relative", width: 112, marginTop: -56 }}>
                        <Avatar
                            size={112}
                            src={imageUrl ? imageUrl : company?.logo}
                            style={{
                                border: `4px solid ${cardBg}`,
                                background: "#606a80",
                                fontSize: 36,
                            }}
                        >
                            {(!imageUrl || company?.logo) && company?.name?.[0]}
                        </Avatar>
                       
                    </div>


                    <div style={{ marginTop: 16, marginBottom: 24 }}>
                        <Flex justify="space-between" gap={8} align="center">
                            <Title level={2} style={{ margin: 0, color: textColor }}>
                                {company?.name}
                            </Title>
                        </Flex>
                        <Space size={6} style={{ marginTop: 4 }}>
                            <IdcardOutlined size={15} color={textColor} />
                            <Text style={{ color: subText }}>{company?.website}</Text>
                        </Space>
                    </div>


                    <Card
                        size="small"
                        style={{ borderRadius: 12, borderColor, marginBottom: 24 }}
                        bodyStyle={{ background: cardBg }}
                    >
                        <Space size={8} style={{ marginBottom: 8 }}>
                            <FileTextOutlined size={16} color={textColor} />
                            <Text strong style={{ color: textColor, fontSize: 15 }}>
                                Description
                            </Text>
                        </Space>
                        <Paragraph style={{ margin: 0, color: textColor }}>
                            {(isYourAccount === true ? "Add a short description about company." : "No description yet.")}
                        </Paragraph>
                    </Card>

                </div>
            </Card>
        </div>

        <JobSection/>
        </>
    );

}

export default SpecificCompany;