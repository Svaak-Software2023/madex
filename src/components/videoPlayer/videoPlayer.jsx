import React, { useEffect, useState } from "react";
import "./style.css";
import { BiDislike, BiLike } from "react-icons/bi";
// import { IoShareSocialOutline } from 'react-icons/io5';
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineDownloading } from "react-icons/md";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDownload } from "../../redux/featurs/downloads";
import { createDisLike, createLike, getlikes } from "../../redux/featurs/likeDislikeSlice";

const VideoPlayer = ({ data }) => {
  const dispatch = useDispatch();

  const handleDownload = (event) => {
    event.preventDefault();
    dispatch(createDownload(data._id));

    // Simulate download behavior
    const link = document.createElement("a");
    link.href = data.videoFile;
    link.download = data.title;
    link.click();
  };

  const [view, setView] = useState("");

  useEffect(() => {
    if (data.views >= 1000 && data.views < 1000000)
      setView(`${Math.round(data.views / 1000)} K`);
    else if (data.views >= 1000000 && data.views < 1000000000)
      setView(`${Math.round(data.views / 1000000)} M`);
    else if (data.views > 1000000000)
      setView(`${Math.round(data.views / 1000000000)} B`);
    else setView(data.views);
  }, []);
  // like handler function 

  const likeCount = useSelector((state) => state.likeDislike)

  useEffect(() => {
    dispatch(getlikes(data._id));
  }, []);

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const accessToken = useSelector((state) => state.auth.data?.accessToken)

  const likehandler = (videoId) => {
    !user && navigate("/login")
    dispatch(createLike({ userId: user._id, videoId, accessToken }))
      .then(() => {
        dispatch(getlikes(data._id));
      })
  }

  const dislikehandler = (videoId) => {
    !user && navigate("/login")
    dispatch(createDisLike({ userId: user._id, videoId, accessToken }))
      .then(() => {
        dispatch(getlikes(data._id));
      })
  }

  return (
    <>
      <div className="video_container w-100">
        <div className="video_player">
          <ReactPlayer
            url={data.videoFile}
            controls
            playing
            className="video_player"
          />
        </div>
        <h3 className="video_title mt-2">{data.title}</h3>

        <div className="video_content">
          <div className="channel-profile-details">
            <div className="channel-profile">
              <img
                src={data.channelData.owner.avatar}
                height={100}
                width={100}
                alt="profile"
              />
            </div>
            <div className="channel_name">
              <h3>{data.channelData.channelName}</h3>
              <p>{view} Views • 3 months ago</p>
            </div>
            <div className="subscribe-button">
              <p>Subscribe</p>
            </div>
          </div>
          <div className="more-button-in-video">
            <div className="like-dislike ">
              {likeCount.loading
                ?
                <div className="py-1 px-3">
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                </div>
                :
                <>
                  <div className="like-button">
                    <BiLike onClick={() => likehandler(data?._id)} />
                    <span>{likeCount?.like}</span>
                  </div>
                  <div className="dis-button">
                    <BiDislike onClick={() => dislikehandler(data?._id)} />
                  </div>
                </>
              }
            </div>

            {/* <a download={data.title} href={data.videoFile} type="video/mp4">
              <div className="download-video">
                <MdOutlineDownloading />
                <span>Download</span>
              </div>
            </a> */}
            <Link to="#" onClick={handleDownload}>
              <div className="download-video">
                <MdOutlineDownloading />
                <span>Download</span>
              </div>
            </Link>

            <div className="more-option-video">
              <HiDotsHorizontal />
            </div>
          </div>
        </div>
      </div>
      <div className="description my-3">
        <h3 className="video_title">Description</h3>
        {data.description}
      </div>
    </>
  );
};

export default VideoPlayer;
