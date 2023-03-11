import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import axios from "axios";
import PostList from "./PostList";

const Subscribed = () => {
  const context = useContext(GlobalContext);

  useEffect(() => {
    context.token
      ? axios
          .get("http://localhost:5000/posts/subscribed")
          .then((result) => {
            context.setPosts(result.data.result);
          })
          .catch((err) => {
            throw err;
          })
      : console.log("Log In First");
  }, []);

  return (
    <>
      <div>
        <PostList props={context.posts} />
      </div>
    </>
  );
};

export default Subscribed;
