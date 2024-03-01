/* eslint-disable react/prop-types */

import menuData from "../../utils/menuData/UserData";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LeftMenu = ({ data }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {data && (
        <div className="left-menu-width">
          <div className="sidebar show-sidebar">
            <div className="sidebar_list">
              <ul className="links">
                {menuData.map((link) => {
                  const {
                    id,
                    url,
                    text,
                    icon,
                    line,
                    signIn,
                    heading,
                    headingIcon,
                  } = link;
                  return (
                    <li key={id}>
                      {heading && (
                        <div className="heading d-flex align-items-center">
                          {heading}&nbsp;
                          {headingIcon && <img src={headingIcon} height={15} />}
                        </div>
                      )}
                      {url && (
                        <Link to={url}>
                          <div className="menu_image">
                            <img src={icon} alt="" />
                          </div>
                          {/* {icon}   */}
                          {text}
                        </Link>
                      )}
                      {line && <hr />}
                      {!user && signIn ? (
                        <>
                          <Link to="login">
                            <div className="signIn_message">
                              <p>
                                login to upvote videos, Share opinions,Fanscribe
                                and much more
                              </p>

                              <img
                                src="/assets/login/loginLogo.png"
                                alt=""
                                style={{ width: "50px", margin: "auto" }}
                              />
                            </div>
                          </Link>
                          <hr />
                        </>
                      ) : (
                        ""
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
      )}
    </>
  );
};

export default LeftMenu;
