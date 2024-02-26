import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistData } from "../../redux/featurs/playlistSlice";
import "./style.css";

import Loading from "../../assets/loader/Loading";
import PLaylisyList from "./PLaylisyList";

const Playlist = () => {
  const dispatch = useDispatch();

  const { playlistData, loading } = useSelector((state) => state.playlist);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    dispatch(getPlaylistData({ userId }));
  }, [dispatch]);
  if (loading) return <Loading />;

  if (!playlistData || playlistData.length === 0) {
    return (
      <>
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/playlist.png" alt="" />
          </div>
          <h3 className="heading-name">Download</h3>
        </div>
        <h4 className="text-center mt-5">No playlist yet</h4>;
      </>
    );
  }

  return (
    <>
      <div className="conatiner">
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/playlist.png" alt="" />
          </div>
          <h3 className="heading-name">Playlists</h3>
        </div>
        <PLaylisyList />
      </div>
    </>
  );
};

export default Playlist;
