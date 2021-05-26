import React from "react";
import defaultUser from "./../../assets/images/default-user.png";
import Avatar from "antd/lib/avatar/avatar";
import "./Comments.scss";
import moment from "moment";

export default function Comments({ data }) {
  console.log(data);

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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
