import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/AllPosts";
import axios from "axios";
import Register from "./components/Register";
import Header from "./components/Header";
import PostList from "./components/PostList";
import { Route, Routes, useNavigate } from "react-router-dom";
import Subscribed from "./components/Subscribed";
export const GlobalContext = createContext();

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn")
  );
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
              <Route path="/login" element={<Login />} />
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
