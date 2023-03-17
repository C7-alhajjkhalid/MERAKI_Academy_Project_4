import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import axios from "axios";
import PostList from "./PostList";
import { Navbar, Container, Button } from "react-bootstrap";

const PostsBySub = () => {
  const [subName, setSubName] = useState("");
  const context = useContext(GlobalContext);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/subreddit/${id}`)
      .then((result) => {
        setSubName(result.data.result[0].subreddit.name);

        context.setPostsBySub(result.data.result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  if (!subName) {
    return <h1>This Subreddit is still empty</h1>;
  }

  return (
    <>
      <div>
        <h1>welcome to {subName} subreddit</h1>
        <div>
          <Link to={`/posts/new/${id}`}>
            <Button variant="primary" onClick={() => {}}>
              New Post
            </Button>
          </Link>
          <Button variant="primary" onClick={(e) => {
            
          }}>
            Subscribe
          </Button>
        </div>
        <PostList posts={context.postsBySub} />
      </div>
    </>
  );
};

export default PostsBySub;
