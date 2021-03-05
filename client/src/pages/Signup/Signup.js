import React from "react";
import SignupForm from "./SignupForm";
import "./Signup.scss";

export default function Signup() {
  return (
    <div className="signup">
      <h2 className="centered-text">Create an account for free</h2>
      <SignupForm />
    </div>
  );
}
