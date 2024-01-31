import React, { useEffect, useState } from "react";
import "./style.css";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";
import { GiRingingBell } from "react-icons/gi";
import { RiVideoAddFill } from "react-icons/ri";
import { IoMdMic } from "react-icons/io";
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
import { getChannel } from "../../redux/featurs/channelSlice";
function Header({ toggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const userId = user?._id;

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
        <div className="header-search-box">
          <input type="text" placeholder="Search" />
          <IoSearch />
        </div>
        <div className="header-voice-search">
          <IoMdMic />
        </div>
        <div className="header-right">
          {user ? (
            <>
              <div className="header-three-dot">
                <GiRingingBell />
              </div>
              <div className="header-three-dot">
                <RiVideoAddFill onClick={() => navigate("/upload-video")} />
              </div>
              <div className="user-profile-logo">
                <img
                  src={user.avatar}
                  alt=""
                  onClick={() => setDropdown(!dropdown)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="header-three-dot">
                <BsThreeDotsVertical />
              </div>
              <Link to="login">
                <div className="user-profile">
                  <IoPersonCircleOutline />
                  <span>Sign in</span>
                </div>
              </Link>
            </>
          )}
          {dropdown && (
            <div className="login-user-details">
              <h3 className="dropdown-back">
                <IoMdArrowRoundBack onClick={() => setDropdown(!dropdown)} />{" "}
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
                      View your station
                    </Link>
                  </div>
                ) : (
                  <div className="view-chanel-option" onClick={openModal}>
                    Create your station
                  </div>
                )}
                <li>
                  <div className="dropdown-option" onClick={logout}>
                    <PiSignOutBold />
                    <p>Sign out</p>
                  </div>
                </li>
                <li>
                  <div className="dropdown-option">
                    <MdOutlineSettingsBrightness /> <p>Appearance: Dark</p>
                  </div>
                  <div className="dropdown-option">
                    <FaExclamationTriangle /> <p>Restricted Mode: Off</p>
                  </div>
                </li>
                <li>
                  <Link to="/pages/account/setting">
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
