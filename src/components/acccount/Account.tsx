import { useNavigate } from "react-router-dom";
import { useAuth } from "../index";
import "./account.css";

export const Account = () => {
  const navigate = useNavigate();

  const { isUserLogin, loginData, logOutUser } = useAuth();

  return (
    <div className="profile-main-div">
      <div className="inner-main-div">
        <h3 className="accound-tag">
          Hello, <span>{loginData?.username}</span>
        </h3>
        <div className="profile-info">
          <div className="profile-pic">
            <i className="far fa-id-badge"></i>
          </div>

          <div className="user-info">
            <div className="username-div">
              <p className="info-name">User Name</p>
              <p>{loginData?.username}</p>
            </div>
            <div className="username-div">
              <p className="info-name">User Id</p>
              <p>{loginData?.userId}</p>
            </div>
          </div>
        </div>
        <div className="acccount-data-div">
          <div>
            <button
              className="btn-account-my-orders"
              onClick={() => navigate("/myscore")}
            >
              My Score's <i className="fas fa-question-circle"></i>
            </button>
          </div>
        </div>

        <div className="btn-logout-div">
          <button className="btn-logout" onClick={logOutUser}>
            Log out <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
