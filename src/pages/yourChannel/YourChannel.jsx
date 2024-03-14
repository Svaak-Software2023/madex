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
import Compass from "/assets/icons/compass.png";
import MiniClip from "/assets/icons/miniClips.png";
import FavoriteVideo from "/assets/icons/favoriteVideo.png";
import LiveLens from "/assets/icons/livelensOnAir.png";
import MadeXStudio from "/assets/icons/madeXStudio.png";
import FanMade from "/assets/icons/fanMade.png";
import InstantMessage from "/assets/icons/instantMessage.png";
import ChatRoom from "/assets/icons/chatRoom.png";
import Marketplace from "/assets/icons/marketplace.jpg";

const menus = [
  {
    id: 1,

    name: "Navigation",
    icon: Compass,
  },
  {
    id: 2,

    name: "Mini Clips",
    icon: MiniClip,
  },
  {
    id: 3,

    name: "Favorite",
    icon: FavoriteVideo,
  },
  {
    id: 4,

    name: "Live Lens",
    icon: LiveLens,
  },
  {
    id: 5,

    name: "MadeX Studio",
    icon: MadeXStudio,
  },
  {
    id: 6,

    name: "Fan Base",
    icon: FanMade,
  },
  {
    id: 7,

    name: "Instant Message",
    icon: InstantMessage,
  },
  {
    id: 8,

    name: "Chat Room",
    icon: ChatRoom,
  },
  {
    id: 9,

    name: "Marketplace",
    icon: Marketplace,
  },
];

const YourChannel = () => {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const {
    data: channelData,
    loading: channelLoading,
    channelNotExit: NoChannel,
  } = useSelector((state) => state.channel);

  console.log("Check Channel:", NoChannel.message);

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

  if (NoChannel.message === "400") {
    return <h1>No Channel Exits</h1>;
  }
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
                  <img src={item.icon} alt="" height={20} />
                  {item.name}
                </button>
              );
            })}

            {/* <FaSearch className="search_icon" /> */}
          </div>

          <div className="videos_list mb-3">{renderTabContent()}</div>
        </div>
      </div>
    )
  );
};

export default YourChannel;
