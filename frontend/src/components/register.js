import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const Register = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
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
              onClick={() => {
                axios
                  .post("http://localhost:5000/users/register", {
                    email,
                    password,
                    username,
                  })
                  .then((result) => {
                    navigate("/");
                  });
              }}
              variant="primary"
              type="submit"
              block
            >
              Sign Up
            </Button>
          </Form>
        </Form>
      </div>
    </>
  );
};

export default Register;
