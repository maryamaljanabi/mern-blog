import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import defaultPostImage from "./../../assets/images/default-post-image.jpg";
import { useSelector } from "react-redux";
import { postsAPI } from "./../../api/api";
const { Meta } = Card;

export default function UserPosts({ id }) {
  const userState = useSelector((st) => st.user);
  const [width, setWidth] = useState(window.innerWidth);
  const [postsData, setPostsData] = useState([]);

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
        const { data: res } = await postsAPI.getPostByUserId(
          id ?? userState.user.id
        );
        console.log(res);
        setPostsData(res);
      } catch (error) {
        console.log("Error retrieving all posts...", error);
      }
    })();
  }, []);

  return (
    <div className="posts-div">
      <h2>Your posts</h2>
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
