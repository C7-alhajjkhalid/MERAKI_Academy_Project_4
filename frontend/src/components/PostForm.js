import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, body });
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
