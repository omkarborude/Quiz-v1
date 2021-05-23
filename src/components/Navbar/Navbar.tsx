import { Link } from "react-router-dom";
import "./nav.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-home">
        <div>Home</div>
      </Link>
    </nav>
  );
};
