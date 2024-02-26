/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createChannel } from "../../redux/featurs/channelSlice";
import Loading from "../../assets/loader/Loading";
import { useEffect } from "react";
import { getChannel } from "../../redux/featurs/channelSlice";

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

const ChannelModal = (props) => {
  const dispatch = useDispatch();

  const { closeModal, afterOpenModal, modalIsOpen } = props;
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    const dataWithId = { ...formData, userId: user._id };
    dispatch(createChannel(dataWithId));
    // Reset the form after successful submission
    reset();
  };

  const channel = useSelector((state) => state.channel);

  const getChannelData = (userId) => {
    // console.log("User Id",userId);
    dispatch(getChannel(userId));
  };

  useEffect(() => {
    user && getChannelData(user?._id);
  }, [user]);

  if (channel.loading) return <Loading />;
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Channel Modal"
      >
        <div className="channel_modal ">
          <button onClick={closeModal} className="close_modal">
            <IoCloseOutline />
          </button>

          <div className="channel_profile d-flex flex-column justify-content-center align-items-center">
            <h3>
              Welcome{" "}
              <span style={{ color: "#065FD4", textTransform: "capitalize" }}>
                {user && user.fullName}
              </span>
            </h3>
            <div className="profile_container">
              <img src={user && user.avatar} />
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs ">
              <input
                type="text"
                placeholder="Name"
                {...register("channelName", { required: true })}
              />
              {errors.channelName && (
                <span className="text-danger fw-bold">
                  Channel name is requird
                </span>
              )}
              <input
                type="text"
                placeholder="Handle"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-danger fw-bold">
                  Description is required
                </span>
              )}
              <p>
                By selecting create station you agree to the site&apos;s terms
                of services.
                <br /> Any changes made to your personal account will be on
                visible on the Madextube site
              </p>
            </div>
            <div className="buttons">
              <button onClick={closeModal}>Cancel</button>
              <button>Create Station</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ChannelModal;
