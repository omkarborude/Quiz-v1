import { useQuiz } from "../../../QuizContext/QuizContext";
import { Quiz } from "../../../QuizDB/QuizDB";
import { Timer } from "../../Timer/Timer";
import { Link } from "react-router-dom";
import { useState } from "react";
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
          _id: currentQuiz.questions[quizState.currentQuestionNumber]._id,
          hasTaken: false,
          selectedOption: "",
          correctOption: currentQuiz.questions[
            quizState.currentQuestionNumber
          ].options.find((option) => option.isRight)?._id,
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
        type: "DEC_SCORE",
        payload: {
          points: 2,
        },
      });
    }
    setOptionId(selectedOption);
    setDisableButtons((disableButtons) => !disableButtons);
    quizDispatch({
      type: "UPDATE_RESULT",
      payload: {
        _id: currentQuiz.questions[quizState.currentQuestionNumber]._id,
        hasTaken: true,
        selectedOption: selectedOption,
        correctOption: currentQuiz.questions[
          quizState.currentQuestionNumber
        ].options.find((option) => option.isRight)?._id,
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
          _id: currentQuiz.questions[quizState.currentQuestionNumber]._id,
          hasTaken: false,
          selectedOption: "",
          correctOption: currentQuiz.questions[
            quizState.currentQuestionNumber
          ].options.find((option) => option.isRight)?._id,
        },
      });
    }
  };

  return (
    <div className="question_div-main">
      <div className="question-card-topic">
        {`${currentQuiz.topic} quiz`}
        {Timer}
      </div>

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
                    option._id
                  )}`}
                  key={option._id}
                  onClick={() => isRightAnswer(option.isRight, option._id)}
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
        <Link to={`/quiz/${currentQuiz._id}/Scoreboard`}>
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
