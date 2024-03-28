/* eslint-disable react/prop-types */

import menuData from "../../utils/menuData/UserData";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setmenu } from "../../utils/globalFunction/GlobalFunctionSlice";

const LeftMenu = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);

  const openSidebar = () => {
    dispatch(setmenu(!isSidebarOpen));
  };

  const forMobileResponse = window.screen.width;
  {
    forMobileResponse > 769 ? <br /> : "";
  }

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
                    <li
                      key={id}
                      className={url === location.pathname ? "active" : ""}
                    >
                      {heading && (
                        <div className="heading d-flex align-items-center">
                          {heading}&nbsp;
                          {headingIcon && <img src={headingIcon} height={15} />}
                        </div>
                      )}
                      {url && (
                        <Link
                          to={`${url}?image=${encodeURIComponent(
                            icon
                          )}&text=${encodeURIComponent(text)}`}
                          onClick={forMobileResponse < 769 ? openSidebar : ""}
                        >
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
