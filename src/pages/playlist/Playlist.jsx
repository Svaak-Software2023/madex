import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistData } from "../../redux/features/playlistSlice";
import "./style.css";

import Loading from "../../assets/loader/Loading";
import PLaylistList from "./PLaylistList";
import NoDataFound from "../../components/Error/NoDataFound";

const Playlist = ({ stationProfileUserId }) => {
  // const { stationProfileUserId } = props;
  const dispatch = useDispatch();

  const { playlistData, loading } = useSelector((state) => state.playlist);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if (stationProfileUserId) {
      dispatch(getPlaylistData({ userId: stationProfileUserId }));
    } else {
      dispatch(getPlaylistData({ userId }));
    }
  }, [stationProfileUserId]);
  if (loading) return <Loading />;

  if (!playlistData || playlistData.length === 0) {
    return (
      <>
        {!stationProfileUserId && (
          <div className="page-heading">
            <div className="heading-img-container">
              <img src="/assets/icons/playlist.png" alt="" />
            </div>
            <h3 className="heading-name">Playlists</h3>
          </div>
        )}
        <NoDataFound />
      </>
    );
  }

  return (
    <>
      <div className="conatiner">
        {!stationProfileUserId && (
          <div className="page-heading">
            <div className="heading-img-container">
              <img src="/assets/icons/playlist.png" alt="" />
            </div>
            <h3 className="heading-name">Playlists</h3>
          </div>
        )}
        <PLaylistList />
      </div>
    </>
  );
};

export default Playlist;
