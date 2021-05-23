import { Quiz, quizdatabase, QuizDatabase } from "../QuizDB/QuizDB";

export type Result = {
  id: string;
  hasTaken: boolean;
  selectedOption: string;
  correctOption: string;
};

export type initialStateType = {
  quiz: Quiz[];
  currentQuestionNumber: number;
  score: number;
  result: {
    quizId: string;
    resultArray: Result[];
  };
  currentQuiz: null | Quiz;
};

export const initialStates: initialStateType = {
  quiz: quizdatabase,
  currentQuestionNumber: -1,
  score: 0,
  result: {
    quizId: "",
    resultArray: [],
  },
  currentQuiz: null,
};

export type ActionType =
  | { type: "LOAD_QUIZ"; payload: QuizDatabase }
  | { type: "INCREMENT_QUESTION_NUMBER"; payload?: number }
  | { type: "UPDATE_SCORE"; payload: { points: number } }
  | { type: "INITIALIZE_QUESTION_NUMBER_AND_SCORE" }
  | { type: "UPDATE_RESULT"; payload: Result }
  | { type: "UPDATE_QUIZID"; payload: string }
  | { type: "LOAD_CURRENT_QUIZ"; payload: Quiz };

export const quizReducer = (
  state: initialStateType,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "LOAD_QUIZ":
      return {
        ...state,
        quiz: action.payload,
      };
    case "INCREMENT_QUESTION_NUMBER":
      const currentQuestionNumberTemp = state.currentQuestionNumber + 1;
      return {
        ...state,
        currentQuestionNumber: currentQuestionNumberTemp,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: state.score + action.payload.points,
      };
    case "INITIALIZE_QUESTION_NUMBER_AND_SCORE":
      return {
        ...state,
        currentQuestionNumber: 0,
        score: 0,
      };
    case "UPDATE_RESULT":
      return {
        ...state,
        result: {
          ...state.result,
          resultArray: [...state.result?.resultArray, action.payload],
        },
      };
    case "UPDATE_QUIZID":
      return {
        ...state,
        result: { ...state.result, quizId: action.payload, resultArray: [] },
      };
    case "LOAD_CURRENT_QUIZ":
      return { ...state, currentQuiz: action.payload };
    default:
      return state;
  }
};
