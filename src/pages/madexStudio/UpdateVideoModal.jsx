/* eslint-disable react/prop-types */
import Modal from "react-modal";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoDetail } from "../../redux/featurs/videoSlice";
import { useEffect, useState } from "react";

Modal.setAppElement("#root"); // Set the app element

const customStyles = {
  content: {
    top: "58%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000 !important",
  },
};
const UpdateVideoModal = ({
  closeModal,
  afterOpenModal,
  modalIsOpen,
  videoDetails,
  channelId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const accessToken = useSelector((state) => state.auth.data.accessToken);

  const handlechange = ({ target: { name, value } }) => {
    // const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (videoDetails) {
      setFormData({
        title: videoDetails.title || "",
        description: videoDetails.description || "",
      });
    }
  }, [videoDetails]);

  const dispatch = useDispatch();

  const updateVideo = () => {
    dispatch(
      updateVideoDetail({
        formData,
        accessToken,
        videoId: videoDetails._id,
        channelId,
      })
    );
    // dispatch(getAllChanelVideo({ channelId }));
    closeModal();
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
          <div className="modal-box">
            <p className="modal-head">Edit Title and Description </p>
            <div className="filled_form">
              <div className="input-container">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="actions-buttons">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={updateVideo}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateVideoModal;
