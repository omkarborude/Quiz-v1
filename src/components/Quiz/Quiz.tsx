import { CurrentQuestion } from "./CurrentQuestion/CurrentQuiz";
import { useQuiz } from "../../QuizContext/QuizContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { rules } from "./Rules";
import "./quiz.css";

export const Quiz = () => {
  const [startQuiz, setstartQuiz] = useState(false);

  const { quizState, quizDispatch } = useQuiz();
  const { quizId }: any = useParams();

  useEffect(() => {
    const findCurrentQuiz = quizState.quiz.find((quiz) => {
      return quiz._id === quizId;
    });
    quizDispatch({ type: "LOAD_CURRENT_QUIZ", payload: findCurrentQuiz });
  }, [quizDispatch, quizId, quizState.quiz]);
  function startChecker() {
    setstartQuiz(true);
  }
  return (
    <div className="quiz-page-main-div">
      <div
        className="quiz-rules-div"
        style={{ display: startQuiz ? "none" : "block" }}
      >
        <div className="quiz-rules-rule-div">
          <h3 className="quiz-rules-tag">Quiz Rules & Instructions</h3>
          <ul className="quiz-rules-ul">
            {rules.map((rule) => (
              <li key={rule} className="quiz-rules-li">
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="quiz-rules-btn-div">
          <button onClick={startChecker} className="btn-start-quiz-rules">
            Start Quiz{" "}
          </button>
        </div>
      </div>
      <div
        className="quiz-question-main-div"
        style={{ display: startQuiz ? "block" : "none" }}
      >
        {quizState.currentQuiz &&
        quizState.currentQuiz.questions[quizState.currentQuestionNumber] ? (
          <CurrentQuestion currentQuiz={quizState.currentQuiz} />
        ) : (
          <h3>end !</h3>
        )}
      </div>
    </div>
  );
};
