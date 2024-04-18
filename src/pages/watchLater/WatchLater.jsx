import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllWatchLater,
  deleteWatchLater,
  getAllWatchLater,
} from "../../redux/features/watchLater";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "../../assets/loader/Loading";
import "./style.css";
import NoDataFound from "../../components/Error/NoDataFound";
import { Toaster } from "sonner";
function WatchLater() {
  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);
  const style = {
    width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)",
  };

  // more option state
  const [more, setMore] = useState(null);

  // handle more option
  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else {
      setMore(null);
    }
  };

  const accessToken = useSelector((state) => state.auth.data.accessToken);

  // get Watch later data from the store
  const data = useSelector((state) => state.watchLater.videoData);

  const dispatch = useDispatch();

  // create watch later get function
  const feachData = () => {
    dispatch(getAllWatchLater(accessToken));
  };

  // call watch later get function
  useEffect(() => {
    feachData();
  }, []);

  // handle watch later single delete
  const handleWatchLater = (videoId) => {
    accessToken && dispatch(deleteWatchLater({ videoId, accessToken }));
    setTimeout(() => {
      feachData();
    }, 500);
  };

  // delete all handler

  const userId = useSelector((state) => state.auth.user._id);

  const deleteAllhandler = () => {
    accessToken && dispatch(deleteAllWatchLater({ userId, accessToken }));
    setTimeout(() => {
      feachData();
    }, 500);
  };

  // const watchtLoading = useSelector((state) => state.watchLater.loading);
  // if loading is true then show loading
  // if (watchtLoading) return <Loading />;

  // if no records found then return this message
  if (!data || data.length === 0) {
    return (
      <>
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/watchLater.png" alt="" />
          </div>
          <h3 className="heading-name">Continue Later</h3>
        </div>
        <NoDataFound />
      </>
    );
  }

  return (
    <>
      <div>
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/watchLater.png" alt="" />
          </div>
          <h3 className="heading-name">Continue Later</h3>
        </div>

        <div className="video-list-main">
          {data &&
            data.map((item, i) => (
              <div key={i} className="video-list" style={style}>
                <Link to={`/video/${item.video._id}`}>
                  <div className="video-item">
                    <img
                      src={item.video.thumbnail}
                      alt={item.video.title}
                      className="img-fluid"
                    />
                    <span>{item.video.duration}</span>
                  </div>
                </Link>
                <div className="video-details">
                  {item.video.channelData && (
                    <div className="video-logo-img">
                      <img src={item.video.channelData.owner.avatar} alt="" />
                    </div>
                  )}
                  <div className="video-name">
                    <Link to={`/video/${item.video._id}`}>
                      <h3>{item.video.title}</h3>
                    </Link>
                    {item.video.channelData && (
                      <p>{item.video.channelData.channelName}</p>
                    )}
                    <p>{item.video.views} views 3 hours ago</p>
                  </div>
                  <div className="video-more-option-button">
                    <BsThreeDotsVertical
                      onClick={() => openMore(item.video._id)}
                    />
                    {more === item.video._id && (
                      <>
                        <div
                          className="modal_wrapper"
                          onClick={() => openMore(!more)}
                        ></div>
                        <div className="video-more-option">
                          <ul>
                            <li
                              onClick={() => handleWatchLater(item.video._id)}
                            >
                              <p>Remove video</p>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="clear-all-watch-later">
          <button onClick={deleteAllhandler}>Clear All Watch Later</button>
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}
export default WatchLater;
