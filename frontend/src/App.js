import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";
import Register from "./components/Register";
import Header from "./components/Header";
import PostList from "./components/PostList";
import { Route, Routes, useNavigate } from "react-router-dom";
export const GlobalContext = createContext();

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn")
  );
  const [userID, setUserID] = useState(null);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   !token && navigate("/login");
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((result) => {
        setPosts(result.data.result);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

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
        }}
      >
        <Header />
        <div className="mainContainer">
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
        <br />
        <PostList props={posts} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
