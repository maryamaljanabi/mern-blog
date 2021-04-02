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
      <div className="page-container">
        <div className="page-content">{children}</div>
        <div className="footer">
          <FooterComponent />
        </div>
      </div>
    </AntdLayout>
  );
}
