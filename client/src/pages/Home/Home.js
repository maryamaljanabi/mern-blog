import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import "./Home.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Row, Col, Divider } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { postsAPI } from "../../api/api";

export default function Home() {
  const router = useHistory();
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await postsAPI.getAll();
        setPostsData(res);
      } catch (error) {
        console.log("Error retrieving all posts...", error);
      }
    })();
  }, []);
  return (
    <div className="home">
      <Jumbotron>
        <div className="home-jumbotron">
          <div className="left-section">
            <h3>A blogging website for</h3>
            <h2>EVERYONE</h2>
            <Button
              type="primary"
              shape="round"
              icon={<RightCircleOutlined />}
              size="large"
              onClick={() => router.push("/signin")}
            >
              Get Started
            </Button>
          </div>
          <div className="right-section">
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_GtqlRg.json"
            />
          </div>
        </div>
      </Jumbotron>
      <Divider orientation="center">Most recent posts</Divider>
      <Row>
        {postsData.map((item) => (
          <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
            <div>{item.title}</div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
