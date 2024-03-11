import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Loading from "../../assets/loader/Loading";
import { getChannel } from "../../redux/featurs/channelSlice";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";
import "./style.css";
// import Playlist from "../playlist/Playlist";
import HomeContent from "./channelTabs/HomeContent";
import PLaylisyList from "../playlist/PLaylistList";
import { Link } from "react-router-dom";

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
    name: "Mini Clips",
  },
];

const YourChannel = () => {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { data: channelData, loading: channelLoading } = useSelector(
    (state) => state.channel
  );

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(getChannel(user._id));

    channelData && dispatch(getAllChanelVideo(channelData._id));
  }, []);

  useEffect(() => {
    channelData && dispatch(getAllChanelVideo(channelData._id));
  }, [channelData]);

  if (authLoading || channelLoading) return <Loading />;

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <HomeContent />;
      case 2:
        return <PLaylisyList />;
      case 3:
        return <h6>No Mini clips yet</h6>;
      default:
        return <HomeContent />;
    }
  };

  return (
    user && (
      <div className="px-sm-3">
        <div className="channel_profile">
          <div className="profile_container">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="profile_details">
            <h3>{channelData?.channelName}</h3>
            <span>@{user.username}</span>
            <p>
              More about this station <IoIosArrowForward />
            </p>

            <div className="profile_buttons">
              <Link to="/customize-station">
                <button>Customize station</button>
              </Link>
              <Link to="/manage-video">
                <button>Manage videos</button>
              </Link>
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

          <div className="videos_list mb-3">{renderTabContent()}</div>
        </div>
      </div>
    )
  );
};

export default YourChannel;
