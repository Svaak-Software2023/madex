/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./style.css";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createHistory } from "../../redux/featurs/historySlice";

import CommentSection from "../commentSection/CommentSection";
import moment from "moment";
import VideosActions from "../VideosActions/VideosActions";
// import { getUserStationProfile } from "../../redux/featurs/channelSlice";
import { checkSubscribe } from "../../redux/featurs/subscribeSlice";

const VideoPlayer = ({ data }) => {
  const { username } = data?.channelData?.owner || {};

  const dispatch = useDispatch();
  const { videoId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const restrictionMode = useSelector(
    (state) => state.globalFunction.restrictedMode
  );

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

  useEffect(() => {
    accessToken && dispatch(createHistory({ videoId, accessToken }));
  }, [videoId, accessToken, dispatch]);

  // useEffect(() => {
  //   dispatch(getUserStationProfile({ username, accessToken }));
  // }, [username, accessToken, dispatch]);

  useEffect(() => {
    dispatch(checkSubscribe({ username, accessToken }));
  }, [username, accessToken, dispatch]);

  return (
    <>
      <div className="video_container w-100">
        <div className="video_player_wrapper">
          <ReactPlayer
            url={data?.videoFile}
            controls
            playing
            className="video_player"
          />
        </div>
        <h3 className="video_title mt-2">{data?.title}</h3>
      </div>
      <VideosActions data={data} />

      {/* Views And Description Section Start*/}
      <div className="description mt-2">
        <p className="views-time">
          {view} Views • {moment(data.createdAt).fromNow()}
        </p>
        <p className="description_data"> {data.description}</p>
      </div>
      {/* Description End */}

      {/* Comment Section Start */}
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
    </>
  );
};

export default VideoPlayer;
