import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const userState = useSelector((st) => st.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        userState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default LoggedInRoute;
