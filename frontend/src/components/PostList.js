import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostList = ({ props }) => {
  return (
    <div>
      {props.map((post) => (
        <Card key={post.id} className="postCard">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Link to={`/posts/${post.id}`}>
              <Button variant="primary">Read more</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
