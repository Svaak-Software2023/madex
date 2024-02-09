import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlaylist,
  getPlaylistData,
} from "../../redux/featurs/playlistSlice";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import "./style.css";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Loading from "../../assets/loader/Loading";
import UpdatePlaylistModal from "../playlist/UpdatePLaylistModal";

const Playlist = () => {
  const dispatch = useDispatch();
  const [more, setMore] = useState(null);

  const { playlistData, loading } = useSelector((state) => state.playlist);
  const userId = useSelector((state) => state.auth.user._id);
  const accessToken = useSelector((state) => state.auth.data);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listId, setListId] = useState(null);

  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else if (more !== id) {
      setMore(id);
    } else setMore(null);
  };

  function openModal(id) {
    setIsOpen(true);
    setMore(null);
    setListId(id);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDeletePLaylist = (playListId) => {
    dispatch(
      deletePlaylist({ playListId, accessToken: accessToken.accessToken })
    ).then(() => dispatch(getPlaylistData({ userId })));
    setMore(null);
  };

  useEffect(() => {
    dispatch(getPlaylistData({ userId }));
  }, [dispatch]);
  if (loading) return <Loading />;

  if (!playlistData || playlistData.length === 0) {
    return (
      <>
        <h4 className="text-center mt-5">No playlist yet</h4>;
      </>
    );
  }

  return (
    <>
      <div className="conatiner">
        <h4 style={{ textAlign: "center" }}>Playlists</h4>

        <div className="playlist_list">
          {playlistData.map((item) => (
            <>
              <div className="playlist" key={item._id}>
                <Link to={`/playlistVideo/${item._id}`}>
                  <div className="playlist_img">
                    <img
                      src={item.videos[0].thumbnail}
                      alt="playlist video"
                      className="img-fluid"
                    />
                    <span>
                      <MdOutlinePlaylistPlay />
                      <p>{item.videos.length}</p>
                    </span>
                  </div>
                </Link>

                <div className="playlist_details">
                  <p className="playlist_name">{item.name}</p>
                  <BsThreeDotsVertical onClick={() => openMore(item._id)} />
                  {more === item._id && (
                    <div className="more-option">
                      <ul>
                        <li onClick={() => handleDeletePLaylist(item._id)}>
                          <RiDeleteBin6Line />
                          &nbsp; Delete
                        </li>
                        <li onClick={() => openModal(item?._id)}>
                          <MdOutlineModeEdit /> &nbsp; Edit
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <UpdatePlaylistModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        playListId={listId}
      />
    </>
  );
};

export default Playlist;
