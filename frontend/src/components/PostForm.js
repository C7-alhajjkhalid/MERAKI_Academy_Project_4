import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GlobalContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const PostForm = ({ onSubmit }) => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [alert, setAlert] = useState("");
  const [alertmsg, setAlertmsg] = useState("");

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
    setAlert("success");
    setAlertmsg("Post was created successfully");
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formPostTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPostBody">
          <Form.Label>Body</Form.Label>
          <ReactQuill value={body} onChange={handleBodyChange} />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          onClick={() => {
            axios
              .post(
                `http://localhost:5000/posts`,
                { title, content: body, subreddit: id },
                { headers: { Authorization: `Bearer ${context.token}` } }
              )
              .then((result) => {
                setTitle("");
                setBody("");
                setAlert("success");
                setAlertmsg(
                  "Post was created successfully, you will be directed to the subreddit"
                );
                setTimeout(() => {
                  navigate(`/subreddit/${id}`);
                }, 3000);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Submit
        </Button>
      </Form>
      <br />
      <Alert variant={alert}>{alertmsg}</Alert>
    </>
  );
};

export default PostForm;
