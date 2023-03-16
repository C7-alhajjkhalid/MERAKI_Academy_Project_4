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
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../App";
import { Link } from "react-router-dom";

const Subreddits = () => {
  const context = useContext(GlobalContext);
  const [subreddits, setSubreddits] = useState([]);
  const [subName, setSubName] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [alertmsg, setAlertmsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/subreddit/all")
      .then((result) => {
        setSubreddits(result.data.result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/subreddit/`,
        { name: subName, description: subDescription },
        { headers: { Authorization: `Bearer ${context.token}` } }
      )
      .then((result) => {
        // navigate("/");
        setAlert("success");
        setAlertmsg(`${subName} Subreddit was created successfully`);
      })
      .catch((err) => {
        setAlert("danger");
        setAlertmsg("The subreddit already exists or is not in correct format");
        console.log(err);
      });
  };

  return (
    <>
      <br />
      {context.token ? (
        <div>
          <input
            placeholder="New Subreddit Name"
            onChange={(e) => {
              setSubName(e.target.value);
            }}
          ></input>
          <input
            placeholder="New Subreddit Description"
            onChange={(e) => {
              setSubDescription(e.target.value);
            }}
          ></input>
          <Button
            variant="danger"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Create a new subreddit
          </Button>
        </div>
      ) : null}
      <br />
      <Alert variant={alert}>{alertmsg}</Alert>
      {subreddits.map((sub, index) => (
        <Card key={sub._id} className="postCard">
          <Card.Body>
            <Card.Title>{sub.name}</Card.Title>
            <Link to={`/subreddit/${sub._id}`}>
              <Button variant="primary" onClick={() => {}}>
                Go to Subreddit
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Subreddits;
