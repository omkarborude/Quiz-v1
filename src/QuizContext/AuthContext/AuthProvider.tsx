import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import { useNavigate } from "react-router";
import { UserState } from "./context.type";
import { createContext, useContext, useState, useEffect } from "react";
import { AuthenticationContextType, LoginData } from "./context.type";

export const AuthContext = createContext({} as AuthenticationContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [isUserLogin, setLogin] = useState(false);

  const [loginData, setloginData] = useState<LoginData>(null);

  useEffect(() => {
    const localUser = localStorage?.getItem("QuizAuth");
    if (localUser) {
      const loginStatus = JSON.parse(localUser);
      loginStatus.userId && setLogin(true);
      setloginData(loginStatus);
    }
  }, []);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    try {
      toast("Logging In !", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(
        `https://neogquizbackend.omkarborude8354.repl.co/auth/login`,
        {
          email,
          password,
        }
      );

      if (data.success) {
        setLogin(true);

        const decodeResponse: {
          _id: string;
          username: string;
          iat: number;
          exp: number;
        } = jwt_decode(data.token);

        const userData = await {
          token: data.token,
          username: decodeResponse.username,
          userId: decodeResponse._id,
        };

        await setloginData(userData);
        localStorage.setItem(
          "QuizAuth",
          JSON.stringify({
            userId: decodeResponse._id,
            isUserLogin: true,
            token: data.token,
            expiresIn: decodeResponse.exp,
            username: userData.username,
          })
        );
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUpUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    toast("Creating Account !", {
      position: "top-right",
      autoClose: 2000,
    });
    try {
      const { data } = await axios.post(
        `https://neogquizbackend.omkarborude8354.repl.co/auth/signup`,
        {
          username,
          email,
          password,
        }
      );
      if (data.success) {
        setLogin(true);

        const decodeResponse: {
          _id: string;
          username: string;
          iat: number;
          exp: number;
        } = jwt_decode(data.token);

        const userData = await {
          token: data.token,
          username: decodeResponse.username,
          userId: decodeResponse._id,
        };

        await setloginData(userData);
        localStorage.setItem(
          "QuizAuth",
          JSON.stringify({
            userId: decodeResponse._id,
            isUserLogin: true,
            token: data.token,
            expiresIn: decodeResponse.exp,
            username: userData.username,
          })
        );
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  const logOutUser = async () => {
    toast("Logging Out !", {
      position: "top-right",
      autoClose: 2000,
    });
    setLogin(false);
    localStorage.removeItem("QuizAuth");
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        loginData,
        loginUser,
        signUpUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
