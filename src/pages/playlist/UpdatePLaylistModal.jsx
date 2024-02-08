/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist } from "../../redux/featurs/playlistSlice";

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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdatePlaylist = () => {
    dispatch(
      updatePlaylist({
        playListId,
        formData,
        accessToken: accessToken.accessToken,
      })
    );
  };

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
          <h5>Update Playlist</h5>
          <div className="playlist_form">
            <form>
              <label htmlFor="playlistName">Name</label>
              <input
                id="playlistName"
                type="text"
                name="name"
                placeholder="Enter playlist title..."
                onChange={handlechange}
              />
              <label htmlFor="playlistName">Description</label>
              <input
                id="playlistName"
                type="text"
                name="description"
                placeholder="Enter Description..."
                onChange={handlechange}
              />
            </form>
            <button onClick={handleUpdatePlaylist} className="create_button">
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePLaylistModal;
