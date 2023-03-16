import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GlobalContext } from "../App";
import { useParams } from "react-router-dom";

const PostForm = ({ onSubmit }) => {
  const context = useContext(GlobalContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(id);

    onSubmit(
      axios.post(
        `http://localhost:5000/posts`,
        { title, content: body, subreddit: id },
        { headers: { Authorization: `Bearer ${context.token}` } }
      )
    );
    setTitle("");
    setBody("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formPostTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group controlId="formPostBody">
        <Form.Label>Body</Form.Label>
        <ReactQuill value={body} onChange={handleBodyChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
