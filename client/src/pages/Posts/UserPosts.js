import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import defaultPostImage from "./../../assets/images/default-post-image.jpg";
import { useSelector } from "react-redux";
import { postsAPI } from "./../../api/api";
import { useHistory, useLocation } from "react-router-dom";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import PostsGrid from "../../components/PostsGrid/PostsGrid";

const { Meta } = Card;

export default function UserPosts() {
  const userState = useSelector((st) => st.user);
  const [width, setWidth] = useState(window.innerWidth);
  const [postsData, setPostsData] = useState([]);
  const location = useLocation();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    let userID = null;
    (async () => {
      if (
        location.state &&
        location.state.hasOwnProperty("userID") &&
        location.state.hasOwnProperty("userName")
      ) {
        userID = location.state.userID;
        setUserName(location.state.userName);
      }

      try {
        const { data: res } = await postsAPI.getPostByUserId(
          userID ?? userState.user.id
        );
        console.log(res);
        setPostsData(res);
      } catch (error) {
        console.log("Error retrieving all posts...", error);
      }
    })();
  }, [location.state]);

  return (
    <div className="posts-div">
      <h2>{userName ? `Posts of user ${userName}` : "Your posts"}</h2>
      <PostsGrid data={postsData} />
    </div>
  );
}
