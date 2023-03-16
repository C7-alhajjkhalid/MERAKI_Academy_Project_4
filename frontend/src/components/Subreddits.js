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
import { Link } from "react-router-dom";

const Subreddits = () => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/subreddit/all")
      .then((result) => {
        setSubreddits(result.data.result);
        console.log(subreddits);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
    
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
