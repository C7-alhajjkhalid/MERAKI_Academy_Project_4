import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  if (!posts) {
    return <p>loading</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Card key={post._id} className="postCard">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Link to={`/posts/find/${post._id}`}>
              <Button variant="primary" onClick={() => {}}>
                Read more
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
