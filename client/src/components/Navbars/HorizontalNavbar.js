import React from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  SettingOutlined,
  GroupOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import blogLogo from "./../../assets/images/blogging.png";
import { useSelector, useDispatch } from "react-redux";
import { userAuthActions } from "./../../redux/actions/actionCreator";
const { SubMenu } = Menu;

export default function HorizontalNavbar() {
  const userState = useSelector((st) => st.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Menu selectedKeys={"logo"} mode="horizontal" theme="dark">
        <Menu.Item className="unhoverable-menu-item">
          <a href="/">
            <Avatar src={blogLogo} shape="square" /> &nbsp; Blog App
          </a>
        </Menu.Item>

        {userState.isLoggedIn ? (
          <>
            <SubMenu
              key="SubMenu"
              icon={<Avatar src={userState.user.imagePath} shape="circle" />}
              title={" " + userState.user.userName}
              className="float-right unhoverable-menu-item"
            >
              <Menu.Item key="userProfile" icon={<SettingOutlined />}>
                <a href="/user/profile">User Profile</a>
              </Menu.Item>
              <Menu.Item key="userPosts" icon={<GroupOutlined />}>
                <a href="/user/posts">User Posts</a>
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<LoginOutlined />}
                onClick={() => dispatch(userAuthActions.logout())}
              >
                Logout
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="newPost"
              icon={<FormOutlined />}
              className="float-right"
            >
              <a href="/posts/new">New Post</a>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              key="login"
              icon={<LoginOutlined />}
              className="float-right"
            >
              <a href="/login">Login</a>
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<UserAddOutlined />}
              className="float-right"
            >
              <a href="/signup">Signup</a>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
}
