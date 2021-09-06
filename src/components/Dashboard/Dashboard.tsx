import { useQuiz } from "../../QuizContext/QuizContext";
import { Link } from "react-router-dom";
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
                  <Link to={`/quiz/${quiz._id}`} key={quiz._id}>
                    <button
                      className="btn-play-now"
                      id={quiz._id}
                      onClick={() => takeQuiz(quiz._id)}
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
      <footer className="home-footer-div">
        <b>Connect With Me : </b>
        <a
          href="https://github.com/omkarborude"
          target="_blank"
          style={{ color: "inherit" }}
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://twitter.com/omkar_Borude_"
          target="_blank"
          style={{ color: "inherit" }}
        >
          <i className="fab fa-twitter-square"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/omkar-borude-b4583016b/"
          target="_blank"
          style={{ color: "inherit" }}
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </footer>
    </div>
  );
};
