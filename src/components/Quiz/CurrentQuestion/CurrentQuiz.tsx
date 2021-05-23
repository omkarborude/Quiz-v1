import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../../QuizContext/QuizContext";
import { Quiz } from "../../../QuizDB/QuizDB";
import "./CurrentQuiz.css";

type Prop = {
  currentQuiz: Quiz;
};

export const CurrentQuestion = ({ currentQuiz }: Prop) => {
  const { quizState, quizDispatch } = useQuiz();
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [optionId, setOptionId] = useState<string>("");
  const nextQuestion = () => {
    if (currentQuiz) {
      quizState.currentQuestionNumber === currentQuiz.questions.length - 1
        ? quizDispatch({ type: "INCREMENT_QUESTION_NUMBER", payload: -1 })
        : quizDispatch({ type: "INCREMENT_QUESTION_NUMBER" });
    }
    setDisableButtons(false);
    if (!optionId) {
      quizDispatch({
        type: "UPDATE_RESULT",
        payload: {
          id: currentQuiz.questions[quizState.currentQuestionNumber].id,
          hasTaken: false,
          selectedOption: "",
          correctOption: currentQuiz.questions[
            quizState.currentQuestionNumber
          ].options.find((option) => option.isRight)?.id,
        },
      });
    }
    setOptionId("");
  };

  const isRightAnswer = (isRight: boolean, selectedOption: string) => {
    if (isRight) {
      quizDispatch({
        type: "UPDATE_SCORE",
        payload: {
          points:
            currentQuiz?.questions[quizState.currentQuestionNumber].points,
        },
      });
    } else {
      quizDispatch({
        type: "UPDATE_SCORE",
        payload: {
          points:
            currentQuiz?.questions[quizState.currentQuestionNumber]
              .negativePoints,
        },
      });
    }
    setOptionId(selectedOption);
    setDisableButtons((disableButtons) => !disableButtons);
    quizDispatch({
      type: "UPDATE_RESULT",
      payload: {
        id: currentQuiz.questions[quizState.currentQuestionNumber].id,
        hasTaken: true,
        selectedOption: selectedOption,
        correctOption: currentQuiz.questions[
          quizState.currentQuestionNumber
        ].options.find((option) => option.isRight)?.id,
      },
    });
  };

  const answerSelectionStyle = (
    isRight: boolean,
    selectedButtonId: string
  ): string => {
    if (isRight && selectedButtonId === optionId) {
      return "btn-answer-is-right";
    }
    if (!isRight && selectedButtonId === optionId) {
      return "btn-answer-is-wrong ";
    }
    return "";
  };

  const viewScore = () => {
    if (!optionId) {
      quizDispatch({
        type: "UPDATE_RESULT",
        payload: {
          id: currentQuiz.questions[quizState.currentQuestionNumber].id,
          hasTaken: false,
          selectedOption: "",
          correctOption: currentQuiz.questions[
            quizState.currentQuestionNumber
          ].options.find((option) => option.isRight)?.id,
        },
      });
    }
  };
  return (
    <div className="question_div-main">
      <div className="question-card-topic">{`${currentQuiz.topic} quiz`}</div>

      <div className="">
        <div className="question-div">
          {currentQuiz.questions[quizState.currentQuestionNumber].question}
        </div>
        <div className="btn-answer-div">
          {currentQuiz.questions[quizState.currentQuestionNumber].options.map(
            (option) => {
              return (
                <button
                  className={`btn-answer  ${answerSelectionStyle(
                    option.isRight,
                    option.id
                  )}`}
                  key={option.id}
                  onClick={() => isRightAnswer(option.isRight, option.id)}
                  disabled={disableButtons}
                >
                  {option.text}
                </button>
              );
            }
          )}
        </div>
      </div>
      {quizState.currentQuestionNumber === currentQuiz.questions.length - 1 ? (
        <Link to={`/quiz/${currentQuiz.id}/Scoreboard`}>
          <button className="btn-next-question" onClick={viewScore}>
            Submit !
          </button>
        </Link>
      ) : (
        <button className="btn-next-question" onClick={nextQuestion}>
          Next <i className="fas fa-arrow-circle-right"></i>
        </button>
      )}
    </div>
  );
};
