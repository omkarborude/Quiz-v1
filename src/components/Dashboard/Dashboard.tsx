import { Link } from "react-router-dom";
import { useQuiz } from "../../QuizContext/QuizContext";
import "./dash.css";

export const Dashboard = () => {
  const { quizState, quizDispatch } = useQuiz();
  const takeQuiz = (quizId: string): any => {
    quizDispatch({
      type: "UPDATE_QUIZID",
      payload: quizId,
    });
    quizDispatch({
      type: "INITIALIZE_QUESTION_NUMBER_AND_SCORE",
    });
  };
  return (
    <div>
      <div className="quiz_card-main-div">
        {quizState.quiz.map((quiz) => {
          return (
            <div className="quiz_card-div">
              <div className="quiz_img-div">
                <img className="quiz_img" src={quiz.image} alt={quiz.topic} />
              </div>
              <div className="quiz_info">
                <div className="quiz_tag">{quiz.topic}</div>
                <div className="quiz_desc">{quiz.description}</div>
                <div className="quiz_btn-play">
                  <Link to={`/quiz/${quiz.id}`} key={quiz.id}>
                    <button
                      className="btn-play-now"
                      id={quiz.id}
                      onClick={() => takeQuiz(quiz.id)}
                    >
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
