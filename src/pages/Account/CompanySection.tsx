import { Avatar, Button, Card, Col, Divider, Flex, notification, Popconfirm, Row, Space, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppData } from '../../context/AppContext';
import { BankOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, ShopTwoTone } from '@ant-design/icons';
import CompanyModal from './CompanyModal';
import type { AccountProps, Company } from '../../components/types';

import Cookies from "js-cookie";
import axios from "axios";


const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";
const { Title, Paragraph, Text } = Typography;
const job_service = import.meta.env.VITE_JOB_SERVICE;

const CompanySection: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const { btnLoading, loading } = useAppData()
  const [open, setOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const token = Cookies.get('token');

  const fetChCompany = async () => {
    try {
      setLoadingData(true)
      const { data } = await axios.get(`${job_service}/api/job/company/all`, { headers: { Authorization: `Bearer ${token}` } });
      setCompanies(data)
    } catch (error: any) {
      notification.error({ message: error?.response?.data?.message || 'Failed to fetch companies list' });
    }
    finally {
      setLoadingData(false)
    }
  }
  useEffect(() => {
    fetChCompany()
  }, [])


  const handleDelete = async (companyId: string) => {
    try {
      setLoadingData(true)
      const { data } = await axios.delete(`${job_service}/api/job/company/${companyId}`, { headers: { Authorization: `Bearer ${token}` } });
      notification.success({ message: data.message || 'Deletted Successfully' })
    } catch (error: any) {
      notification.error({ message: error?.response?.data?.message || 'Failed to delete company.' });
    }
    finally {
      setLoadingData(false)
      setOpen(false)
    }
  }

  const updateCompany = async (company: Company) => {
        try {
            setLoadingData(true);
            // const { data } = await axios.put(`${user_service}/api/user/update/resume`, body:{data:company}, { headers: { Authorization: `Bearer ${token}` } });
            // notification.success({ message: 'resume updated' })
            // fetChCompany()
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to update company' });
        } finally {
            setLoadingData(false);
        }
    }


  return (

    <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 720,
          margin: 'auto',
          backgroundColor: 'rgb(29, 78, 216)'
        }}
        loading={btnLoading || loading || loadingData}
        styles={{ body: { background: cardBg } }}
        title={<Tag style={{ padding: '3px 5px' }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>}
        extra={<Flex align='center' gap={20}><Title level={5} style={{ color: 'white', marginTop: '5px' }}>
          Manage Your Registered Companies ({companies.length}/3) </Title>
          <Button icon={<PlusOutlined />} onClick={() => setIsCompanyModalOpen(true)}>Company</Button></Flex>}
      >


        {companies.length > 0 ?
          companies.map(c => (<Card size="small" key={c.company_id}>
            <Flex gap={8} align='center' wrap justify='space-between'>
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
                  title='Are You sure want to delete this company'
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
            </Flex>
          </Card>))
          : <Flex justify='center' vertical align='center'>
            <Tag style={{ padding: '10px', borderRadius: 20 }}><ShopTwoTone style={{ fontSize: 25 }} /></Tag>
            <Title level={5} style={{ color: subText, marginTop: '15px' }}>No Company registered Yet !</Title>
            <Title level={5} style={{ color: subText }}>Add Your First Company To Start Posting Jobs !</Title>
          </Flex>}

      </Card>

      {isCompanyModalOpen && <CompanyModal isCompanyModalOpen={true} setIsCompanyModalOpen={setIsCompanyModalOpen}
        user={user} fetChCompany={fetChCompany} selectedCompany={selectedCompany} />}
    </div>


  )
}

export default CompanySection;