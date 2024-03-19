import { MdOutlinePlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  deletePlaylist,
  getPlaylistData,
} from "../../redux/featurs/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import UpdatePLaylistModal from "./UpdatePLaylistModal";

const PLaylistList = () => {
  const { playlistData } = useSelector((state) => state.playlist);
  const userId = useSelector((state) => state.auth.user._id);
  const accessToken = useSelector((state) => state.auth.data);
  const [listId, setListId] = useState(null);

  const [more, setMore] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else if (more !== id) {
      setMore(id);
    } else setMore(null);
  };

  const handleDeletePLaylist = (playListId) => {
    dispatch(
      deletePlaylist({ playListId, accessToken: accessToken.accessToken })
    ).then(() => dispatch(getPlaylistData({ userId })));
    setMore(null);
  };

  function openModal(id) {
    setIsOpen(true);
    setMore(null);
    setListId(id);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // useEffect(() => {
  //   if (stationProfileUserId) {
  //     dispatch(getPlaylistData(stationProfileUserId));
  //   }
  // }, []);
  return (
    <>
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

      <UpdatePLaylistModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        playListId={listId}
      />
    </>
  );
};

export default PLaylistList;
