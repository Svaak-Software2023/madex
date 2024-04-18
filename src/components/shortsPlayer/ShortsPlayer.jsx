import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../../redux/features/shortsSlice";
import { Link, useNavigate } from "react-router-dom";

import {
  createDisLike,
  createLike,
} from "../../redux/features/likeDislikeSlice";
import { getSingleVideo } from "../../redux/features/videoSlice";
import ShareVideoModal from "../videoPlayer/ShareVideoModal";
import TipBox from "../VideosActions/TipBox";
import { createWatchLater } from "../../redux/features/watchLater";
const ShortsPlayer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrollPos, setScrollPos] = useState(0);
  const [progress, setProgress] = useState(0);
  const [played, setPlayed] = useState([]);
  const [videoStatus, setVideoStatus] = useState({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const video = useSelector((state) => state.video.singleVideo);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  function openModal3() {
    setIsOpen3(true);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  const shortVideo = useSelector((state) => state.shorts.data);

  const handleVideoClick = (domId, videoId) => {
    dispatch(getSingleVideo(videoId));
    let currVideo = document.getElementById(domId);
    currVideo.play();

    setPlayed([...played, domId]);
    played.map((x) => {
      let oldVideos = document.getElementById(x);
      if (oldVideos !== null && x !== domId) {
        oldVideos.pause();
      }
    });

    setPlayingIndex(domId);
    setScrollPos(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVideoClick);
    return () => window.removeEventListener("scroll", handleVideoClick);
  }, []);

  const togglePlay = (index) => {
    const video = document.getElementById(`video-${index}`);
    if (video.paused) {
      video.play();
      setVideoStatus({ ...videoStatus, [`video-${index}`]: "playing" });
    } else {
      video.pause();
      setVideoStatus({ ...videoStatus, [`video-${index}`]: "paused" });
    }
  };

  const updateProgress = (index) => {
    const video = document.getElementById(`video-${index}`);
    const currentTime = video.currentTime;
    const duration = video.duration;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  // like handler function
  const likehandler = (videoId) => {
    !user && navigate("/login");
    dispatch(createLike({ userId: user._id, videoId, accessToken })).then(
      () => {
        dispatch(getSingleVideo(videoId));
      }
    );
  };

  // dislike handler function
  const dislikehandler = (videoId) => {
    !user && navigate("/login");
    dispatch(createDisLike({ userId: user._id, videoId, accessToken })).then(
      () => {
        dispatch(getSingleVideo(videoId));
      }
    );
  };

  // Handle Watch LAter
  const handleWatchLater = (videoId) => {
    accessToken &&
      dispatch(
        createWatchLater({
          videoId,
          accessToken: accessToken,
        })
      );
  };

  return (
    <>
      <div className="shorts_container">
        {shortVideo?.map((item, i) => (
          <>
            <div
              className="shorts-main mb-3"
              key={i + 1}
              onMouseEnter={() => handleVideoClick(`video-${i}`, item._id)}
            >
              <video
                id={`video-${i}`}
                src={item.videoFile}
                onTimeUpdate={() => updateProgress(i)}
                onClick={() => togglePlay(i)}
                height={600}
              ></video>
              <div className="actions">
                <ul>
                  <li>
                    <div className="shorts_actions ">
                      <img
                        src="/assets/icons/upvote.png"
                        alt=""
                        onClick={() => likehandler(item?._id)}
                      />
                      <span>
                        {video?.likesCount ? video?.likesCount : "upvote"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="shorts_actions ">
                      <img
                        src="/assets/icons/downvote.png"
                        alt=""
                        onClick={() => dislikehandler(item?._id)}
                      />
                      <span>
                        {video?.dislikesCount
                          ? video?.dislikesCount
                          : "Down vote"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="shorts_actions " onClick={openModal}>
                      <img src="assets/icons/share.png" alt="" />
                      <span>Share</span>
                    </div>
                  </li>
                  <li>
                    <div
                      className="shorts_actions "
                      onClick={() => handleWatchLater(item?._id)}
                    >
                      <img src="assets/icons/watchLater.png" alt="" />
                      <span>Continue later</span>
                    </div>
                  </li>
                  <li>
                    <div className="shorts_actions " onClick={openModal3}>
                      <img src="/assets/icons/tipBox.png" alt="" />
                      <span>Tip Box</span>
                    </div>
                  </li>
                  <li>
                    <Link
                      to={`/fanscribeStation/${video?.channelData.owner?.username}`}
                    >
                      <div className="channel-img">
                        <img
                          src={item?.channelData.owner.avatar}
                          height={80}
                          width={80}
                          alt="profile"
                        />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ))}
      </div>

      <ShareVideoModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <TipBox modalIsOpen3={modalIsOpen3} closeModal={closeModal3} />
    </>
  );
};

export default ShortsPlayer;
