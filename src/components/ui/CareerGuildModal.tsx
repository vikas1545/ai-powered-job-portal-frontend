import React from "react";
import { Modal, Typography, Card, Space, Divider } from "antd";
import {
  AimOutlined,
  BookOutlined,
  BulbOutlined,
  FolderOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import type { JobOptions } from "../types";

const { Title, Text, Paragraph } = Typography;

// NOTE: antd icon set does not export "BriefcaseOutlined" in some versions.
// If you see an import error, swap it for `ContainerOutlined` or `FolderOutlined`.


export interface CareerPath {
  title: string;
  responsibilities: string;
  whyThisRole: string;
}

export interface CareerGuideModalProps {
  open: boolean;
  onClose: () => void;
  summary: string;
  //careerPaths: CareerPath[];
  careerPaths: JobOptions[];
  skillsToEnhance: any[],
  // learningApproach:LearningApproach
  learningApproach:any
}

const CareerGuideModal: React.FC<CareerGuideModalProps> = ({
  open,
  onClose,
  summary,
  careerPaths,
  skillsToEnhance,
  learningApproach
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      title={
        <Space align="center">
          <AimOutlined style={{ color: "#1677ff", fontSize: 22 }} />
          <Title level={4} style={{ margin: 0 }}>
            Your Personalized Career Guide
          </Title>
        </Space>
      }
      styles={{
        body: { maxHeight: "70vh", overflowY: "auto", paddingRight: 8 },
      }}
    >
      {/* Career Summary */}
      <Card
        style={{ background: "#f0f7ff", borderColor: "#d6e8ff" }}
        bodyStyle={{ padding: 20 }}
      >
        <Space align="center" style={{ marginBottom: 12 }}>
          <BulbOutlined style={{ color: "#1677ff", fontSize: 18 }} />
          <Title level={5} style={{ margin: 0 }}>
            Career Summary
          </Title>
        </Space>
        <Paragraph style={{ margin: 0, color: "rgba(0,0,0,0.75)" }}>
          {summary}
        </Paragraph>
      </Card>

      <Divider />

      {/* Recommended Career Paths */}
      <Space align="center" style={{ marginBottom: 12 }}>
        <FolderOutlined style={{ color: "#1677ff", fontSize: 18 }} />
        <Title level={5} style={{ margin: 0 }}>
          Recommended Career Paths
        </Title>
      </Space>

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {careerPaths.map((path) => (
          <Card key={path.title} bodyStyle={{ padding: 20 }}>
            <Title level={5} style={{ marginTop: 0 }}>
              {path.title}
            </Title>

            <Text strong>Responsibilities: </Text>
            <Text>{path.responsibilities}</Text>

            <Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
              <Text strong>Why this Role: </Text>
              {/* <Text>{path.whyThisRole}</Text> */}
              <Text>{path.why}</Text>
            </Paragraph>
          </Card>
        ))}
      </Space>

      <Divider />

      {/* Skills to enhabce your career */}
      <Space align="center" style={{ marginBottom: 12 }}>
        <RiseOutlined style={{ color: "#1677ff", fontSize: 18 }} />
        <Title level={5} style={{ margin: 0 }}>
          Skills To Enhabce Your Career
        </Title>
      </Space>

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {skillsToEnhance.map((category, index) => (
          <Card key={category.category || index} size="small" title={<div style={{ color: '#1677ff' }}>{category.category}</div>}>

            {
              category?.skills?.map((skill: any, sindex: number) => (
                <Card key={sindex} bodyStyle={{ padding: 20 }}>
                  <Title level={5} style={{ marginTop: 0 }}>{skill.title}</Title>
                  <Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
                    <Text strong>Why: </Text>
                    <Text>{skill.why}</Text>
                    <Text>{skill.how}</Text>
                  </Paragraph>
                </Card>
              ))
            }


          </Card>
        ))}
      </Space>

  <Divider />
      <Card title={<Space><BookOutlined /> {learningApproach.title}</Space>} size="small">
        {learningApproach?.points?.map((point:string, index:number) => (
          <Paragraph key={index}>
            <strong>{index + 1}.</strong> {point}
          </Paragraph>
        ))}
      </Card>
    </Modal>
  );
};

export default CareerGuideModal;

