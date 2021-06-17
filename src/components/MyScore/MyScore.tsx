import { useEffect, useState } from "react";
import { userScore } from "./myscore.type";
import { toast } from "react-toastify";
import axios from "axios";
import "./myscore.css";

import { useAuth } from "../index";
export const MyScore = () => {
  const { isUserLogin, loginData } = useAuth();
  const [userScores, setuserScores] = useState([] as userScore[]);
  useEffect(() => {
    (async function () {
      toast("Updating Score !", {
        position: "top-right",
        autoClose: 2000,
      });
      const res = await axios.get(
        `https://neogquizbackend.omkarborude8354.repl.co/score/userscore/${loginData?.userId}`
      );
      setuserScores(res.data.scores);
    })();
  }, [isUserLogin]);

  return (
    <>
      <div className="my-scor-card-main-div">
        <h1 className="my-scor-tag">My Score</h1>

        <div className="my-score-info-tag-div">
          <div className="my-score-info-tag">Quiz Name</div>
          <div className="my-score-info-score">Score</div>
          <div className="my-score-info-tag-time">Time</div>
        </div>
        {userScores.map((item) => {
          return (
            <>
              <div className="myscore-user-score">
                <div className="myscore-quiz">
                  <p>{item.quiz}</p>
                </div>
                <div className="myscore-score">
                  <p>{item.score}</p>
                </div>
                <div className="myscore-time">
                  <p>{item.updatedAt}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
