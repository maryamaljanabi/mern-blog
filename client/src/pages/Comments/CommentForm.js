import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Tag, message, Alert } from "antd";
import { Form as FinalForm, Field } from "react-final-form";
import isEmpty from "lodash.isempty";
import { commentsAPI } from "./../../api/api";

export default function CommentForm({ createdBy, postId, setReloadingFlag }) {
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState(null);
  const [reloading, setReloading] = useState(false);

  const onSubmit = async (event) => {
    if (isEmpty(event) || !event.content) {
      setSubmissionErrors("Can't submit an empty comment");
    } else {
      setSubmissionErrors(null);
    }

    try {
      await commentsAPI.add({
        comment: { ...event, createdBy: createdBy, postId: postId },
      });
      message.success("Comment added successfully");
      setReloading(!reloading);
      setReloadingFlag(reloading);
    } catch (error) {
      console.log("Error adding comment...", error.response ?? error);
      if (error.response && error.response.data) {
        setSubmissionErrors(error.response.data);
      } else setSubmissionErrors("Error adding comment");
    }
  };

  return (
    <div className="comment-form">
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form, handleSubmit, submitting, reset }) => (
          <form
            onSubmit={async (event) => {
              await handleSubmit(event);
              form.reset();
            }}
          >
            <Form.Item labelCol={{ span: 24 }}>
              <Field name="content">
                {({ input, meta }) => (
                  <div>
                    <Input
                      {...input}
                      name="content"
                      placeholder="Add a comment"
                    />
                  </div>
                )}
              </Field>
            </Form.Item>

            {submissionErrors && (
              <Alert
                message={submissionErrors}
                type="error"
                showIcon
                closable
              />
            )}

            <div className="comments-btns-container">
              <Button
                disabled={submitting}
                htmlType="button"
                onClick={form.reset}
              >
                Clear
              </Button>

              <Button disabled={submitting} htmlType="submit" type="primary">
                Comment
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
