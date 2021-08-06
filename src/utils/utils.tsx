import { Result } from "../QuizContext/quizReducer";
import { Quiz } from "../QuizDB/QuizDB";
import { ToastContainer, toast } from "react-toastify";
import { ServerData, serverErrorMessage, useQuiz } from "../components";
import axios, { AxiosError } from "axios";

const getAttemptedPercentage = (resultArray: Result[]): number => {
  const attemptedQuizArray = resultArray.filter((result) => result.hasTaken);
  return attemptedQuizArray.length;
};
const getRightAnswers = (resultArray: Result[]): number => {
  const rightAnswers = resultArray.filter(
    (result) => result.correctOption === result.selectedOption
  );
  return rightAnswers.length;
};
const getWrongAnswers = (resultArray: Result[]): number => {
  const wrongAnswers = resultArray.filter(
    (result) => result.correctOption !== result.selectedOption
  );
  return wrongAnswers.length;
};
const getTotalScore = (currentQuiz: Quiz | null): number => {
  const totalScore = currentQuiz?.questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  return totalScore ? totalScore : 0;
};

const getCurrentQuestion = (
  resultArray: Result[],
  quizId: string
): Result | null => {
  const currentQuestion = resultArray.find((result) => result._id === quizId);
  return currentQuestion ? currentQuestion : null;
};

const isOptionSelected = (
  resultArray: Result[],
  optionId: string,
  quizId: string
) => {
  const currentQuestion = getCurrentQuestion(resultArray, quizId);
  if (currentQuestion?.selectedOption === optionId) {
    return true;
  }
  return false;
};

const isRightAnswer = (
  resultArray: Result[],
  optionId: string,
  quizId: string
): boolean => {
  const currentQuiz = resultArray.find((result) => result._id === quizId);
  return currentQuiz?.correctOption === optionId;
};

const styleRightAndWrongAnswers = (
  resultArray: Result[],
  optionId: string,
  quizId: string
) => {
  if (isRightAnswer(resultArray, optionId, quizId)) {
    return "btn-answer-is-right";
  }
  if (
    isOptionSelected(resultArray, optionId, quizId) &&
    !isRightAnswer(resultArray, optionId, quizId)
  ) {
    return "btn-answer-is-wrong";
  }

  return "";
};

export function getAllData(quizDispatch: any) {
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
}

export {
  getAttemptedPercentage,
  getRightAnswers,
  getTotalScore,
  getWrongAnswers,
  getCurrentQuestion,
  styleRightAndWrongAnswers,
  isOptionSelected,
  isRightAnswer,
};
