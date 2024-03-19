import { useEffect } from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import RecommendList from "../../components/recommendList/recommendList";
import CategoreyMenu from "../../components/categoreyMenu/CategoreyMenu";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideo,
  getSingleVideo,
  viewCount,
} from "../../redux/featurs/videoSlice";
import Loading from "../../assets/loader/Loading";
// import Loading from "../../assets/loader/Loading";

const SingleVideo = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { pathname } = useLocation();

  // const token = JSON.parse(localStorage.getItem("accessToken"));
  // const accessToken = token?.accessToken;

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getAllVideo());
    dispatch(viewCount(videoId));
  }, [pathname]);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getAllVideo());
  }, []);

  // if (video.loading) return <Loading />;
  if (!video.singleVideo) return <Loading />;

  const recommendData =
    video.categoryVideoData &&
    video.categoryVideoData.filter(
      (item) => item?._id !== video?.categoryVideoData?._id
    );

  const defaultRecommendData =
    video.videoData &&
    video.videoData.filter((item) => item._id !== video.singleVideo._id);
  return (
    <>
      <div className="">
        <div className="row m-0 p-0">
          <div className="videoPlayer col-lg-7 col-12 mt-3">
            {video.singleVideo && (
              <VideoPlayer data={video.singleVideo} pathname={pathname} />
            )}
          </div>
          <div className="video_list col-lg-5 col-12 m-0 p-0 mt-2">
            <CategoreyMenu />
            <RecommendList
              data={recommendData ? recommendData : defaultRecommendData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVideo;
