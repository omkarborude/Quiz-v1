import { useState } from "react";
import { useAuth } from "../../QuizContext/AuthContext/AuthProvider";
import "./login.css";

export const LoginGuest = () => {
  const { loginUser } = useAuth();
  const [email, setemail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");
  return (
    <div className="guest-login-div">
      <button
        onClick={() => {
          loginUser(email, password);
        }}
      >
        Login as Guest
      </button>
    </div>
  );
};
