import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Form, Input, Button, Tag } from "antd";
import { Form as FinalForm, Field } from "react-final-form";

export default function LoginForm() {
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
    if (!values.username?.trim()) {
      errors.username = "Please enter the username";
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
            label="Username"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <Input {...input} name="username" />
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
          {/* <div>
            {errors.map((err) => (
              <label key={err.key}>{err.message}</label>
            ))}
          </div> */}

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
