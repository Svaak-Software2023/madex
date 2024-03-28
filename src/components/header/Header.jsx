/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  MdOutlineHelpOutline,
  MdOutlineSettings,
  MdOutlineSettingsBrightness,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/featurs/authSlice";
import ChannelModal from "./ChannelModal";
import { setRestrictedMode } from "../../utils/globalFunction/GlobalFunctionSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";

function Header({ toggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const restrictionMode = useSelector(
    (state) => state.globalFunction.restrictedMode
  );
  const logout = () => {
    dispatch(setLogout());
    setDropdown(false);
  };

  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    setDropdown(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { pathname } = useLocation();

  useEffect(() => {
    setDropdown(false);
  }, [pathname]);

  const channel = useSelector((state) => state.channel);

  return (
    <>
      <div className="header-main">
        {/* Toggle */}
        <div className="menu-bar">
          <span className="">
            <IoMenu onClick={toggle} />
          </span>
          <Link to="/">
            <div className="logo">
              <img
                src="/assets/logo.png"
                alt="Logo"
                width={100}
                height={50}
                layout="responsive"
              />
            </div>
          </Link>
        </div>
        <div className="search_content">
          <div className="header-search-box">
            <input type="text" placeholder="Search" />
            <IoSearch />
          </div>
          <div className="header-three-dot" data-tooltip-id="my-tooltip-0">
            <img src="assets/icons/mic.png" alt="" />
          </div>
          {/* <div className="header-voice-search">
            <img src="/assets/icons/mic.png" alt="" />
          </div> */}
          <ReactTooltip
            id="my-tooltip-0"
            place="bottom"
            content="Speak to Search"
            className="tooltip_style"
          />
        </div>
        <div className="header-right">
          {user ? (
            <>
              <div className="header-three-dot" data-tooltip-id="my-tooltip-1">
                <img
                  src="assets/icons/camera.png"
                  alt=""
                  onClick={() => navigate("/upload-video")}
                />
              </div>
              <div className="header-three-dot" data-tooltip-id="my-tooltip-2">
                <img src="assets/icons/chatRoom.png" alt="" />
              </div>
              <div className="header-three-dot" data-tooltip-id="my-tooltip-3">
                <img src="assets/icons/standCamera2.png" alt="" />
              </div>
              <div className="header-three-dot" data-tooltip-id="my-tooltip-4">
                <img src="assets/icons/notification.png" alt="" />
              </div>
              <div className="header-three-dot" data-tooltip-id="my-tooltip-5">
                <img src="assets/icons/chat.png" alt="" />
              </div>
              <div className="user-profile-logo">
                <img
                  src={user.avatar}
                  alt=""
                  onClick={() => setDropdown(!dropdown)}
                />
              </div>
              <ReactTooltip
                id="my-tooltip-1"
                place="bottom"
                content="Upload Video"
                className="tooltip_style"
              />
              <ReactTooltip
                id="my-tooltip-2"
                place="bottom"
                content="Chatroom"
                className="tooltip_style"
              />
              <ReactTooltip
                id="my-tooltip-3"
                place="bottom"
                content="Live"
                className="tooltip_style"
              />
              <ReactTooltip
                id="my-tooltip-4"
                place="bottom"
                content="Notification"
                className="tooltip_style"
              />
              <ReactTooltip
                id="my-tooltip-5"
                place="bottom"
                content="Instant Message"
                className="tooltip_style"
              />
            </>
          ) : (
            <>
              <div className="header-moreOption-dot">
                <BsThreeDotsVertical onClick={() => setDropdown2(!dropdown2)} />
              </div>
              {dropdown2 && (
                <div className="dropdown2-menus">
                  <div className="container">
                    <ul className="mt-3 dropdown-menu-list">
                      <li>
                        <div className="dropdown-option">
                          <MdOutlineSettingsBrightness />
                          &nbsp;
                          <p>Appearance: Dark</p>
                        </div>
                        <div
                          className="dropdown-option"
                          onClick={() => dispatch(setRestrictedMode())}
                        >
                          <FaExclamationTriangle />
                          &nbsp;
                          <p>
                            Restricted Mode:
                            {restrictionMode === false ? "Off" : "On"}
                          </p>
                        </div>
                      </li>
                      <li>
                        <Link to="/pages/account/setting">
                          <div className="dropdown-option">
                            <MdOutlineSettings />
                            &nbsp; <p>Settings</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <Link to="login">
                <div className="user-profile">
                  <img src="/assets/login/loginLogo.png" alt="" />
                  {/* <IoPersonCircleOutline />
                  <span>Sign in</span> */}
                </div>
              </Link>
            </>
          )}
          {dropdown && (
            <div className="login-user-details ">
              <h3 className="dropdown-back">
                <IoMdArrowRoundBack onClick={() => setDropdown(!dropdown)} />
                <span>Accounts</span>
              </h3>

              <ul className="mt-3 dropdown-menu-list">
                <div className="user-details">
                  <div className="profile">
                    <img src={user.avatar} alt="kdk" />
                  </div>
                  <div className="username">
                    <h3>{user.fullName}</h3>
                    <p>@{user.username}</p>
                  </div>
                </div>
                {channel.data ? (
                  <div className="view-chanel-option">
                    <Link to="/your-channel" className="text-primary">
                      My Station
                    </Link>
                  </div>
                ) : (
                  <div className="view-chanel-option" onClick={openModal}>
                    Develop station
                  </div>
                )}
                <li>
                  <div className="dropdown-option" onClick={logout}>
                    <PiSignOutBold />
                    <p>Log out</p>
                  </div>
                </li>
                <li>
                  <div className="dropdown-option">
                    <MdOutlineSettingsBrightness /> <p>Appearance : Dark</p>
                  </div>
                  <div
                    className="dropdown-option"
                    onClick={() => dispatch(setRestrictedMode())}
                  >
                    <FaExclamationTriangle />{" "}
                    <p>
                      View Opinions : &nbsp;
                      {restrictionMode === false ? "Off" : "On"}
                    </p>
                  </div>
                </li>
                <li>
                  <Link to="/setting">
                    <div className="dropdown-option">
                      <MdOutlineSettings /> <p>Settings</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-option">
                    <MdOutlineHelpOutline /> <p>Help</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Channel Modal */}
        <ChannelModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          setDropdown={setDropdown}
          closeModal={closeModal}
          afterOpenModal={afterOpenModal}
        />
      </div>
    </>
  );
}

export default Header;
