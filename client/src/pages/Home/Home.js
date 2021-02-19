import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import "./Home.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

export default function Home() {
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
    </div>
  );
}
