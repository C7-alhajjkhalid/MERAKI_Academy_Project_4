import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/AllPosts";
import PostsBySub from "./components/PostsBySub";
import axios from "axios";
import Subreddits from "./components/Subreddits";
import Register from "./components/Register";
import Header from "./components/Header";
import PostList from "./components/PostList";
import { Route, Routes, useNavigate } from "react-router-dom";
import Subscribed from "./components/Subscribed";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
export const GlobalContext = createContext();

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn")
  );
  const [postsBySub, setPostsBySub] = useState([]);
  const [userID, setUserID] = useState(null);
  const [posts, setPosts] = useState([]);
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  // useEffect(() => {
  //   !token && navigate("/login");
  // }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          postsBySub,
          setPostsBySub,
          setToken,
          token,
          setIsLoggedIn,
          isLoggedIn,
          userID,
          setUserID,
          posts,
          setPosts,
          subscribedPosts,
          setSubscribedPosts,
        }}
      >
        <Header />
        <div className="mainContainer">
          <div>
            <Routes>
              <Route path="/posts/find/:id" element={<Post />} />
              <Route path="/posts/new/:id" element={<PostForm />} />
              <Route path="/subreddit/:id" element={<PostsBySub />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Subreddits" element={<Subreddits />} />
              <Route path="/all" element={<Home />} />
              <Route path="/subscribed" element={<Subscribed />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
        <br />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
