import { useQuiz } from "../../QuizContext/QuizContext";
import { Result } from "../../QuizContext/quizReducer";
import "./score.css";
import { ReviewAnswer } from "../ReviewAnswer/ReviewAnswer";

export const Scoreboard = () => {
  const { quizState } = useQuiz();

  const getRightAnswers = (resultArray: Result[]): number => {
    const rightAnswers = resultArray.filter(
      (result) => result.correctOption === result.selectedOption
    );
    console.log(rightAnswers.length);

    return rightAnswers.length;
  };

  return (
    quizState.currentQuiz && (
      <>
        <div className="score-review-main-div">
          <div className="scoreboard_card">
            <h3>Your ScoreBoard </h3>
            <p>Your score is : {quizState.score}</p>
          </div>
          <div className="answered-review-div">
            <ReviewAnswer />
          </div>
        </div>
      </>
    )
  );
};
