import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const Login = () => {
  const context = useContext(GlobalContext);
  useEffect(() => {
    context.isLoggedIn && navigate("/home");
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [alertmsg, setAlertmsg] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((result) => {
        context.setToken(result.data.token);
        context.setUserID(result.data);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", result.data.token);
        context.setIsLoggedIn(true);
        setAlert("success");
        setAlertmsg("Logged in successfully");
        setTimeout(() => {
          navigate("/subscribed");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setAlert("danger");
        setAlertmsg("The email or password is incorrect");
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

          <br />
          <Form>
            <Button
              onClick={(e) => {
                setEmail("");
                setPassword("");
                handleSubmit(e);
              }}
              variant="primary"
              type="submit"
              block
            >
              Sign In
            </Button>
          </Form>
        </Form>
        <br />

        <Alert variant={alert}>{alertmsg}</Alert>
      </div>
    </>
  );
};

export default Login;
