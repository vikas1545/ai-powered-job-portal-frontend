import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Upload,
  message,
  Progress,
  Tag,
  Card,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Spin,
} from "antd";
import type { UploadProps, RcFile } from "antd/es/upload";
import {
  FileTextOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  WarningOutlined,
  RiseOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  FileDoneOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import axios from "axios";
import type { ResumeAnalysisResponse } from "../types";

const utils_service = import.meta.env.VITE_UTILS_SERVICE;

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

const ResumeAnalyzer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (selectedFile: RcFile) => {
    const isPdf = selectedFile.type === "application/pdf";
    if (!isPdf) {
      message.error("Please upload a PDF file");
      return Upload.LIST_IGNORE;
    }
    const isLt5M = selectedFile.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File size should be less than 5MB");
      return Upload.LIST_IGNORE;
    }
    setFile(selectedFile);
    return false;
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "application/pdf",
    maxCount: 1,
    beforeUpload,
    onRemove: () => setFile(null),
    fileList: file
      ? [{ uid: "-1", name: file.name, status: "done" } as any]
      : [],
  };

  const analyzeResume = async () => {
    if (!file) {
      message.error("Please upload a resume");
      return;
    }
    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const { data } = await axios.post(
        `${utils_service}/api/utils/resume-analyser`,
        { pdfBase64: base64 }
      );
      setResponse(data);
      message.success("Resume analyzed successfully!");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to analyze resume"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#16a34a"; // green-600
    if (score >= 60) return "#ca8a04"; // yellow-600
    return "#dc2626"; // red-600
  };

  const getPriorityTagColor = (priority: string) => {
    if (priority === "high") return "red";
    if (priority === "medium") return "gold";
    return "blue";
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Space
          align="center"
          style={{
            padding: "6px 16px",
            borderRadius: 999,
            border: "1px solid #fecaca",
            background: "#fef2f2",
            marginBottom: 16,
          }}
        >
          <FileDoneOutlined style={{ color: "#ef4444" }} />
          <Text strong style={{ fontSize: 13 }}>
            AI-Powered ATS Analysis
          </Text>
        </Space>

        <Title level={2} style={{ marginBottom: 12 }}>
          Optimize Your Resume for ATS
        </Title>
        <Paragraph
          style={{
            fontSize: 16,
            opacity: 0.7,
            maxWidth: 640,
            margin: "0 auto 32px",
          }}
        >
          Get instant feedback on your resume's compatibility with Applicant
          Tracking Systems
        </Paragraph>

        <Button
          type="primary"
          size="large"
          icon={<FileTextOutlined />}
          onClick={() => setOpen(true)}
        >
          Analyze My Resume <ArrowRightOutlined />
        </Button>
      </div>

      <Modal
        open={open}
        onCancel={resetDialog}
        footer={null}
        width={800}
        title={
          !response ? (
            <Space>
              <FileTextOutlined style={{ color: "#ef4444" }} />
              Upload Your Resume
            </Space>
          ) : (
            <Space>
              <FileDoneOutlined style={{ color: "#ef4444" }} />
              Your Resume Analysis
            </Space>
          )
        }
        styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      >
        {!response ? (
          <>
            <Paragraph type="secondary">
              Upload your resume in PDF format to get an instant ATS
              compatibility analysis
            </Paragraph>

            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <Dragger {...uploadProps} style={{ padding: 24 }}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ color: "#2563eb", fontSize: 32 }} />
                </p>
                <p className="ant-upload-text">
                  {file ? file.name : "Click or drag your resume to upload"}
                </p>
                <p className="ant-upload-hint">PDF format only, maximum 5MB</p>
                {file && (
                  <div style={{ marginTop: 8, color: "#16a34a" }}>
                    <CheckCircleOutlined /> File uploaded successfully
                  </div>
                )}
              </Dragger>

              <Button
                type="primary"
                block
                size="large"
                icon={loading ? <LoadingOutlined /> : <ThunderboltOutlined />}
                disabled={loading || !file}
                onClick={analyzeResume}
              >
                {loading ? "Analyzing Your Resume..." : "Analyze Resume"}
              </Button>
            </Space>
          </>
        ) : (
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {/* Overall Score */}
            <Card
              style={{
                textAlign: "center",
                borderColor: getScoreColor(response.atsScore),
              }}
            >
              <Text type="secondary">ATS Compatibility Score</Text>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: getScoreColor(response.atsScore),
                  lineHeight: 1.2,
                }}
              >
                {response.atsScore}
              </div>
              <Text type="secondary">out of 100</Text>
            </Card>

            {/* Summary */}
            <Card style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
              <Text>{response.summary}</Text>
            </Card>

            {/* Score Breakdown */}
            <div>
              <Title level={5}>
                <RiseOutlined style={{ color: "#ef4444" }} /> Detailed Score
                Breakdown
              </Title>
              <Row gutter={[12, 12]}>
                {Object.entries(response.scoreBreakdown).map(
                  ([key, value]: [string, any]) => (
                    <Col xs={24} md={12} key={key}>
                      <Card size="small">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <Text strong style={{ textTransform: "capitalize" }}>
                            {key}
                          </Text>
                          <Text
                            strong
                            style={{ color: getScoreColor(value.score) }}
                          >
                            {value.score}%
                          </Text>
                        </div>
                        <Progress
                          percent={value.score}
                          showInfo={false}
                          strokeColor={getScoreColor(value.score)}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {value.feedback}
                        </Text>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
            </div>

            {/* Strengths */}
            <Card
              title={
                <Space>
                  <CheckCircleFilled style={{ color: "#16a34a" }} />
                  What Your Resume Does Well
                </Space>
              }
              style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}
            >
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {response.strengths.map((strength: string, index: number) => (
                  <li key={index} style={{ marginBottom: 6 }}>
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Suggestions */}
            <div>
              <Title level={5}>
                <WarningOutlined style={{ color: "#ef4444" }} /> Recommendations
                for Improvement
              </Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {response.suggestions.map((suggestion: any, index: number) => (
                  <Card key={index} size="small">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <Text strong>{suggestion.category}</Text>
                      <Tag color={getPriorityTagColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Tag>
                    </div>
                    <Paragraph style={{ marginBottom: 4 }}>
                      <Text type="secondary">Issue: </Text>
                      {suggestion.issue}
                    </Paragraph>
                    <Paragraph style={{ marginBottom: 0 }}>
                      <Text type="secondary">Fix: </Text>
                      {suggestion.recommendation}
                    </Paragraph>
                  </Card>
                ))}
              </Space>
            </div>

            <Divider />

            <Button block onClick={resetDialog}>
              Analyze Another Resume
            </Button>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default ResumeAnalyzer;