import { ReviewAnswer } from "../ReviewAnswer/ReviewAnswer";
import { useQuiz } from "../../QuizContext/QuizContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../index";
import axios from "axios";
import "./score.css";

export const Scoreboard = () => {
  const { quizState } = useQuiz();
  const { loginData, isUserLogin } = useAuth();
  const navigate = useNavigate();

  const updateScore = async () => {
    try {
      toast("Saving Score !", {
        position: "top-right",
        autoClose: 2000,
      });
      const res = await axios.post(
        `https://neogquizbackend.omkarborude8354.repl.co/score/savescore/${loginData?.userId}`,
        {
          username: loginData?.username,
          quiz: quizState.currentQuiz?.topic,
          score: quizState.score,
        }
      );
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    quizState.currentQuiz && (
      <>
        <div className="score-review-main-div">
          <div className="scoreboard_card">
            <h3>Your ScoreBoard </h3>
            <p>Your score is : {quizState.score}</p>
            <div className="scorecard-submit-btn-div">
              <button
                className="btn-submit-to-server"
                onClick={() => {
                  isUserLogin ? updateScore() : navigate("/login");
                }}
              >
                Save Score <i className="fas fa-cloud-upload-alt"></i>
              </button>
            </div>
          </div>

          <div className="answered-review-div">
            <ReviewAnswer />
          </div>
        </div>
      </>
    )
  );
};
