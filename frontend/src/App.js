import "./App.css";
import React, { useState, createContext } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import PostList from "./components/PostList";
import { Route, Routes } from "react-router-dom";
export const GlobalContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn")
  );
  const [userID, setUserID] = useState(null);
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
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </div>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
