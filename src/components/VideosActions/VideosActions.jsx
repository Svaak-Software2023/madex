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
// import { checkSubscribe } from "../../redux/featurs/subscribeSlice";

const VideosActions = ({ data }) => {
  // const username = data?.channelData?.owner.username;
  const pathname = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);

  const [videoMore, setVideoMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const forMobileResponse = window.screen.width;
  const isMobile = forMobileResponse < 768;
  function openModal() {
    setIsOpen(true);
    setVideoMore(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const likeCount = useSelector((state) => state.likeDislike);

  useEffect(() => {
    dispatch(getlikes(data?._id));
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

  // useEffect(() => {
  //   dispatch(checkSubscribe({ username, accessToken }));
  // }, [username, accessToken, dispatch]);

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
              <h3>{data?.channelData.channelName}</h3>
              <p className="fanscribe_count"> 1.3M Fanscribers</p>
              {/* <p>{view} Views • 3 months ago</p> */}
            </div>
          </div>
          <Fanscription data={data} />
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
            <div className="more-option-video-list">
              <ul>
                {/* {isMobile && (
                  <>
                    <li>
                      <div className="more-option-icon" onClick={openModal}>
                        <img src="assets/icons/share.png" alt="" />
                      </div>
                      <p>Share</p>
                    </li>
                    <li>
                      <Link to="#" onClick={handleDownload}>
                        <div className="more-option-icon">
                          <img src="/assets/icons/download.png" alt="" />
                        </div>
                        <p>Download</p>
                      </Link>
                    </li>
                  </>
                )} */}
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
                      <p>chat</p>
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
                      <p>ChatRoom</p>
                    </li>
                  </>
                )}
                <li>
                  <div className="more-option-icon">
                    <img src="/assets/icons/tipBox.png" alt="" />
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
      {/* Comment Section End */}
      <ShareVideoModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default VideosActions;
