import React, { useState } from "react";
import { Card, Avatar, Typography, Row, Col, Upload, Button, Space, Empty, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import type { AccountProps } from "../../components/types";
import { useAppData } from "../../context/AppContext";
import { CameraOutlined, DownloadOutlined, EyeOutlined, FileTextOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;


function IconBubble({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: `${color}1a`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}


const cardBg = "#ffffff";
const textColor = "#1f2430";
const subText = "#8c8c8c";
const borderColor = "#eceef2";
const brandBlue = "#2f6fed";


const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {

  const [resumeFileName, setResumeFileName] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateProfilePic } = useAppData()

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
     
    const formData = new FormData()

    const resumeFile = newFileList?.[0]?.originFileObj;
    if(resumeFile)
     formData.append("file", resumeFile,resumeFile?.name);
    await updateProfilePic(formData)
    setFileList(newFileList);
  };

  const imageUrl = fileList[0]?.originFileObj ? URL.createObjectURL(fileList[0].originFileObj) : undefined;




  const handleResumeSelect: UploadProps["beforeUpload"] = (file) => {
    setResumeFileName(file.name);
    return false;
  };



  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "60px 16px" }}>
        <Empty description="This profile is unavailable." />
      </div>
    );
  }


  const beforeUpload = (file: File) => {
    const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp";

    if (!isImage) {
      message.error("You can only upload images!");
      return Upload.LIST_IGNORE;
    }

    const isLt5MB = file.size / 1024 / 1024 < 5;

    if (!isLt5MB) {
      message.error("Image must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }

    return false;
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 16,
          overflow: "hidden",
          borderColor,
        }}
        bodyStyle={{ padding: 0, background: cardBg }}
      >
        {/* Cover photo */}
        <div
          style={{
            height: 120,
            width: "100%",
            background: `linear-gradient(135deg, ${brandBlue}, #1d4ed8)`,
            position: "relative",
          }}
        />


        <div style={{ padding: "0 32px 32px" }}>
          {/* Avatar overlapping the cover */}
          <div style={{ position: "relative", width: 112, marginTop: -56 }}>
            <Avatar
              size={112}
              src={imageUrl?imageUrl:user?.profile_pic}
              style={{
                border: `4px solid ${cardBg}`,
                background: "#606a80",
                fontSize: 36,
              }}
            >
              {(!imageUrl || user?.profile_pic) && user.name?.[0]}
            </Avatar>
            {isYourAccount === true && (
              <Upload
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={1}
              >
                <Button
                  shape="circle"
                  size="small"
                  icon={<CameraOutlined />}
                  style={{ position: "absolute", bottom: 4, right: 4 }}
                />
              </Upload>
            )}
          </div>

          {/* Name + role */}
          <div style={{ marginTop: 16, marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0, color: textColor }}>
              {user.name}
            </Title>
            <Space size={6} style={{ marginTop: 4 }}>
              <IdcardOutlined size={15} color={textColor}/>
              <Text style={{ color: subText }}>{user.role}</Text>
            </Space>
          </div>

          {/* About */}
          <Card
            size="small"
            style={{ borderRadius: 12, borderColor, marginBottom: 24 }}
            bodyStyle={{ background: cardBg }}
          >
            <Space size={8} style={{ marginBottom: 8 }}>
              <FileTextOutlined size={16} color={textColor} />
              <Text strong style={{ color: textColor, fontSize: 15 }}>
                About
              </Text>
            </Space>
            <Paragraph style={{ margin: 0, color: textColor }}>
              {(isYourAccount === true ? "Add a short bio about yourself." : "No bio yet.")}
            </Paragraph>
          </Card>

          {/* Contact information */}
          <Space size={8} style={{ marginBottom: 12 }}>
            <MailOutlined size={16} color={brandBlue} />
            <Title level={4} style={{ margin: 0, color: textColor }}>
              Contact Information
            </Title>
          </Space>

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12}>
              <Card size="small" style={{ borderRadius: 12, borderColor }} bodyStyle={{ background: cardBg }}>
                <Space align="center" size={12}>
                  <IconBubble color={brandBlue}>
                    <MailOutlined  color={brandBlue} />
                  </IconBubble>
                  <div>
                    <div style={{ color: subText, fontSize: 12 }}>Email</div>
                    <div style={{ color: textColor, fontWeight: 500 }}>{user.email || "—"}</div>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card size="small" style={{ borderRadius: 12, borderColor }} bodyStyle={{ background: cardBg }}>
                <Space align="center" size={12}>
                  <IconBubble color={brandBlue}>
                    <PhoneOutlined color={brandBlue} rotate={90}/>
                  </IconBubble>
                  <div>
                    <div style={{ color: subText, fontSize: 12 }}>Phone</div>
                    <div style={{ color: textColor, fontWeight: 500 }}>{user.phone_number || "—"}</div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Resume */}
          {
            user.role === 'jobseeker' && <> <Space size={8} style={{ marginBottom: 12 }}>
              <FileTextOutlined size={16} color={brandBlue} />
              <Title level={4} style={{ margin: 0, color: textColor }}>
                Resume
              </Title>
            </Space>

              <Card size="small" style={{ borderRadius: 12, borderColor }} bodyStyle={{ background: cardBg }}>
                {resumeFileName ? (
                  <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
                    <Space size={12}>
                      <IconBubble color={brandBlue}>
                        <FileTextOutlined size={16} color={brandBlue} />
                      </IconBubble>
                      <Text style={{ color: textColor, fontWeight: 500 }}>{resumeFileName}</Text>
                    </Space>
                    <Space size={8}>
                      <Button size="small" icon={<EyeOutlined size={14} />}>
                        View
                      </Button>
                      <Button size="small" icon={<DownloadOutlined size={14} />}>
                        Download
                      </Button>
                    </Space>
                  </Space>
                ) : isYourAccount === true ? (
                  <Upload accept=".pdf,.doc,.docx" showUploadList={false} beforeUpload={handleResumeSelect}>
                    <Button icon={<UploadOutlined size={14} />}>Upload resume</Button>
                  </Upload>
                ) : (
                  <Text style={{ color: subText }}>No resume uploaded yet.</Text>
                )}
              </Card>

            </>
          }
        </div>
      </Card>
    </div>
  );
};

export default Info;