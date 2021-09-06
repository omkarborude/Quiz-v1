import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import "./App.css";
import {
  Account,
  LeadBoard,
  MyScore,
  Scoreboard,
  Dashboard,
  Login,
  Navbar,
  Quiz,
  useQuiz,
  ServerData,
  serverErrorMessage,
  PrivateRoute,
} from "./components/index";
import { getAllData } from "./utils/utils";

export default function App() {
  const { quizState, quizDispatch } = useQuiz();

  useEffect(() => {
    getAllData(quizDispatch);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/quiz/:quizId" element={<Quiz />}></Route>
        <Route path="/quiz/:quizId/Scoreboard" element={<Scoreboard />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <PrivateRoute path="/account" element={<Account />}></PrivateRoute>
        <Route path="/leadboard" element={<LeadBoard />}></Route>
        <PrivateRoute path="/myscore" element={<MyScore />}></PrivateRoute>
      </Routes>
      <ToastContainer />
    </div>
  );
}
