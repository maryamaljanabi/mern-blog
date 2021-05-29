import React, { useState } from "react";
import defaultUser from "./../../assets/images/default-user.png";
import Avatar from "antd/lib/avatar/avatar";
import "./Comments.scss";
import moment from "moment";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Input, Button, message, Alert, Modal } from "antd";
import { commentsAPI } from "../../api/api";
import isEmpty from "lodash.isempty";

export default function Comments({
  data,
  setDeleteReloadingFlag,
  setEditReloadingFlag,
}) {
  const userState = useSelector((st) => st.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteCommentID, setDeleteSelectedCommentID] = useState(null);
  const [selectedEditCommentID, setEditSelectedCommentID] = useState(null);
  const [deleteReloading, setDeleteReloading] = useState(false);
  const [editReloading, setEditReloading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState(null);

  const confirmDelete = async () => {
    try {
      await commentsAPI.delete(selectedDeleteCommentID);
      setDeleteModal(false);
      message.success("Comment deleted successfully");
      setDeleteReloadingFlag(!deleteReloading);
      setDeleteReloading(!deleteReloading);
    } catch (error) {
      console.log("Error deleting comment...", error.response ?? error);
      message.error("Error deleting comment");
      if (error.response && error.response.data) {
        message.error(error.response.data);
      } else message.error("Error deleting comment");
      setDeleteModal(false);
    }
  };

  const onSubmit = async (event) => {
    if (isEmpty(event) || !event.content) {
      setSubmissionErrors("Can't submit an empty comment");
    } else {
      setSubmissionErrors(null);
    }

    try {
      await commentsAPI.update({
        comment: { ...event },
      });
      message.success("Comment updated successfully");
      setEditReloadingFlag(!editReloading);
      setEditReloading(!editReloading);
      setEditSelectedCommentID(null);
    } catch (error) {
      console.log("Error editing comment...", error.response ?? error);
      message.error("Error editing comment");
    }
  };

  return (
    <div>
      {data && Boolean(data.length)
        ? data.length === 1
          ? `${data.length} Comment`
          : `${data.length} Comments`
        : null}

      {data.map((comment, index) => (
        <div className="comment-container full-width-comment" key={index}>
          <div>
            <Avatar
              size="large"
              src={comment.createdBy.imagePath ?? defaultUser}
            />
          </div>
          <div
            className={
              comment._id === selectedEditCommentID
                ? "full-width-comment"
                : "cols"
            }
          >
            <div className="comment-text">
              <b>{comment.createdBy.userName}</b>
              <div>
                {comment._id === selectedEditCommentID ? (
                  <FinalForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={({ form, handleSubmit, submitting, reset }) => (
                      <form
                        className="comment-editing"
                        onSubmit={async (event) => {
                          await handleSubmit(event);
                          form.reset();
                        }}
                      >
                        <Form.Item labelCol={{ span: 24 }}>
                          <Field name="content">
                            {({ input, meta }) => (
                              <div>
                                <Input {...input} name="content" />
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
                            htmlType="submit"
                            type="primary"
                          >
                            Update Comment
                          </Button>
                          <Button
                            disabled={submitting}
                            htmlType="button"
                            onClick={() => setEditSelectedCommentID(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  />
                ) : (
                  comment.content
                )}
              </div>
            </div>
            <div className="comment-date">
              {comment._id !== selectedEditCommentID ? (
                <>
                  {moment(comment.createdAt).fromNow(false)}
                  {comment.createdBy._id === userState.user.id ? (
                    <div className="icons-cols">
                      <EditTwoTone
                        key="edit"
                        onClick={() => {
                          setEditSelectedCommentID(comment._id);
                          setInitialValues({ ...comment });
                        }}
                      />
                      <DeleteTwoTone
                        key="delete"
                        twoToneColor="red"
                        onClick={() => {
                          setDeleteSelectedCommentID(comment._id);
                          setDeleteModal(true);
                        }}
                      />
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}

      <Modal
        title="Delete Confirmation"
        visible={deleteModal}
        onOk={() => confirmDelete()}
        onCancel={() => setDeleteModal(false)}
        centered
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </div>
  );
}
