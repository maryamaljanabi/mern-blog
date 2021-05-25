import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postsAPI } from "./../../api/api";
import { useLocation } from "react-router-dom";
import PostsGrid from "../../components/PostsGrid/PostsGrid";
import { Form, Input, Button, Tag, message, Image, Spin, Alert } from "antd";

export default function UserPosts() {
  const userState = useSelector((st) => st.user);
  const [width, setWidth] = useState(window.innerWidth);
  const [postsData, setPostsData] = useState([]);
  const location = useLocation();
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [reload, setReload] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const getPostsData = async () => {
    try {
      const { data: res } = await postsAPI.getPostByUserId(
        userID ?? userState.user.id
      );
      setPostsData(res);
      setErrorMsg(null);
    } catch (error) {
      setPostsData([]);
      setErrorMsg("Error loading user posts");
      console.log("Error retrieving all posts...", error);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        location.state &&
        location.state.hasOwnProperty("userID") &&
        location.state.hasOwnProperty("userName")
      ) {
        setUserName(location.state.userName);
        setUserID(location.state.userID);
      }

      getPostsData();
    })();
  }, [location.state]);

  useEffect(() => {
    getPostsData();
  }, [reload]);

  return (
    <div className="posts-div">
      {errorMsg ? (
        <div className="loader-container">
          <Alert message={errorMsg} type="error" />
        </div>
      ) : Object.keys(postsData).length === 0 ? (
        <div className="loader-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <h2>{userName ? `Posts of user ${userName}` : "Your posts"}</h2>
          {Boolean(postsData) && Boolean(postsData.length) ? (
            <PostsGrid
              data={postsData}
              reloadPosts={(reloadTrigger) => setReload(reloadTrigger)}
            />
          ) : (
            <h2>You have no posts yet</h2>
          )}
        </>
      )}
    </div>
  );
}
