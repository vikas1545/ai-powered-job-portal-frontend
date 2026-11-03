import { ArrowRightOutlined, GeminiFilled } from '@ant-design/icons'
import { Button, Flex, Form, Input, Modal, notification, Space, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import type { CareerGuideResponse } from '../types';
import axios from 'axios';
import CareerGuideModal from './CareerGuildModal';

const { Title, Paragraph, Text } = Typography;

const utils_service = import.meta.env.VITE_UTILS_SERVICE;


function CareerGuid() {
    const [open, setOpen] = useState(false)
    const [skills, setSkills] = useState<string[]>([])
    const [currentSkill, setCurrentSkill] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<CareerGuideResponse | null>(null)
    const [openCareerGuidModal, setOpenCareerGuidModal] = useState(false)

    const addSkills = () => {
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()])
            setCurrentSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((s) => s !== skillToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addSkills()
        }
    }

    const getCareerGuidance = async () => {
        if (skills.length === 0) {
            notification.error({ message: 'Please add atleat one skills' });
            return
        }

        setLoading(true)
        try {
            const { data } = await axios.post(`${utils_service}/api/utils/career`, {
                skills: skills
            })

            setResponse(data)
            notification.success({ message: 'Career guidance generated' })
            setOpenCareerGuidModal(true)
        } catch (error: any) {
            notification.error({ message: error?.response?.data?.message || 'Failed to get career guidance' });
        }
        finally {
            setLoading(false)
        }
    }

    const resetDialog = () => {
        setSkills([]);
        setCurrentSkill('');
        setResponse(null)
        setOpen(false)
    }



    return (
        <>
            <Flex vertical align='center' justify='center'>
                <Flex justify='center'>
                    <Tag
                        icon={<GeminiFilled style={{ color: 'rgb(8 83 189)', padding: 5 }} />}
                        style={{
                            borderRadius: 999,
                            fontSize: 18,
                            fontWeight: 500,
                            background: "#f5f7fb",
                            border: "1px solid #eee",
                        }}
                    >
                        AI-Powered Career Guidance
                    </Tag>
                </Flex>

                <div>
                    <Title
                        level={1}
                        style={{
                            fontSize: 32,
                            fontWeight: 600,
                            lineHeight: 1,
                        }}
                    >
                        Discover your career path
                    </Title>
                </div>

                <Paragraph
                    style={{
                        fontSize: 18,
                        color: "#666",
                        margin: "0 auto 40px",
                    }}
                >
                    Get personalized job recommendation and learning roadmap based on your skills

                </Paragraph>

                <div>
                    <Button
                        type='dashed'
                        size='large'
                        onClick={() => setOpen(true)}
                        icon={<GeminiFilled style={{ color: 'rgb(8 83 189)', padding: 5 }} />}>
                        Get Career Guidance <ArrowRightOutlined />
                    </Button>
                </div>

            </Flex>

            <Modal
                title={<Space size={2}><GeminiFilled style={{ color: 'rgb(8 83 189)', padding: 5 }} />
                    Tell us about your skills
                </Space>}
                open={open}
                maskClosable={false}
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <Paragraph style={{ color: "#666", margin: "0 auto 10px" }}>
                    Add  your skills Get personalized career recommendation
                </Paragraph>

                <Space.Compact style={{ width: '100%' }}>
                    <Input style={{ width: '100%' }} placeholder='skills' value={currentSkill}
                        onChange={(val) => setCurrentSkill(val.target.value)} allowClear size='large' />
                    <Button type="primary" size='large' onClick={addSkills} >Submit</Button>
                </Space.Compact>

                {skills.length > 0 && <><Space.Compact style={{ width: '100%' }}>
                    <Title level={5}>{`Your Skills (${skills.length})`}</Title>
                </Space.Compact>

                    <div>
                        {skills.map((tag) => (
                            <Tag
                                key={tag}
                                closable
                                style={{ padding: 5, fontWeight: 700 }}
                                color='red'
                                onClose={(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
                                    e.preventDefault();
                                    removeSkill(tag)
                                }}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>


                    <Flex justify='center' style={{ margin: 10 }}>
                        <Button
                            type='dashed'
                            loading={loading}
                            onClick={() => getCareerGuidance()}
                            icon={<GeminiFilled style={{ color: 'rgb(8 83 189)', padding: 5 }} />}>
                            {loading ? 'AI Is Thinking...' : 'Generate Career Guidance'}<ArrowRightOutlined />
                        </Button>
                    </Flex>


                </>

                }

            </Modal>

            <CareerGuideModal
                open={openCareerGuidModal}
                onClose={() => setOpenCareerGuidModal(false)}
                summary={response?.summary ?? ""}
                careerPaths={response?.jobOptions ?? []}
                skillsToEnhance={response?.skillsToLearn ?? []}
                learningApproach={response?.learningApproach ?? {}}

            />
        </>
    )
}

export default CareerGuid