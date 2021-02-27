import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Login.scss";
import LoginForm from "./LoginForm";

export default function Login() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className="login">
      {width <= 650 ? (
        <div className="center-panel">
          <LoginForm />
        </div>
      ) : (
        <>
          <div className="left-panel">
            <LoginForm />
          </div>
          <div className="right-panel">
            <h2>
              #1 Bloggin website for everyone around the globe. Totally free and
              easy to use.
            </h2>
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json"
            />
          </div>
        </>
      )}
    </div>
  );
}
