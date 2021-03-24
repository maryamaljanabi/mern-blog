import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import "./Home.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Row, Col, Divider, Card } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { postsAPI } from "../../api/api";
import defaultPostImage from "./../../assets/images/default-post-image.jpg";
import { useSelector } from "react-redux";
const { Meta } = Card;

export default function Home() {
  const router = useHistory();
  const userState = useSelector((st) => st.user);
  const [postsData, setPostsData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

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
      {userState.isLoggedIn ? (
        <>
          <Jumbotron>
            <div className="home-jumbotron">
              {width <= 650 ? (
                <div className="centered-section">
                  <h3>A blogging website for</h3>
                  <h2>EVERYONE</h2>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<RightCircleOutlined />}
                    size="large"
                    onClick={() => router.push("/signin")}
                  >
                    Write a post now!
                  </Button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </Jumbotron>
        </>
      ) : (
        <>
          <Jumbotron>
            <div className="home-jumbotron">
              {width <= 650 ? (
                <div className="centered-section">
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
              ) : (
                <>
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
                </>
              )}
            </div>
          </Jumbotron>
        </>
      )}
      <Divider orientation="center">Most recent posts</Divider>
      <Row className="posts-container" type="flex">
        {postsData.map((item) => (
          <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.imagePath ? item.imagePath : defaultPostImage}
                />
              }
            >
              <Meta
                title={item.title}
                description={item.content.substring(1, 100) + "..."}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
