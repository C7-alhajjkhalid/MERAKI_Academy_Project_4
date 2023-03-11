import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import axios from "axios";
import PostList from "./PostList";

const Home = () => {
  const context = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((result) => {
        context.setPosts(result.data.result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div>
        <PostList posts={context.posts} />
      </div>
    </>
  );
};

export default Home;
