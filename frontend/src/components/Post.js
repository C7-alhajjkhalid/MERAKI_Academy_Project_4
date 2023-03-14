import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../App";

const Post = () => {
  const context = useContext(GlobalContext);
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/find/${id}`)
      .then((result) => {
        setPostDetails(result.data.result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  if (!postDetails) {
    return <p>loading</p>;
  }

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{postDetails.title}</Card.Title>
              <Card.Text>{postDetails.content}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Username: {postDetails.author.username}
              </ListGroupItem>
              <ListGroupItem>
                Published On: {postDetails.createdAt}
              </ListGroupItem>
              <ListGroupItem>
                Subreddit: {postDetails.subreddit.name}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <h3>Comments</h3>
          <ListGroup>
            {postDetails.comments.map((comment) => {
              return (
                <ListGroupItem key={comment._id}>
                  <strong>{comment.author}</strong>
                  <p>{comment.content}</p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h3>Add a Comment:</h3>
          <Form>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your comment"
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
            </Form.Group>
            <br />
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(
                    "http://localhost:5000/comments",
                    {
                      content: newComment,
                      post: id,
                    },
                    { headers: { Authorization: `Bearer ${context.token}` } }
                  )

                  .then((result) => {
                    postDetails.comments.push(result);
                    const newArr = postDetails;
                    setPostDetails(newArr);
                  })
                  .catch((err) => {
                    throw err;
                  });
              }}
            >
              Add Comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
