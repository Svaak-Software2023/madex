/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineSettings, MdOutlineSettingsBrightness } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { BiSolidCommentX } from "react-icons/bi";
import { BiSolidCommentCheck } from "react-icons/bi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import ChannelModal from "./ChannelModal";
import { setRestrictedMode } from "../../utils/globalFunction/GlobalFunctionSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import axios from "axios";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getSearchedData } from "../../redux/features/searchVideo";
import ListenLoader from "../../assets/loader/ListenLoader";
import { MdLiveHelp } from "react-icons/md";
import Notification from "../notification/Notification";
import { getNotifications } from "../../redux/features/notificationSlice";


// import { API } from "../../redux/api";

function Header({ toggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  // notification Dropdown 
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const restrictionMode = useSelector(
    (state) => state.globalFunction.restrictedMode
  );

  const searchedData = useSelector((state) => state.search.searchedData);

  const logout = () => {
    dispatch(setLogout());
    setDropdown(false);
  };

  // Search Funcationallty

  const [searchBox, setSearchBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundVideo, setFoundVideo] = useState([]);
  const [disableInput, setDisableInput] = useState(false);

  // console.log("Searched Data", foundVideo);

  const loca = window.location.hash;
  useEffect(() => {
    if (!loca || loca === "#/") {
      setDisableInput(true);
      setSearchTerm("");
    } else {
      setListen(false);
      setDisableInput(false);
    }
  }, [loca]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(getSearchedData({ searchTerm: searchTerm }));
      setFoundVideo(searchedData);

      // findTheVideo();
    } else {
      setFoundVideo([]);
    }

  }, [searchTerm]);

  function inputHandler(e) {
    let inputValue = e.target.value;
    setSearchTerm(inputValue);
    setSearchBox(inputValue.trim().length > 0);
  }
  function searchPage(e) {
    if (searchTerm) {
      const SearchValue = searchTerm.replace(/\//g, "");
      if (e.key === "Enter") {
        navigate(`/searchPage/${SearchValue}`);
        setSearchBox(false);
      }
      if (e.type === "click") {
        navigate(`/searchPage/${SearchValue}`);
        setSearchBox(false);
      }
      if (e === "micSubmit") {
        navigate(`/searchPage/${SearchValue}`);
        setSearchBox(false);
      }
    }
  }

  // Mic Funcationality
  const [listen, setListen] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    onEnd: () => {
      if (listen) {
        SpeechRecognition.stopListening();
        setListen(false);
      }
    },
  });
  function listenHandler() {
    if (!listen) {
      SpeechRecognition.startListening();
      resetTranscript();
    } else {
      SpeechRecognition.stopListening();
      setSearchTerm(transcript);
    }
    setListen(!listen);
  }

  useEffect(
    () => {
      if (transcript) {
        setSearchTerm(transcript);
        searchPage("micSubmit");
      }
    },
    [transcript],
    1000
  );

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
              // layout="responsive"
              />
            </div>
          </Link>
        </div>
        <div className="search_content position-relative">
          <div
            className="header-search-box"
            style={{ background: `${disableInput ? "#d3d3d3" : ""}` }}
          >
            <input
              type="text"
              style={{ background: `${disableInput ? "#d3d3d3" : ""}` }}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => inputHandler(e)}
              onKeyDown={(e) => {
                searchPage(e);
              }}
              disabled={disableInput}
            />
            <IoSearch
              onClick={(e) => {
                searchPage(e);
              }}
            />
            {searchBox && (
              <div className="header-search-results">
                {foundVideo?.slice(0, 10).map((item, index) => (
                  <div key={index}>
                    <Link
                      to={`/video/${item?._id}`}
                      onClick={() => {
                        setSearchBox(!searchBox);
                      }}
                    >
                      {item?.title.slice(0, 60)}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          {listening ? (
            <ListenLoader />
          ) : (
            <div
              className="header-three-dot"
              data-tooltip-id="my-tooltip-0"
              onClick={listenHandler}
            >
              <img src="assets/icons/mic.png" alt="" />
            </div>
          )}

          {/* <div
            className="header-three-dot"
            data-tooltip-id="my-tooltip-0"
            onClick={listenHandler}
            style={{ filter: listen ? "none" : "greyScale(100%)" }}
          >
            <img src="assets/icons/mic.png" alt="" />
          </div> */}

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
              <div className="header-three-dot position-relative" >
                <img src="assets/icons/notification.png" alt="" data-tooltip-id="my-tooltip-4"
                  onClick={() => setNotificationDropdown(!notificationDropdown)} />
                <Notification notificationDropdown={notificationDropdown} />
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
                content="chat room"
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
                content="chat"
                className="tooltip_style"
              />
            </>
          ) : (
            <>
              <div className="header-moreOption-dot">
                <BsThreeDotsVertical onClick={() => setDropdown2(!dropdown2)} />
              </div>

              {dropdown2 && (
                <>
                  <div
                    className="modal_wrapper"
                    onClick={() => setDropdown(!dropdown2)}
                  ></div>

                  <div className="dropdown2-menus">
                    <div className="container">
                      <ul className="mt-3 dropdown-menu-list">
                        <li>
                          {/* <div className="dropdown-option">
                              <MdOutlineSettingsBrightness />
                              &nbsp;
                              <p>Appearance: Dark</p>
                            </div> */}
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
                </>
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
            <>
              <div
                className="modal_wrapper"
                onClick={() => setDropdown(!dropdown)}
              ></div>
              {/* <div className="modal_container"> */}
              <div className="login-user-details">
                <ul className="mt-3 dropdown-menu-list">
                  <div className="user-details">
                    <div className="profile">
                      <img src={user.avatar} alt="kdk" />
                    </div>
                    <div className="username">
                      <h3>{user.fullName}</h3>
                      <p>@{user.username}</p>
                      {channel.data ? (
                        <div className="view-chanel-option">
                          <Link to="/your-channel">My Station</Link>
                        </div>
                      ) : (
                        <div className="view-chanel-option" onClick={openModal}>
                          Develop station
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {channel.data ? (
                    <div className="view-chanel-option">
                      <Link to="/your-channel">My Station</Link>
                    </div>
                  ) : (
                    <div className="view-chanel-option" onClick={openModal}>
                      Develop station
                    </div>
                  )} */}

                  {/* <li>
                    <div className="dropdown-option">
                      <MdOutlineSettingsBrightness /> <p>Appearance : Dark</p>
                    </div>
                  </li> */}
                  <li>
                    <div
                      className="dropdown-option"
                      onClick={() => dispatch(setRestrictedMode())}
                    >
                      {restrictionMode === false ? (
                        <BiSolidCommentX />
                      ) : (
                        <BiSolidCommentCheck />
                      )}
                      <p>
                        View Opinions : &nbsp;
                        {restrictionMode === false ? "Off" : "On"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <Link to="/setting">
                      <div className="dropdown-option">
                        <GrUserSettings /> <p>Settings</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown-option">
                      <MdLiveHelp /> <p>Help</p>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-option" onClick={logout}>
                      <PiSignOutBold />
                      <p>Log out</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* </div> */}
            </>
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
