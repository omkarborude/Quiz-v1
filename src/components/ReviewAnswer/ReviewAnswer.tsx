import { useQuiz } from "../../QuizContext/QuizContext";
import "./ReviewAnswer.css";
import {
  styleRightAndWrongAnswers,
  isOptionSelected,
  isRightAnswer,
} from "../../utils/utils";

export const ReviewAnswer = () => {
  const {
    quizState: { result, currentQuiz },
  } = useQuiz();

  return (
    <div className="review-answer-main-div">
      <div style={{ marginBottom: "20px" }}>
        <h3>Review Answers</h3>
      </div>

      {currentQuiz?.questions.map((quiz, index) => {
        return (
          <div key={index}>
            <div className="review-answer-question">
              {index + 1}. {quiz.question}
            </div>
            <div>
              {quiz.options.map((option) => {
                return (
                  <div
                    className={`btn-answered  ${
                      styleRightAndWrongAnswers(
                        result.resultArray,
                        option._id,
                        quiz._id
                      ) &&
                      styleRightAndWrongAnswers(
                        result.resultArray,
                        option._id,
                        quiz._id
                      )
                    }`}
                  >
                    {isOptionSelected(
                      result.resultArray,
                      option._id,
                      quiz._id
                    ) ? (
                      isRightAnswer(
                        result.resultArray,
                        option._id,
                        quiz._id
                      ) ? (
                        <div>
                          <span>{option.text}</span>
                        </div>
                      ) : (
                        <div>
                          <span>{option.text}</span>
                        </div>
                      )
                    ) : (
                      option.text
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
