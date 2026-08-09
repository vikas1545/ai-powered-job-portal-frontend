

import React from "react";
import { Typography, Tag, Button, Input, Row, Col, Card, Statistic, Space } from "antd";
import { RiseOutlined, SearchOutlined, EnvironmentOutlined, ArrowRightOutlined, ExpandOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

// Reusable pieces -----------------------------------------------------------

function HeroBadge() {
    return (
        <Tag
            icon={<RiseOutlined />}
            style={{
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 14,
                fontWeight: 500,
                background: "#fff",
                border: "1px solid #eee",
                color: "#1677ff",
                marginBottom: 24,
            }}
        >
            #1 Job Platform in India
        </Tag>

    );
}

function HeroSearch() {
    return (
        <Row gutter={[12, 12]} justify="center" style={{ maxWidth: 640, margin: "0 auto" }}>
            <Col xs={24} sm={14}>
                <Search
                    size="large"
                    placeholder="Job title, keywords, or company"
                    prefix={<SearchOutlined style={{ color: "#999" }} />}
                />
            </Col>
            <Col xs={24} sm={10}>
                <Input
                    size="large"
                    placeholder="City or location"
                    prefix={<EnvironmentOutlined style={{ color: "#999" }} />}
                />
            </Col>
            <Col span={24}>
                <Button type="primary" size="large" block style={{ maxWidth: 240, margin: "0 auto", display: "block" }}>
                    Search jobs
                </Button>
            </Col>
        </Row>
    );
}

function StatsStrip() {
    const stats = [
        { title: "Actives Jobs", value: "12,400+" },
        { title: "Companies", value: "3,200+" },
        { title: "Job Seekers", value: "58,000+" },
    ];

    return (
        <Row gutter={[24, 24]} justify="center" style={{ marginTop: 64 }}>
            {stats.map((s) => (
                <Col xs={24} sm={8} key={s.title}>
                    <Card
                        bordered={false}
                        style={{ textAlign: "center", background: "transparent" }}
                        styles={{ body: { padding: 0 } }}
                    >
                        <Statistic
                            title={<Text style={{ color: "#888" }}>{s.title}</Text>}
                            value={s.value}
                            valueStyle={{ fontWeight: 700, fontSize: 28 }}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

// Page ------------------------------------------------------------------

export default function HomePage() {
    return (
        <div style={{ background: "#f5f7fb" }}>
            {/* Hero */}
            <section
                style={{
                    textAlign: "center",
                    padding: "50px 24px 32px",
                }}
            >

                <HeroBadge />

                <Title
                    level={1}
                    style={{
                        fontSize: 56,
                        fontWeight: 800,
                        lineHeight: 1.15,
                        margin: "0 auto 16px",
                        maxWidth: 900,
                    }}
                >
                    Find Your Dream Job at{" "}
                    <span style={{ color: "#1677ff" }}>Hire</span>
                    <span style={{ color: "#f5222d" }}>Fast</span>
                </Title>

                <Paragraph
                    style={{
                        fontSize: 18,
                        color: "#666",
                        maxWidth: 640,
                        margin: "0 auto 40px",
                    }}
                >
                    Connect with top companies across India and take the next step in
                    your career, all in one place.

                </Paragraph>

                <HeroSearch />
                <StatsStrip />

            </section>

            {/* Featured jobs placeholder section */}
            <section style={{ background: "#fff", padding: "64px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    
                    <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                        <Col>
                            <Title level={3} style={{ margin: 0 }}>
                                Featured jobs
                            </Title>
                            <Text style={{ color: "#888" }}>Hand-picked openings from top companies</Text>
                        </Col>
                        <Col>
                            <Button type="link" size="large">
                                <SearchOutlined /> Browse jobs <ArrowRightOutlined />
                            </Button>
                        </Col>
                        <Col>
                            <Button type="link" size="large" icon={<ExpandOutlined />}>
                                Learn More
                            </Button>
                        </Col>

                    </Row>

                    <Row gutter={[24, 24]}>
                        {[1, 2, 3].map((i) => (
                            <Col xs={24} md={8} key={i}>
                                <Card hoverable style={{ borderRadius: 12 }}>
                                    <Text strong style={{ fontSize: 16 }}>
                                        Job title {i}
                                    </Text>
                                    <Paragraph style={{ color: "#888", margin: "4px 0 12px" }}>
                                        Company name · Location
                                    </Paragraph>
                                    <Tag color="blue">Full-time</Tag>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </div>
    );
}