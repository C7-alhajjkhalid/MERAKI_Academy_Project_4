import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import axios from "axios";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";

const Subscribed = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  useEffect(() => {
    !context.token && navigate("/all");
  }, []);

  useEffect(() => {
    context.token
      ? axios
          .get("http://localhost:5000/posts/subscribed", {
            headers: { Authorization: `Bearer ${context.token}` },
          })
          .then((result) => {
            console.log(result);
            context.setSubscribedPosts(result.data.result);
          })
          .catch((err) => {
            throw err;
          })
      : console.log("Log In First");
  }, []);

  return (
    <>
      <div>
        <PostList posts={context.subscribedPosts} />
      </div>
    </>
  );
};

export default Subscribed;
