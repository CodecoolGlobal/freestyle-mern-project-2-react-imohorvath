import { Outlet, Link, useLocation } from "react-router-dom";
import planelogo from "../../img/paper-plane.png";

import "./Header.css";

const Header = ({ deleteClicked, setDeleteClicked }) => {
  let location = useLocation();

  function HeaderButton({ route, onClickEvent, children }) {
    return (
      <button
        className={
          location.pathname === route
            ? "nav-button nav-button-active"
            : "nav-button"
        }
        onClick={onClickEvent}
      >
        <Link to={route} className="link">
          {children}
        </Link>
      </button>
    );
  }

  return (
    <>
      <div className="header">
        <div className="logo-section">
          <img src={planelogo} className="main-logo" alt="planelogo" />
          <h1>Travel Bucketlist</h1>
        </div>
        <div className="navbar">
          <HeaderButton route="/">Cities</HeaderButton>
          <HeaderButton
            route="/bucketlist"
            onClickEvent={() => setDeleteClicked(!deleteClicked)}
          >
            Bucket List
          </HeaderButton>
          <HeaderButton route="/contactus">Contact Us</HeaderButton>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
