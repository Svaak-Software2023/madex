/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylistData,
  updatePlaylist,
} from "../../redux/featurs/playlistSlice";
import "./style.css";

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

const UpdatePLaylistModal = ({
  closeModal,
  afterOpenModal,
  modalIsOpen,
  playListId,
}) => {
  const accessToken = useSelector((state) => state.auth.data);
  const { playlistData } = useSelector((state) => state.playlist);
  const userId = useSelector((state) => state?.auth?.user._id);

  const playlist = playlistData.find((i) => i._id === playListId);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handlechange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdatePlaylist = () => {
    dispatch(
      updatePlaylist({
        playListId,
        userId,
        formData,
        accessToken: accessToken.accessToken,
      })
    );
    closeModal();
    setFormData({
      name: "",
      description: "",
    });
    dispatch(getPlaylistData({ userId }));
  };

  useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist.name || "",
        description: playlist.description || "",
      });
    }
  }, [playlist]);

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
          <h5 className="update_playlist">Update Playlist</h5>

          <div className="playlist_form">
            <form>
              <label htmlFor="playlistName">Name</label>
              <input
                id="playlistName"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter playlist title..."
                onChange={(e) => handlechange("name", e.target.value)}
              />
              <label htmlFor="playlistName">Description</label>

              <input
                id="playlistName"
                type="text"
                name="description"
                value={formData.description}
                placeholder="Enter Description..."
                onChange={(e) => handlechange("description", e.target.value)}
              />
            </form>
            <button
              onClick={handleUpdatePlaylist}
              className="update_playlist_button"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePLaylistModal;
