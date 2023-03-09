import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const Register = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState("");
  const [alertmsg, setAlertmsg] = useState("");
  useEffect(() => {
    context.isLoggedIn && navigate("/home");
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/users/register", {
        email,
        password,
        username,
      })
      .then((result) => {
        // navigate("/");
        setAlert("success");
        setAlertmsg(
          "Registered successfully, you will now be directed to Login page"
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setAlert("danger");
        setAlertmsg("The email already exists or is not in correct format");
      });
  };

  return (
    <>
      <div className="loginForm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <br />
          <Form>
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              variant="primary"
              type="submit"
              block
            >
              Sign Up
            </Button>
          </Form>
        </Form>
        <br />
        <Alert variant={alert}>{alertmsg}</Alert>
      </div>
    </>
  );
};

export default Register;
