import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoList from "../../components/videoList/VideoList";
import { useEffect } from "react";
import { getPlaylistData } from "../../redux/featurs/playlistSlice";

const PlaylistVideo = () => {
  const dispatch = useDispatch();

  const { playlistId } = useParams();
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if (userId && playlistId) {
      dispatch(getPlaylistData({ userId, playlistId }));
    }
  }, [userId, playlistId, dispatch]);

  const { playlistData } = useSelector((state) => state.playlist);

  const playlistVideo =
    userId && playlistData
      ? playlistData.find((i) => i._id === playlistId)
      : null;

  const videos = playlistVideo ? playlistVideo.videos : [];

  return (
    <>
      {videos.length > 0 ? (
        <VideoList data={videos} />
      ) : (
        <h4 className="text-center mt-5">No videos in this playlist yet</h4>
      )}
    </>
  );
};

export default PlaylistVideo;
