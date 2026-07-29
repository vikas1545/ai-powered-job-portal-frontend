import {
  Button,
  Col,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import {
  SearchOutlined,
  ArrowRightOutlined,
  BookOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function HeroSection() {
  return (
    <div
      style={{
        background: "#f5f8fd",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        padding: "70px 80px",
      }}
    >
      <Row
        gutter={[60, 40]}
        align="middle"
        style={{ width: "100%" }}
      >
        {/* Left Content */}
        <Col xs={24} lg={12}>
          <Title
            level={1}
            style={{
              fontSize: 64,
              lineHeight: 1.15,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 30,
            }}
          >
            Find Your Dream Job
            <br />
            at{" "}
            <span style={{ color: "#ff3b3b" }}>
              HireHeaven
            </span>
          </Title>

          <Paragraph
            style={{
              fontSize: 24,
              lineHeight: 1.8,
              color: "#5b6473",
              maxWidth: 650,
            }}
          >
            Connect with top employers and discover opportunities that
            match your skills. Whether you're a job seeker or recruiter,
            we've got you covered with powerful tools and seamless
            experience.
          </Paragraph>

          {/* Statistics */}
          <Space
            size={55}
            style={{ marginTop: 35, marginBottom: 45 }}
          >
            <Statistic
              value="10k+"
              valueStyle={{
                color: "#2563eb",
                fontWeight: 700,
                fontSize: 34,
              }}
              title="Active Jobs"
            />

            <Statistic
              value="5k+"
              valueStyle={{
                color: "#2563eb",
                fontWeight: 700,
                fontSize: 34,
              }}
              title="Companies"
            />

            <Statistic
              value="50k+"
              valueStyle={{
                color: "#2563eb",
                fontWeight: 700,
                fontSize: 34,
              }}
              title="Job Seekers"
            />
          </Space>

          {/* Buttons */}
          <Space size={18}>
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              style={{
                height: 56,
                paddingInline: 28,
                borderRadius: 12,
                fontWeight: 600,
                background: "#111827",
                border: "none",
              }}
            >
              Browse Jobs
              <ArrowRightOutlined style={{ marginLeft: 8 }} />
            </Button>

            <Button
              size="large"
              icon={<BookOutlined />}
              style={{
                height: 56,
                paddingInline: 28,
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Learn More
            </Button>
          </Space>

          {/* Bottom Features */}
          <Space
            size={30}
            style={{ marginTop: 42, flexWrap: "wrap" }}
          >
            <Text style={{ color: "#6b7280" }}>
              <CheckOutlined
                style={{ color: "#7c6cf2", marginRight: 8 }}
              />
              Free to use
            </Text>

            <Text style={{ color: "#6b7280" }}>
              <CheckOutlined
                style={{ color: "#7c6cf2", marginRight: 8 }}
              />
              Verified employers
            </Text>

            <Text style={{ color: "#6b7280" }}>
              <CheckOutlined
                style={{ color: "#7c6cf2", marginRight: 8 }}
              />
              Secure platform
            </Text>
          </Space>
        </Col>

        {/* Right Image */}
        <Col xs={24} lg={12}>
          <div
            style={{
              background: "#fff",
              padding: 10,
              borderRadius: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,.12)",
            }}
          >
            <img
              src="/hero-image.jpg"
              alt="Hero"
              style={{
                width: "100%",
                height: 520,
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}