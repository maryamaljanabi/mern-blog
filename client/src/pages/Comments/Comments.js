import React, { useState } from "react";
import defaultUser from "./../../assets/images/default-user.png";
import Avatar from "antd/lib/avatar/avatar";
import "./Comments.scss";
import moment from "moment";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Button, message, Image, Spin, Alert, Modal, Divider } from "antd";
import { commentsAPI } from "../../api/api";

export default function Comments({ data, setReloadingFlag }) {
  const userState = useSelector((st) => st.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentID, setDeleteCommentID] = useState(null);
  const [reloading, setReloading] = useState(false);

  const confirmDelete = async () => {
    try {
      await commentsAPI.delete(deleteCommentID);
      setDeleteModal(false);
      message.success("Comment deleted successfully");
      setReloadingFlag(reloading);
      setReloading(!reloading);
    } catch (error) {
      console.log("Error deleting comment...", error.response ?? error);
      message.error("Error deleting comment");
      if (error.response && error.response.data) {
        message.error(error.response.data);
      } else message.error("Error deleting comment");
      setDeleteModal(false);
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
        <div className="comment-container" key={index}>
          <div>
            <Avatar
              size="large"
              src={comment.createdBy.imagePath ?? defaultUser}
            />
          </div>
          <div className="cols">
            <div>
              <b>{comment.createdBy.userName}</b>
              <div className="comment-text">{comment.content}</div>
            </div>
            <div className="comment-date">
              {moment(comment.createdAt).fromNow(false)}
              {comment.createdBy._id === userState.user.id ? (
                <div className="icons-cols">
                  <EditTwoTone
                    key="edit"
                    // onClick={() =>
                    //   router.push("/posts/edit", { postID: item._id })
                    // }
                  />
                  <DeleteTwoTone
                    key="delete"
                    twoToneColor="red"
                    onClick={() => {
                      setDeleteCommentID(comment._id);
                      setDeleteModal(true);
                    }}
                  />
                </div>
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
