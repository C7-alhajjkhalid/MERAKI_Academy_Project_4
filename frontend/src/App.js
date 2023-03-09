import "./App.css";
import React, { useState, createContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import PostList from "./components/PostList";
import { Route, Routes } from "react-router-dom";
export const GlobalContext = createContext();

function App() {
  return (
    <>
      <GlobalContext.Provider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
