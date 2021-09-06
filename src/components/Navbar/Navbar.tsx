import { Link } from "react-router-dom";
import { useAuth } from "../index";
import "./nav.css";

export const Navbar = () => {
  const { loginData, isUserLogin } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-home">
        <div>Home</div>
      </Link>

      <div className="nav-right-div">
        <div className="nav-right-user-div">
          <Link to="/leadboard" className="nav-home">
            <a>
              <i className="fas fa-trophy"></i>
              LeadBoard
            </a>
          </Link>
        </div>
        <div className="nav-right-user-div">
          {isUserLogin ? (
            <Link to="/account" className="nav-home">
              <a>
                <i className="fas fa-user-alt"></i>
              </a>
              {loginData?.username ? `Hi, ${loginData?.username} ` : "Login"}
            </Link>
          ) : (
            <Link to="/login" className="nav-home">
              <a>
                <i className="fas fa-user-alt"></i>
              </a>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
