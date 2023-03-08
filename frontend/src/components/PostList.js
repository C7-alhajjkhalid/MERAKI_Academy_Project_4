import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <Card key={post.id} className="my-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
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