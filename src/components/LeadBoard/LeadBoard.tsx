import { ServerScores } from "./leadboard.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./leadboard.css";

export const LeadBoard = () => {
  const [leadboard, setleadboard] = useState([] as ServerScores[]);

  useEffect(() => {
    (async function () {
      toast.dark("Updating LeadBoard !", {
        position: "top-right",
        autoClose: 2000,
      });
      const res = await axios.get(
        "https://neogquizbackend.omkarborude8354.repl.co/score/getallscore"
      );
      setleadboard(res.data.scores);
    })();
  }, []);

  return (
    <>
      <div className="leadboard-card-main-div">
        <h1 className="leadboard-card-tag">LeadBoard</h1>

        <div className="leadboard-info-tag-div">
          <div className="leadboard-info-tag">UserName</div>
          <div className="leadboard-info-tag-quiz">Quiz </div>
          <div className="leadboard-info-tag-score">Score</div>
        </div>
        {leadboard.map((item) => {
          return (
            <>
              <div className="leadboard-user-score">
                <div className="leadboard-username-div">
                  {" "}
                  <p>{item.username}</p>{" "}
                </div>
                <div className="leadboard-quiz-div">
                  <p>{item.quiz}</p>
                </div>
                <div className="leadboard-score-div">
                  <p>{item.score}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
