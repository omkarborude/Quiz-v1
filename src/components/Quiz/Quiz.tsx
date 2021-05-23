import { useEffect } from "react";
import { useParams } from "react-router";
import { useQuiz } from "../../QuizContext/QuizContext";
import { CurrentQuestion } from "./CurrentQuestion/CurrentQuiz";

export const Quiz = () => {
  const { quizState, quizDispatch } = useQuiz();
  const { quizId }: any = useParams();

  useEffect(() => {
    const findCurrentQuiz = quizState.quiz.find((quiz) => {
      return quiz.id === quizId;
    });
    quizDispatch({ type: "LOAD_CURRENT_QUIZ", payload: findCurrentQuiz });
  }, [quizDispatch, quizId, quizState.quiz]);

  return (
    <div>
      {quizState.currentQuiz &&
      quizState.currentQuiz.questions[quizState.currentQuestionNumber] ? (
        <CurrentQuestion currentQuiz={quizState.currentQuiz} />
      ) : (
        <h3>end !</h3>
      )}
    </div>
  );
};
