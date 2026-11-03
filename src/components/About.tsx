import React from "react";
import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          {/* Image */}
          <div className="about-image-wrapper">
            <img
              src="/about.jpg"
              className="about-image"
              alt="About HireHeaven"
            />
          </div>

          {/* Content */}
          <div className="mission-content">
            <Title level={1} className="mission-title">
              Our Mission At Hire
              <span className="mission-highlight">Heaven</span>
            </Title>

            <Paragraph className="mission-description">
              At HireHaven, we're dedicated to revolutionizing the job search
              experience. Our mission is to create meaningful connections
              between talented individuals and forward-thinking companies,
              fostering growth and success for both.
            </Paragraph>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <Title level={2} className="cta-title">
            Ready to find your dream job?
          </Title>

          <Paragraph className="cta-description">
            Join thousands of successful job seekers on HireHeaven
          </Paragraph>

          <div className="cta-button-wrapper">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => navigate("/jobs")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;