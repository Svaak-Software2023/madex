import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../../redux/features/likesVideo";
import VideoList from "../../components/videoList/VideoList";

const FavoriteVideo = () => {
  const user = useSelector((state) => state.auth);
  const userId = user.user._id;
  const accessToken = user.data.accessToken;
  const favoriteVideos = useSelector(
    (state) => state.likedVideos.likedVideoData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedVideos({ userId, accessToken }));
  }, []);
  return (
    <>
      <div className="container">
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/favoriteVideo.png" alt="" />
          </div>
          <h3 className="heading-name">Favorite Videos</h3>
        </div>
        <div className="my-3 w-100">
          <VideoList data={favoriteVideos} />
        </div>
      </div>
    </>
  );
};

export default FavoriteVideo;
