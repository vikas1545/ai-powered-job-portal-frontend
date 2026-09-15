import { Button, Card, Flex, Input, Space, Tag, Typography } from "antd"
import type { AccountProps } from "../../components/types"
import { useState } from "react";
import { RocketTwoTone } from "@ant-design/icons";
import { useAppData } from "../../context/AppContext";


const cardBg = "#ffffff";
const subText = "#8c8c8c";

const { Title, Paragraph, Text } = Typography;
const Skills: React.FC<AccountProps> = ({ user, isYourAccount }) => {
    const [skills, setSkills] = useState<string[]>(user?.skills || [])

    const [currentSkill, setCurrentSkill] = useState('')
    const { addSkills, btnLoading, deleteSkill } = useAppData()

    const addSkillSet = () => {
        const skill = currentSkill.trim();
        if (!skill || skills.includes(skill)) return;

        addSkills(currentSkill.trim()).then(() => {
            setSkills(prevSkills => [...prevSkills, skill]);
            setCurrentSkill('')
        })
    }

    const removeSkill = (skillToRemove: string) => {
        deleteSkill(skillToRemove).then(() => setSkills(skills.filter((s) => s !== skillToRemove)))
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
            <Card
                style={{
                    width: "100%",
                    maxWidth: 720,
                    margin: 'auto',
                }}
                loading={btnLoading}
                styles={{ body: { padding: '1px 24px 24px 24px', background: cardBg } }}
                title={<Space><RocketTwoTone /> {isYourAccount ? 'Your skills' : 'Candidate skills'}</Space>}>
               {isYourAccount && <> <Paragraph style={{ color: "#666", margin: "0 auto 10px" }}>
                    Showcase  Your Skills Or Experties
                </Paragraph>

                <Space.Compact style={{ width: '100%' }}>
                    <Input style={{ width: '100%' }} placeholder='E.g. React, Puthon, Java...' value={currentSkill}
                        onChange={(val) => setCurrentSkill(val.target.value)} allowClear size='large' onKeyDown={(e) => {
                            if (e.code === 'Enter') {
                                addSkillSet()
                            }
                        }} />
                    <Button type="primary" size='large' onClick={addSkillSet} loading={btnLoading}>Add</Button>
                </Space.Compact>
                </>
                }

                {skills.length > 0 ? <><Space.Compact style={{ width: '100%' }}>
                   {isYourAccount && <Title level={5}>{`Your Skills (${skills.length})`}</Title>}
                </Space.Compact>

                    <div>
                        {skills.map((tag) => (
                            <Tag
                                key={tag}
                                closable={isYourAccount ? true : false}
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
                </> : <Flex justify="center" style={{ marginTop: 5 }}><Title level={5} style={{ color: subText }}>No Skills Added Yet. Start Building Your Profile !</Title></Flex>}

            </Card>
        </div>
    )

}

export default Skills