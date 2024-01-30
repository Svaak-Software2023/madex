import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Loading from "../../assets/loader/Loading";
import { getChannel } from "../../redux/featurs/channelSlice";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";
import "./style.css";
import VideoList from "../../components/videoList/VideoList";

const menus = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "Playlists",
  },
  {
    id: 3,
    name: "Shorts",
  },
];

const YourChannel = () => {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { data: channelData, loading: channelLoading } = useSelector(
    (state) => state.channel
  );

  const [activeTab, setActiveTab] = useState(1);
  console.log("Active Tab:", activeTab);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const videoData = useSelector((state) => state.video.videoData);

  // console.log(videoData);
  const dispatch = useDispatch();

  useEffect(() => {
      user&&dispatch(getChannel(user._id));
      channelData&&dispatch(getAllChanelVideo(channelData._id));
  }, []);

  useEffect(() => {
    channelData&&dispatch(getAllChanelVideo(channelData._id));
}, [channelData]);

  if (authLoading || channelLoading) return <Loading />;

  return (
    user && (
      <div className="px-sm-3">
        <div className="channel_profile">
          <div className="profile_img">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="profile_details">
            <h3>{channelData?.channelName}</h3>
            <span>@{user.username}</span>
            <p>
              More about this station <IoIosArrowForward />
            </p>
            <div className="profile_buttons">
              <button>Customize station</button>
              <button>Manage videos</button>
            </div>
          </div>
        </div>

        <div className="videos_container">
          <div className="btn-container">
            {menus.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(item.id)}
                  className={`job-btn ${
                    activeTab === index + 1 && "active-btn"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}

            <FaSearch className="search_icon" />
          </div>

          {/* <div className="header">
            <ul className="header_list">
              <li>
                <h2>Home</h2>
              </li>
              <li>
                <FaSearch className="search_icon" />
              </li>
            </ul>
          </div> */}

          <div className="videos_list mb-3">
            {videoData ? (
              <div className="my-3 w-100">
                <VideoList data={videoData} />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <Link to="/upload-video">
                  <div className="create_content">
                    <div className="content_img">
                      <img src="/assets/channel/create_content.svg" alt="" />
                    </div>
                    <h3>Create content on any device</h3>
                    <p>
                      Upload and record at home or on the go. Everything you
                      make public will appear here.
                    </p>
                    <button>Create</button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default YourChannel;
