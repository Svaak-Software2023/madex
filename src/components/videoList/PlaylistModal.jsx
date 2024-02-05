import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { MdClose, MdAdd } from "react-icons/md";
import "./modalStyle.css";
import {
  addVideoToPLaylist,
  createPLaylist,
  getPlaylistData,
} from "../../redux/featurs/playlistSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
  },
};

const PlaylistModal = (props) => {
  const { closeModal, afterOpenModal, modalIsOpen, videoId } = props;
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.data);
  const userId = useSelector((state) => state.auth.user._id);
  console.log(userId);

  const { playlistData } = useSelector((state) => state.playlist);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [playlistId, setPlaylistId] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPlaylistId(e.target.checked ? e.target.value : null);
  };

  const handlePlaylist = (e) => {
    e.preventDefault();
    if (showForm) {
      dispatch(
        createPLaylist({
          formData,
          videoId,
          accessToken: accessToken.accessToken,
        })
      );
    } else {
      dispatch(
        addVideoToPLaylist({
          playlistId,
          videoId,
          accessToken: accessToken.accessToken,
        })
      );
    }

    closeModal();
    setFormData({
      name: "",
      description: "",
    });
    setPlaylistId(null);
  };

  const openForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    dispatch(getPlaylistData({ userId }));
  }, [dispatch]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Channel Modal"
      >
        <div className="container">
          <div className="modal_header">
            <p>Add Video to...</p>
            <MdClose onClick={closeModal} />
          </div>
          <div className="playlist_list">
            {playlistData.map((item) => (
              <label className="custom-checkbox" key={item._id}>
                <input
                  type="checkbox"
                  id="checkbox"
                  value={item._id}
                  onChange={handleCheckboxChange}
                  checked={playlistId === item._id}
                />
                <span className="checkmark"></span> {item.name}
              </label>
            ))}
          </div>
          {showForm === false ? (
            <button onClick={openForm}>
              <MdAdd />
              &nbsp; Create New Playlist
            </button>
          ) : (
            <>
              <div className="playlist_form">
                <form>
                  <label htmlFor="playlistName">Name</label>
                  <input
                    id="playlistName"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter playlist title..."
                    onChange={handlechange}
                  />
                  <label htmlFor="playlistName">Description</label>
                  <input
                    id="playlistName"
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Enter Description..."
                    onChange={handlechange}
                  />
                </form>
              </div>
            </>
          )}

          {showForm === true ? (
            <button onClick={handlePlaylist} className="create_button">
              Create
            </button>
          ) : (
            <button onClick={handlePlaylist} className="create_button">
              Add to playlist
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PlaylistModal;
