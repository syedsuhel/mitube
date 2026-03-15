import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({ handleSearch }) => {
  return (
    <nav className="navbar bg-body-tertiary" href="#">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center"
              style={navStyle}
            >
              <div style={logosty}></div>
            </div>
            Mi
            <div className="text-danger">
              Tube{" "}
              <span style={{ fontSize: "8px", color: "#000000" }}>mini</span>
            </div>
          </div>
        </Link>

        <SearchBar handleSearch={handleSearch} />
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: "#ff0000",
  width: "30px",
  height: "20px",
  borderRadius: "22%",
  aspectRatio: "3/2",
  clipPath: "ellipse(100% 50%)",
  display: "inline-block",
  marginRight: "4px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "500",
};
const logosty = {
  width: "5px",
  height: "5px",
  backgroundColor: "#ffffff",
  display: "inline-block",
  clipPath: "polygon(100% 50%, 0 0, 0 100%)",
};
export default Navbar;
