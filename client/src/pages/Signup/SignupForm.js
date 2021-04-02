import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Tag, message } from "antd";
import { Form as FinalForm, Field } from "react-final-form";
import { authAPI } from "./../../api/api";
import isEmpty from "lodash.isempty";

export default function SignupForm() {
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState({});

  const onSubmit = async (event) => {
    try {
      await authAPI.signup({ user: event });
      message.success("User created successfully");
      router.push("/login");
    } catch (error) {
      console.log("Error registering a new user...", error.response ?? error);
      if (error.response && error.response.data) {
        setSubmissionErrors(error.response.data);
      } else setSubmissionErrors({ err: "Signup error" });
    }
  };

  const checkValidation = (values) => {
    const errors = {};
    if (!values.userName?.trim()) {
      errors.userName = "Please enter the userName";
    }
    if (!values.password?.trim()) {
      errors.password = "Please enter the password";
    }
    if (!values.confirmPassword?.trim()) {
      errors.confirmPassword = "Please enter the password confirmation";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.email?.trim()) {
      errors.email = "Please enter the email";
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
            label="UserName"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Field name="userName">
              {({ input, meta }) => (
                <div>
                  <Input {...input} name="userName" />
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
          <Form.Item label="Confirm Password" labelCol={{ span: 24 }}>
            <Field name="confirmPassword">
              {({ input, meta }) => (
                <div>
                  <Input.Password {...input} name="confirmPassword" />
                  {meta.touched && meta.error && (
                    <Tag color="error">{meta.error}</Tag>
                  )}
                </div>
              )}
            </Field>
          </Form.Item>
          <Form.Item label="Email" labelCol={{ span: 24 }}>
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
          <Form.Item label="Summary" labelCol={{ span: 24 }}>
            <Field name="summary">
              {({ input, meta }) => (
                <div>
                  <Input {...input} name="summary" />
                  {meta.touched && meta.error && (
                    <Tag color="error">{meta.error}</Tag>
                  )}
                </div>
              )}
            </Field>
          </Form.Item>
          <Form.Item label="Image URL" labelCol={{ span: 24 }}>
            <Field name="imagePath">
              {({ input, meta }) => (
                <div>
                  <Input {...input} name="imagePath" />
                  {meta.touched && meta.error && (
                    <Tag color="error">{meta.error}</Tag>
                  )}
                </div>
              )}
            </Field>
          </Form.Item>

          {!isEmpty(submissionErrors) && (
            <div>
              {Object.entries(submissionErrors).map(([key, value]) => (
                <Tag color="error" className="full-width" key={key}>
                  {value}
                </Tag>
              ))}
            </div>
          )}

          <div className="buttons-wrapper-vertical">
            <Button disabled={submitting} htmlType="submit" type="primary">
              Signup
            </Button>
            <Button
              htmlType="button"
              type="link"
              onClick={() => router.push("login")}
            >
              Already have an account? Login!
            </Button>
          </div>
        </form>
      )}
    />
  );
}
