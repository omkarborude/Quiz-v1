import React, { createContext, useContext, useReducer } from "react";
import { quizReducer } from "./quizReducer";
import { Quiz, quizdatabase, QuizDatabase } from "../QuizDB/QuizDB";
import { initialStates, initialStateType } from "./quizReducer";

const QuizContext = createContext<{
  quizState: initialStateType;
  quizDispatch: React.Dispatch<any>;
}>({
  quizState: initialStates,
  quizDispatch: () => null,
});

export const QuizProvider: React.FC = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, initialStates);
  return (
    <QuizContext.Provider value={{ quizState, quizDispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
