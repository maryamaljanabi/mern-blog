import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Form, Input, Button, Tag } from "antd";
import { Form as FinalForm, Field } from "react-final-form";

export default function SignupForm() {
  const location = useLocation();
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [errors, setErrors] = useState([]);

  const onSubmit = (event) => {
    console.log("submitting...");
    console.log(event);
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
          {/* <div>
            {errors.map((err) => (
              <label key={err.key}>{err.message}</label>
            ))}
          </div> */}

          <div className="buttons-wrapper-vertical">
            <Button disabled={submitting} htmlType="submit" type="primary">
              Signup
            </Button>
            <Button
              htmlType="button"
              type="link"
              onClick={() => router.push("signin")}
            >
              Already have an account? Signin!
            </Button>
          </div>
        </form>
      )}
    />
  );
}
