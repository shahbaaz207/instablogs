import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
function Navbar(props) {
  function openMenu() {
    document.querySelector(".sidebar").classList.add("open");
  }
  function closeMenu() {
    document.querySelector(".sidebar").classList.remove("open");
  }
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <Link to="/create" key="1">
          Create Post
        </Link>,
        <Link to="/profile" key="2">
          Profile
        </Link>,
        <Link
          to="#"
          key="3"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/signin");
          }}
        >
          Logout
        </Link>,
      ];
    } else {
      return [
        <Link to="/signin" key="4">
          SignIn
        </Link>,
        <Link to="/signup" key="5">
          Signup
        </Link>,
      ];
    }
  };

  const slideRender = () => {
    if (state) {
      return [
        <li key="1">
          <Link to="/create">Create Post</Link>
        </li>,

        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link
          to="#"
              onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="4">
          <Link to="/signin">Sign In</Link>
        </li>,

        <li key="5">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <Link to={state ? "/" : "/signin"} style={{ marginLeft: 10 }}>
            Social App
          </Link>
        </div>

        <div className="header-links">
          {renderList()}

          <button onClick={openMenu}>
            <span className="">&#9776;</span>
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <form action="#">
          <input
            type="search"
            className="search-data"
            placeholder="Search"
            required
          />
          <button type="submit" className="fas fa-search"></button>
        </form>
        <button className="sidebar-close-button" onClick={closeMenu}>
          <span className="fas fa-tim">x</span>
        </button>
        <ul onClick={closeMenu}>{slideRender()}</ul>
      </aside>
    </div>
  );
}

export default Navbar;
