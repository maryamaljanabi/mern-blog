import React from "react";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Menu, Avatar, Image } from "antd";
import blogLogo from "./../../assets/images/blogging.png";
const { SubMenu } = Menu;

export default function HorizontalNavbar() {
  return (
    <div>
      <Menu selectedKeys={"mail"} mode="horizontal" theme="dark">
        <Menu.Item className="unhoverable-menu-item">
          <a href="/">
            <Avatar src={blogLogo} shape="square" /> &nbsp; Blog App
          </a>
        </Menu.Item>

        <Menu.Item key="login" icon={<LoginOutlined />} className="float-right">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <a href="/signup">Signup</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}
