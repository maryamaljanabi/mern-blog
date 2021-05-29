import React, { useState, useEffect } from "react";
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
import CommentsDesktop from "./CommentsDesktop";
import CommentsMobile from "./CommentsMobile";

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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

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

      {data.map((comment, index) =>
        width >= 580 ? (
          <CommentsDesktop
            comment={comment}
            index={index}
            userState={userState}
            setEditSelectedCommentID={setEditSelectedCommentID}
            selectedEditCommentID={selectedEditCommentID}
            setDeleteSelectedCommentID={setDeleteSelectedCommentID}
            selectedDeleteCommentID={selectedDeleteCommentID}
            setDeleteModal={setDeleteModal}
            onSubmit={onSubmit}
          />
        ) : (
          <CommentsMobile
            comment={comment}
            index={index}
            userState={userState}
            setEditSelectedCommentID={setEditSelectedCommentID}
            selectedEditCommentID={selectedEditCommentID}
            setDeleteSelectedCommentID={setDeleteSelectedCommentID}
            selectedDeleteCommentID={selectedDeleteCommentID}
            setDeleteModal={setDeleteModal}
            onSubmit={onSubmit}
          />
        )
      )}

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
