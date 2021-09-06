import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QuizProvider } from "./QuizContext/QuizContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./QuizContext/AuthContext/AuthProvider";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuizProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QuizProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
