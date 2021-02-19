import React from "react";
import HorizontalNavbar from "./../Navbars/HorizontalNavbar";
import { Layout as AntdLayout } from "antd";
import FooterComponent from "./../Footer/FooterComponent";

const { Header, Footer, Sider, Content } = AntdLayout;

export default function Layout({ children }) {
  return (
    <AntdLayout>
      <Header>
        <HorizontalNavbar />
      </Header>
      <Content>{children}</Content>
      <Footer>
        <FooterComponent />
      </Footer>
    </AntdLayout>
  );
}
