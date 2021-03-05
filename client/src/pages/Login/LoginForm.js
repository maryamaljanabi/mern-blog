import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Tag, message } from "antd";
import { Form as FinalForm, Field } from "react-final-form";
import { authAPI } from "./../../api/api";
import isEmpty from "lodash.isempty";

export default function LoginForm() {
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState({});

  const onSubmit = async (event) => {
    try {
      const token = await authAPI.login({ user: event });
      console.log(token);
      message.success("User logged in successfully");
      router.push("/");
    } catch (error) {
      console.log("Error logging in user...", error.response ?? error);
      if (error.response && error.response.data) {
        setSubmissionErrors(error.response.data);
      } else setSubmissionErrors({ err: "Login error" });
    }
  };

  const checkValidation = (values) => {
    const errors = {};
    if (!values.email?.trim()) {
      errors.email = "Please enter the email";
    }
    if (!values.password?.trim()) {
      errors.password = "Please enter the password";
    }
    return errors;
  };

  return (
    <FinalForm
      initialValues={initialValues}
      validate={checkValidation}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Form.Item
            label="Email"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <Input {...input} name="email" />
                  {meta.touched && meta.error && (
                    <Tag color="error">{meta.error}</Tag>
                  )}
                </div>
              )}
            </Field>
          </Form.Item>
          <Form.Item label="Password" labelCol={{ span: 24 }}>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <Input.Password {...input} name="password" />
                  {meta.touched && meta.error && (
                    <Tag color="error">{meta.error}</Tag>
                  )}
                </div>
              )}
            </Field>
          </Form.Item>

          {!isEmpty(submissionErrors) && (
            <div>
              {typeof submissionErrors === "object" ? (
                Object.entries(submissionErrors).map(([key, value]) => (
                  <Tag color="error" className="full-width" key={key}>
                    {value}
                  </Tag>
                ))
              ) : (
                <Tag color="error" className="full-width">
                  {submissionErrors}
                </Tag>
              )}
            </div>
          )}

          <div className="buttons-wrapper-vertical">
            <Button disabled={submitting} htmlType="submit" type="primary">
              Login
            </Button>
            <Button
              htmlType="button"
              type="link"
              onClick={() => router.push("signup")}
            >
              Don't have an account? Signup!
            </Button>
          </div>
        </form>
      )}
    />
  );
}
