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

export default function App() {
  const { quizState, quizDispatch } = useQuiz();

  useEffect(() => {
    (async (): Promise<ServerData | serverErrorMessage> => {
      try {
        toast("Loading Quiz !", {
          position: "top-right",
          autoClose: 3000,
        });
        const response = await axios.get<ServerData>(
          `https://neogquizbackend.omkarborude8354.repl.co/quiz/getquiz`
        );
        quizDispatch({
          type: "LOAD_QUIZ",
          payload: response.data.questionlist,
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<serverErrorMessage>;
          if (serverError && serverError.response)
            return serverError.response.data;
        }
        return { errorMessage: "server down" };
      }
    })();
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
