import React from "react";
import { Row, Col, Card } from "antd";
import defaultPostImage from "./../../assets/images/default-post-image.jpg";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router";
import "./PostsGrid.scss";

const { Meta } = Card;

export default function PostsGrid({ data }) {
  const router = useHistory();
  return (
    <div>
      <Row className="posts-container" type="flex">
        {data.map((item) => (
          <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
            <Card
              hoverable
              cover={
                <div className="image-container">
                  <img
                    alt={item.title}
                    src={item.imagePath ? item.imagePath : defaultPostImage}
                    className="card-image"
                  />
                </div>
              }
              actions={[
                <EditTwoTone
                  key="edit"
                  twoToneColor="red"
                  onClick={() =>
                    router.push("/posts/edit", { postID: item._id })
                  }
                />,
                <DeleteTwoTone key="delete" />,
              ]}
            >
              <Meta
                title={item.title}
                description={item.content.substring(1, 100) + "..."}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
