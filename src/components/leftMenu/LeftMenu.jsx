import { FaRegUserCircle } from "react-icons/fa";
import menuData from "../../utils/menuData/UserData"
import "./sidebar.css";
import { Link } from "react-router-dom";
const LeftMenu = ({ data }) => {
  return (
    <>
      {data &&
        <div className="left-menu-width">
          <div className="sidebar show-sidebar">
            <div className="sidebar_list">
              <ul className="links">
                {menuData.map((link) => {
                  const { id, url, text, icon, line, signIn, heading } = link;
                  return (
                    <li key={id}>
                      {heading && <div className="heading">{heading}</div>}
                      {url && <Link to={url}>
                        {icon}
                        {text}
                      </Link>}
                      {line && <hr />}
                      {signIn && (
                        <>
                          <div className="signIn_message">
                            <p>Sign in to like videos, comment, and subscribe.</p>
                            <button className="signIn_button mt-2">
                              <FaRegUserCircle />
                              Sign in
                            </button>
                          </div>
                          <hr />
                        </>
                      )}
                    </li>
                  );
                })}
                <li>
                  <div className="sidebar_footer mt-2">
                    <p>@ 2024 MadeXtUBE LLC</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LeftMenu;
