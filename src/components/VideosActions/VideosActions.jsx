/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Fanscription from "../FanscriptionButton/Fanscription";
import {
  createDisLike,
  createLike,
  getlikes,
} from "../../redux/featurs/likeDislikeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createDownload } from "../../redux/featurs/downloads";
import { HiDotsHorizontal } from "react-icons/hi";
import "./style.css";
import ShareVideoModal from "../videoPlayer/ShareVideoModal";
import ComplaintModal from "./ComplaintModal";
import { getComplaintCategoriesList } from "../../redux/featurs/complaintSlice";
import TipBox from "./TipBox";
// import { checkSubscribe } from "../../redux/featurs/subscribeSlice";

const VideosActions = ({ data }) => {
  // const username = data?.channelData?.owner.username;
  const pathname = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);
  const subscribersCount = useSelector((state) => state.channel.channelProfile);
  // const channelData = useSelector((state) => state.channel.data);
  const [videoMore, setVideoMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  function openModal3() {
    setIsOpen3(true);
    setVideoMore(false);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  // const [complaintModalIsOpen, setComplaintModalIsOpen] = useState(false);

  const [FanscribersCount, setFanscribersCount] = useState(0);
  const forMobileResponse = window.screen.width;
  const isMobile = forMobileResponse < 768;
  function openModal() {
    setIsOpen(true);
    setVideoMore(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
    setVideoMore(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  const handleDownload = async (event) => {
    event.preventDefault();
    accessToken &&
      dispatch(createDownload({ videoId: data?._id, accessToken }));
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

  useEffect(() => {
    if (
      subscribersCount?.subscribersCount >= 1000 &&
      subscribersCount?.subscribersCount < 1000000
    )
      setFanscribersCount(
        `${Math.round(subscribersCount?.subscribersCount / 1000)} K`
      );
    else if (
      subscribersCount?.subscribersCount >= 1000000 &&
      subscribersCount?.subscribersCount < 1000000000
    )
      setFanscribersCount(
        `${Math.round(subscribersCount?.subscribersCount / 1000000)} M`
      );
    else if (subscribersCount?.subscribersCount > 1000000000)
      setFanscribersCount(
        `${Math.round(subscribersCount?.subscribersCount / 1000000000)} B`
      );
    else setFanscribersCount(subscribersCount?.subscribersCount);
  }, [subscribersCount?.subscribersCount]);

  const likeCount = useSelector((state) => state.likeDislike);

  useEffect(() => {
    dispatch(getlikes(data?._id));
    dispatch(getComplaintCategoriesList());
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

  return (
    <>
      <div className="video_content">
        <div className="channel-profile-details">
          <div className="Video_channel_profile">
            <div className="channel-img">
              <img
                src={data?.channelData.owner.avatar}
                height={80}
                width={80}
                alt="profile"
              />
            </div>
            <div className="channel_name">
              <Link
                to={`/fanscribeStation/${data?.channelData.owner?.username}`}
              >
                <h3>{data?.channelData.channelName}</h3>
              </Link>
              <p className="fanscribe_count">{FanscribersCount} Fanscribers</p>
              {/* <p>{view} Views • 3 months ago</p> */}
            </div>
          </div>

          {data.channelData.owner._id === user?._id ? (
            ""
          ) : (
            <Fanscription data={data} />
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
                  <span>{data?.dislikesCount}</span>
                </div>
              </>
            )}
          </div>
          <div
            className="header-three-dot header-three-dot-video-option"
            onClick={openModal}
          >
            <img src="assets/icons/share.png" alt="" />
          </div>
          <Link to="#" onClick={handleDownload}>
            <div className="header-three-dot header-three-dot-video-option">
              <img src="/assets/icons/download.png" alt="" />
            </div>
          </Link>

          {(isMobile || !isSidebarOpen) && (
            <>
              <div className="header-three-dot header-three-dot-video-option">
                <img src="assets/icons/cutVideo.png" alt="" />
              </div>

              <div className="header-three-dot header-three-dot-video-option">
                <img src="assets/icons/watchLater.png" alt="" />
              </div>
              <div className="header-three-dot">
                <img src="assets/icons/chat.png" alt="" />
              </div>
              <div className="header-three-dot">
                <img src="assets/icons/marketPlace.png" alt="" />
              </div>
              <div className="header-three-dot">
                <img src="assets/icons/chatRoom.png" alt="" />
              </div>
            </>
          )}
          <div
            className="more-option-video"
            onClick={() => setVideoMore(!videoMore)}
          >
            <HiDotsHorizontal />
          </div>
          {videoMore && (
            <>
              <div
                className="modal_wrapper"
                onClick={() => setVideoMore(!videoMore)}
              ></div>
              <div className="more-option-video-list">
                <ul>
                  {(isMobile || isSidebarOpen) && (
                    <>
                      <li>
                        <div className="more-option-icon">
                          <img src="assets/icons/cutVideo.png" alt="" />
                        </div>
                        <p>Share Clip</p>
                      </li>
                      <li>
                        <div className="more-option-icon">
                          <img src="assets/icons/watchLater.png" alt="" />
                        </div>
                        <p>Watch Later</p>
                      </li>
                      <li>
                        <div className="more-option-icon">
                          <img src="assets/icons/chat.png" alt="" />
                        </div>
                        <p>Instant Message</p>
                      </li>
                      <li>
                        <div className="more-option-icon">
                          <img src="assets/icons/marketPlace.png" alt="" />
                        </div>
                        <p>MarketPlace</p>
                      </li>
                      <li>
                        <div className="more-option-icon">
                          <img src="assets/icons/chatRoom.png" alt="" />
                        </div>
                        <p>Chatroom</p>
                      </li>
                    </>
                  )}
                  <li onClick={openModal3}>
                    <div className="more-option-icon">
                      <img src="/assets/icons/tipBox.png" alt="" />
                    </div>
                    <p>Tip Box </p>
                  </li>

                  <li>
                    <div className="more-option-icon">
                      <img src="/assets/icons/storeVideo.png" alt="" />
                    </div>
                    <p>Store Video</p>
                  </li>
                  <li onClick={openModal2}>
                    <div className="more-option-icon">
                      <img src="/assets/icons/complaint.png" alt="" />
                    </div>
                    <p>Complaint</p>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Comment Section End */}
      <ShareVideoModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <ComplaintModal
        modalIsOpen2={modalIsOpen2}
        openModal={openModal2}
        closeModal={closeModal2}
        videoId={data?._id}
      />
      <TipBox modalIsOpen3={modalIsOpen3} closeModal={closeModal3} />
    </>
  );
};

export default VideosActions;
