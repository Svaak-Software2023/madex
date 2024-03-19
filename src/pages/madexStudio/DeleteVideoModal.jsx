/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideo } from "../../redux/featurs/videoSlice";
import { MdDelete } from "react-icons/md";

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
const DeleteVideoModal = ({
  closeModal,
  afterOpenModal,
  modalIsOpen,
  videoId,
  channelId,
}) => {
  const accessToken = useSelector((state) => state.auth.data.accessToken);
  const dispatch = useDispatch();

  const deleteVideoHandler = () => {
    dispatch(deleteVideo({ videoId, accessToken, channelId }));
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
            <div className="confirm_form">
              <div className="svg_img">
                <MdDelete />
              </div>
              <p>
                Please confirm
                <br />
                Are you sure you want to proceed?
              </p>
              <div className="confirm-buttons">
                <button onClick={deleteVideoHandler}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteVideoModal;
