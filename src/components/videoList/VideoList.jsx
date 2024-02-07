import "./style.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createWatchLater } from "../../redux/featurs/watchLater";
import { toast } from "react-toastify";
import Loading from "../../assets/loader/Loading";
import PlaylistModal from "./PlaylistModal";

function VideoList({ data }) {
  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);
  const style = {
    width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)",
  };

  // more option state
  const [more, setMore] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [videoId, setVideoId] = useState(null);
  console.log("Video ID: ", videoId);

  // handle more option
  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else if (more !== id) {
      setMore(id);
    } else setMore(null);
  };

  // handle watch later
  const dispatch = useDispatch();

  // create watch later api call
  const accessToken = useSelector((state) => state.auth.data);
  const handleWatchLater = (videoId) => {
    accessToken.accessToken &&
      dispatch(
        createWatchLater({
          videoId,
          toast,
          accessToken: accessToken.accessToken,
        })
      );
    setMore(null);
  };

  function openModal(id) {
    setIsOpen(true);
    setVideoId(id);
    setMore(null);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const watchtLoading = useSelector((state) => state.watchLater.loading);
  if (watchtLoading) return <Loading />;
  return (
    <>
      <div className="video-list-main">
        {data &&
          data.map((item, i) => (
            <div key={i} className="video-list" style={style}>
              <Link to={`/video/${item?._id}`}>
                <div className="video-item">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid"
                  />
                  <span>{item.duration}</span>
                </div>
              </Link>
              <div className="video-details">
                {item.channelData && (
                  <div className="video-logo-img">
                    <img src={item.channelData.owner.avatar} alt="" />
                  </div>
                )}
                <div className="video-name">
                  <Link to={`/video/${item?._id}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  {item.channelData && <p>{item.channelData.channelName}</p>}
                  <p>{item.views} views 3 hours ago</p>
                </div>
                <div className="video-more-option-button">
                  <BsThreeDotsVertical onClick={() => openMore(item?._id)} />
                  {more === item?._id && (
                    <div className="video-more-option">
                      <ul>
                        <li onClick={() => handleWatchLater(item?._id)}>
                          Watch later
                        </li>
                        <li onClick={() => openModal(item?._id)}>
                          Add to Playlist
                        </li>

                        <li>Share</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <PlaylistModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        videoId={videoId}
      />
    </>
  );
}

export default VideoList;
