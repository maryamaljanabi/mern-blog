import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Tag, message } from "antd";
import { Form as FinalForm, Field } from "react-final-form";
import isEmpty from "lodash.isempty";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { postsAPI } from "./../../api/api";

export default function NewPost() {
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState({});
  const userState = useSelector((st) => st.user);

  const onSubmit = async (event) => {
    try {
      await postsAPI.add({
        post: { ...event, createdBy: userState.user.id },
      });
      message.success("Post created successfully");
      router.push("/");
    } catch (error) {
      console.log("Error creating a new post...", error.response ?? error);
      if (error.response && error.response.data) {
        setSubmissionErrors(error.response.data);
      } else setSubmissionErrors({ err: "Post error" });
    }
  };

  const checkValidation = (values) => {
    const errors = {};
    if (!values.title?.trim()) {
      errors.title = "Please enter the post's title";
    }
    if (!values.content?.trim()) {
      errors.content = "Please enter the post's content";
    }
    return errors;
  };

  return (
    <div className="form-container">
      <h3>Create a new post</h3>
      <FinalForm
        initialValues={initialValues}
        validate={checkValidation}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Form.Item
              label="Title"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Field name="title">
                {({ input, meta }) => (
                  <div>
                    <Input {...input} name="title" />
                    {meta.touched && meta.error && (
                      <Tag color="error">{meta.error}</Tag>
                    )}
                  </div>
                )}
              </Field>
            </Form.Item>

            <Form.Item label="Content" labelCol={{ span: 24 }}>
              <Field name="content">
                {({ input, meta }) => (
                  <div>
                    <TextArea rows={4} {...input} name="content" />
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

            <div className="buttons-wrapper-horizontal">
              <Button disabled={submitting} htmlType="submit" type="primary">
                Create Post
              </Button>
              <Button htmlType="button" onClick={() => router.goBack()}>
                Back
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
