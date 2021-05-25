import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import "./Home.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Row, Col, Divider, Card, Spin, Alert } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { postsAPI } from "../../api/api";
import defaultPostImage from "./../../assets/images/default-post-image.jpg";
import { useSelector } from "react-redux";
import PostsGrid from "../../components/PostsGrid/PostsGrid";
const { Meta } = Card;

export default function Home() {
  const router = useHistory();
  const userState = useSelector((st) => st.user);
  const [postsData, setPostsData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reload, setReload] = useState(false);

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
        setErrorMsg(null);
      } catch (error) {
        setErrorMsg("Error loading posts data");
        console.log("Error retrieving all posts...", error);
      }
    })();
  }, [reload]);

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
                    onClick={() => router.push("/posts/new")}
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
                      onClick={() => router.push("/posts/new")}
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
                    onClick={() => router.push("/login")}
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
                      onClick={() => router.push("/login")}
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
      {errorMsg ? (
        <div className="loader-container">
          <Alert message={errorMsg} type="error" />
        </div>
      ) : postsData && Boolean(postsData.length) ? (
        <PostsGrid data={postsData} reloadPosts={(param) => setReload(param)} />
      ) : (
        <div className="loader-container">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
