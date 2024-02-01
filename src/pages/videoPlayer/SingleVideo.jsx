import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import RecommendList from "../../components/recommendList/recommendList";
import CategoreyMenu from "../../components/categoreyMenu/CategoreyMenu";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo, getSingleVideo } from "../../redux/featurs/videoSlice";
import Loading from "../../assets/loader/Loading";

const SingleVideo = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getAllVideo());
  }, [pathname]);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getAllVideo());
  }, []);

  if (video.loading) return <Loading />;
  if (!video.singleVideo)
    return (
      <h4 className="text-center mt-5">
        Sorry, the video data could not be found
      </h4>
    );

  // const [recommendData,setRecommendData]=useState()
  const recommendData =
    video.videoData &&
    video.videoData.filter((item) => item._id !== video.singleVideo._id);
  return (
    <>
      <div className="">
        <div className="row m-0 p-0">
          <div className="videoPlayer col-lg-7 col-12 mt-3">
            {video.singleVideo && <VideoPlayer data={video.singleVideo} />}
          </div>
          <div className="video_list col-lg-5 col-12 m-0 p-0 mt-2">
            <CategoreyMenu />
            <RecommendList data={recommendData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVideo;
