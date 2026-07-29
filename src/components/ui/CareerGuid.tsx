import { GeminiFilled } from '@ant-design/icons'
import { Flex, Tag, Typography } from 'antd'
import React, { useState } from 'react'
const { Title, Paragraph, Text } = Typography;

function CareerGuid() {
    const [open, setOpen] = useState(false)
    const [skills, setSkills] = useState<string[]>([])
    const [currentSkill, setCurrentSkill] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    return (
        <Flex vertical gap={8} align='center' justify='center'>
            <Flex justify='center'>
                <Tag
                    icon={<GeminiFilled style={{ color: 'rgb(8 83 189)', padding: 5 }} />}
                    style={{
                        borderRadius: 999,
                        padding: "6px 16px",
                        fontSize: 18,
                        fontWeight: 500,
                        background: "#f5f7fb",
                        border: "1px solid #eee",
                        // marginBottom: 24,
                    }}
                >
                    AI-Powered Career Guidance
                </Tag>
            </Flex>

            <div>
                <Title
                    level={1}
                    style={{
                        fontSize: 36,
                        fontWeight: 600,
                        lineHeight: 1,
                        margin: "0 auto 16px",

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

        </Flex>
    )
}

export default CareerGuid