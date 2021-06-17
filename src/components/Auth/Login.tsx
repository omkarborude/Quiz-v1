import { useAuth } from "../index";
import { useState } from "react";
import "./login.css";

export const Login = () => {
  const { loginUser, signUpUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showloginsignup, setshowloginsignup] = useState(true);

  //   using useState instead of FORM
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  return (
    //   Login main card div
    <div className="login-main-card-div">
      {/* left black div */}
      <div className="login-card-left-black-div">
        <div className="login-card-left-info-div">
          <h2>
            Welcome to Neog Quiz <i className="fas fa-question-circle"></i>
          </h2>
          <p>__________________________________________</p>
          <div className="login-card-left-info-lorem">
            <p>
              it is a long established fact duadbdatht a reader will be
              distracted by therotic readable content of auncl page when looking
              at its layout. The diibution look like that of readable English.
            </p>
          </div>
          <p>______________________________</p>
          <button className="btn-login-card-knowmore">know More</button>
        </div>
      </div>

      {/* right login / signup div */}

      {showloginsignup ? (
        <div className="login-card-right-login-div">
          <h1 className="login-card-login-tag">Login</h1>
          <div className="login-card-input-main-div">
            <div className="login-card-input-email-div">
              <input
                placeholder="Email"
                className="login-card-input-email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="login-card-input-passowrd-div">
              <input
                placeholder="Password"
                className="login-card-input-passowrd"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                onClick={() => setShowPassword((state) => !state)}
                className="show-password-icon"
              >
                {showPassword ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </a>
            </div>
            <div className="login-card-login-btn-div">
              <button
                className="btn-login-card-login"
                onClick={() => {
                  loginUser(email, password);
                  setPassword("");
                  setemail("");
                }}
              >
                Login
              </button>
            </div>
            <div>
              <p
                className="login-card-signup"
                onClick={() => setshowloginsignup(false)}
              >
                create new account{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-card-right-login-div signup-anim-class">
          <h1 className="login-card-login-tag">Create your Account</h1>
          <div className="login-card-input-main-div">
            <div className="login-card-input-email-div">
              <input
                placeholder="Email"
                className="login-card-input-email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="login-card-input-username-div">
              <input
                placeholder="User Name"
                className="login-card-input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-card-input-passowrd-div">
              <input
                placeholder="Password"
                className="login-card-input-passowrd"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                onClick={() => setShowPassword((state) => !state)}
                className="show-password-icon"
              >
                {showPassword ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </a>
            </div>
            <div className="login-card-login-btn-div">
              <button
                className="btn-login-card-login"
                onClick={() => {
                  signUpUser(email, password, username);
                  setUsername("");
                  setPassword("");
                  setemail("");
                }}
              >
                SignUp
              </button>
            </div>
            <div>
              <p
                className="login-card-signup"
                onClick={() => setshowloginsignup(true)}
              >
                Have an Account Already?{" "}
              </p>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};
