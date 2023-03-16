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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../App";

const Post = () => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState();
  const [newComment, setNewComment] = useState("");
  const [date, setDate] = useState("");

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

              <Card.Text
                dangerouslySetInnerHTML={{ __html: postDetails.content }}
              />
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
          {postDetails.comments.length ? (
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
          ) : (
            <p>no comments</p>
          )}
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h3>Add a Comment:</h3>
          {context.token ? (
            <Form>
              <Form.Group controlId="formComment">
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
          ) : (
            <div>
              <p>Please Sign in to write comments</p>
              <Button
                onClick={(e) => {
                  navigate("/login");
                }}
                variant="primary"
                type="submit"
                block
              >
                Sign In
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
