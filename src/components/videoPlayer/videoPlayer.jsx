/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./style.css";
// import { IoShareSocialOutline } from 'react-icons/io5';
import { HiDotsHorizontal } from "react-icons/hi";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDownload } from "../../redux/featurs/downloads";
import { createHistory } from "../../redux/featurs/historySlice";

import {
  createDisLike,
  createLike,
  getlikes,
} from "../../redux/featurs/likeDislikeSlice";
import {
  checkSubscribe,
  createSubscribe,
  unSubscribe,
} from "../../redux/featurs/subscribeSlice";
import CommentSection from "../commentSection/CommentSection";
import ShareVideoModal from "./ShareVideoModal";
import moment from "moment";

const VideoPlayer = ({ data, pathname }) => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  console.log("DATE:", data);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const restrictionMode = useSelector(
    (state) => state.globalFunction.restrictedMode
  );
  const [videoMore, setVideoMore] = useState(false);

  const handleDownload = async (event) => {
    event.preventDefault();
    accessToken && dispatch(createDownload({ videoId: data._id, accessToken }));
    if (!accessToken) return navigate("/login");
    try {
      // Fetch the media file
      const response = await fetch(data.videoFile);
      const blob = await response.blob();

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a hidden anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.title}.mp4`;

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Remove the link and revoke the URL after download starts
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading media file:", error);
    }
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setVideoMore(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [view, setView] = useState("");

  useEffect(() => {
    if (data.views >= 1000 && data.views < 1000000)
      setView(`${Math.round(data.views / 1000)} K`);
    else if (data.views >= 1000000 && data.views < 1000000000)
      setView(`${Math.round(data.views / 1000000)} M`);
    else if (data.views > 1000000000)
      setView(`${Math.round(data.views / 1000000000)} B`);
    else setView(data.views);
  }, [data]);

  const likeCount = useSelector((state) => state.likeDislike);

  useEffect(() => {
    dispatch(getlikes(data?._id));
  }, []);

  // check is subscribe or not function
  const isSubscribe = (userId, channelId, accessToken) => {
    if (user) {
      dispatch(checkSubscribe({ userId, channelId, accessToken })).then(() => {
        setSubscribed(subscribeState.isSubscribed);
      });
    } else {
      setSubscribed(null);
    }
  };
  const [subscribed, setSubscribed] = useState(null);
  const subscribeState = useSelector((state) => state.subscriber);

  useEffect(() => {
    subscribeState.isSubscribed && setSubscribed(subscribeState.isSubscribed);
  });

  useEffect(() => {
    dispatch(getlikes(data?._id));
    isSubscribe(user?._id, data.channelData._id, accessToken);
  }, []);

  useEffect(() => {
    dispatch(getlikes(data?._id));
    user && isSubscribe(user?._id, data.channelData._id, accessToken);
  }, [pathname]);

  // like handler function
  const likehandler = (videoId) => {
    !user && navigate("/login");
    dispatch(createLike({ userId: user._id, videoId, accessToken })).then(
      () => {
        dispatch(getlikes(data?._id));
      }
    );
  };

  // dislike handler function
  const dislikehandler = (videoId) => {
    !user && navigate("/login");
    dispatch(createDisLike({ userId: user._id, videoId, accessToken })).then(
      () => {
        dispatch(getlikes(data?._id));
      }
    );
  };

  // handle subscribe function
  const handlesubscribe = () => {
    subscribeState.isSubscribed && setSubscribed(subscribeState.isSubscribed);
    if (!user) navigate("/login");
    else
      dispatch(
        createSubscribe({
          userId: user._id,
          channelId: data.channelData._id,
          accessToken,
        })
      ).then(() => {
        setSubscribed(true);
      });
  };

  // handle unSubscribe function
  const handleUnsubscribe = () => {
    if (!user) navigate("/login");
    else
      dispatch(
        unSubscribe({
          userId: user._id,
          channelId: data.channelData._id,
          accessToken,
        })
      ).then(() => {
        setSubscribed(false);
      });
  };

  useEffect(() => {
    accessToken && dispatch(createHistory({ videoId, accessToken }));
  }, [videoId, accessToken, dispatch]);

  return (
    <>
      <div className="video_container w-100">
        <div className="video_player">
          <ReactPlayer
            url={data?.videoFile}
            controls
            playing
            className="video_player"
          />
        </div>
        <h3 className="video_title mt-2">{data?.title}</h3>

        <div className="video_content">
          <div className="channel-profile-details">
            <div className="channel-profile">
              <img
                src={data?.channelData.owner.avatar}
                height={100}
                width={100}
                alt="profile"
              />
            </div>
            <div className="channel_name">
              <h3>{data?.channelData.channelName}</h3>
              {/* <p>{view} Views • 3 months ago</p> */}
              <p>
                {view} Views • {moment(data.createdAt).fromNow()}
              </p>
            </div>
            {subscribed ? (
              <div className="subscribe-button">
                <p onClick={handleUnsubscribe}>Fanscribed</p>
              </div>
            ) : (
              <div className="subscribe-button">
                <p onClick={handlesubscribe}>Fanscribe</p>
              </div>
            )}
          </div>
          <div className="more-button-in-video">
            <div className="like-dislike ">
              {likeCount?.loading ? (
                <div className="py-1 px-3">
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                </div>
              ) : (
                <>
                  <div className="like-button">
                    <img
                      src="/assets/icons/upvote.png"
                      onClick={() => likehandler(data?._id)}
                    />
                    <span>{likeCount?.like}</span>
                  </div>
                  <div className="dis-button">
                    <img
                      src="/assets/icons/downvote.png"
                      onClick={() => dislikehandler(data?._id)}
                    />
                  </div>
                </>
              )}
            </div>
            <Link to="#" onClick={handleDownload}>
              <div className="download-video">
                {/* <MdOutlineDownloading /> */}
                <img src="/assets/icons/download.png" alt="" />
                <span>Download</span>
              </div>
            </Link>

            <div
              className="more-option-video"
              onClick={() => setVideoMore(!videoMore)}
            >
              <HiDotsHorizontal />
            </div>
            {videoMore && (
              <div className="more-option-video-list">
                <ul>
                  <li>
                    <div className="more-option-icon">
                      <img src="/assets/icons/share.png" alt="" />
                    </div>
                    <p onClick={openModal}>share</p>
                  </li>
                  <li>
                    <div className="more-option-icon">
                      <img src="/assets/icons/thanks.png" alt="" />
                    </div>
                    <p>Thanks</p>
                  </li>

                  <li>
                    <div className="more-option-icon">
                      <img src="/assets/icons/storeVideo.png" alt="" />
                    </div>
                    <p>Store Video</p>
                  </li>
                  <li>
                    <div className="more-option-icon">
                      <img src="/assets/icons/complaint.png" alt="" />
                    </div>
                    <p>Complaint</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="description my-3">
        <h3 className="video_title">Description</h3>
        {data.description}
      </div>
      <div className="comment-container">
        {!restrictionMode ? (
          <CommentSection
            userId={user?._id}
            videoId={videoId}
            accessToken={accessToken}
          />
        ) : (
          <p style={{ textAlign: "center", fontWeight: "500" }}>
            Restricted Mode has hidden comments for this video.
          </p>
        )}
      </div>
      <ShareVideoModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default VideoPlayer;
