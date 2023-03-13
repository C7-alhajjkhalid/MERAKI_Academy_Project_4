import React, { useEffect, useState } from "react";
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

const Post = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState();

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
          <h3>Comments:</h3>
          <ListGroup>
            <ListGroupItem>
              <strong>Commenter Name</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
                gravida leo. Praesent tincidunt purus eu congue ullamcorper.
                Fusce volutpat metus magna, eget luctus arcu vestibulum sed.
                Proin commodo nulla nec risus dignissim, ac feugiat massa
                efficitur. Praesent euismod semper purus.
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Another Commenter Name</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
                gravida leo. Praesent tincidunt purus eu congue ullamcorper.
                Fusce volutpat metus magna, eget luctus arcu vestibulum sed.
                Proin commodo nulla nec risus dignissim, ac feugiat massa
                efficitur. Praesent euismod semper purus.
              </p>
            </ListGroupItem>
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
                placeholder="Enter your comment"
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
