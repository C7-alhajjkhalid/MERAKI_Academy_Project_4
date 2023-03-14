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

const Subreddits = () => {
  const [subreddits, setSubreddits] = useState();

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

  return (
    <Container>
      {subreddits.map((sub, index) => (
        <h1 key={sub._id}>{sub.name}</h1>
      ))}
    </Container>
  );
};

export default Subreddits;
