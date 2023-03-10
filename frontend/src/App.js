import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Login from "./components/Login";

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

  // useEffect(() => {
  //   !token && navigate("/login");
  // }, []);
  const Lists = [
    { id: 5, name: "hello", description: "theDescription" },
    { id: 6, name: "hello2", description: "theDescription2" },
  ];
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
        <PostList posts={Lists} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
