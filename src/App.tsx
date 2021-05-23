import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Route, Routes } from "react-router";
import { Quiz } from "./components/Quiz/Quiz";
import { Scoreboard } from "./components/Scoreboard/Scoreboard";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/quiz/:quizId" element={<Quiz />}></Route>
        <Route path="/quiz/:quizId/Scoreboard" element={<Scoreboard />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
