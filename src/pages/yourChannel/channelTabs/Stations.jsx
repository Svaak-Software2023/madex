import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserStationProfile } from "../../../redux/featurs/channelSlice";
import { IoIosArrowForward } from "react-icons/io";
import HomeContent from "./HomeContent";
// import PLaylistList from "../../playlist/PLaylistList";
import VideoList from "../../../components/videoList/VideoList";
import Playlist from "../../playlist/Playlist";

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

const Stations = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.data.accessToken);
  const stationProfile = useSelector((state) => state.channel.channelProfile);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    dispatch(getUserStationProfile({ username, accessToken }));
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <VideoList data={stationProfile?.videosData} />;
      case 2:
        return <Playlist stationProfileUserId={stationProfile?._id} />;
      case 3:
        return <h6>No Mini clips yet</h6>;
      default:
        return <HomeContent />;
    }
  };

  return (
    <>
      <div className="px-sm-3">
        <div className="channel_profile">
          <div className="profile_container">
            <img src={stationProfile?.avatar} alt="User Avatar" />
          </div>
          <div className="profile_details">
            <h3>{stationProfile?.channelData.channelName}</h3>
            <span>@{stationProfile?.username}</span>
            <p>
              More about this station <IoIosArrowForward />
            </p>

            {stationProfile?.subscribed ? (
              <div className="subscribe-button">
                <p>Fanscribed</p>
              </div>
            ) : (
              <div className="subscribe-button">
                <p>Fanscribe</p>
              </div>
            )}
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

            {/* <FaSearch className="search_icon" /> */}
          </div>

          <div className="videos_list mb-3">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Stations;
