import { useState } from "react";
import ChannelModal from "../header/ChannelModal";

const NoStation = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="text-center">
        <img
          src="/assets/messageImages/empty.jpg"
          alt=""
          style={{ height: "300px", margin: "auto" }}
        />
        <h4 className="mt-2 text-4xl font-bold text-gray-800">
          Station Does not Exits &nbsp;
          <span
            onClick={openModal}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Create a New Station
          </span>
        </h4>
        <p className="mt-2 text-gray-600">Excitement Ahead!</p>
      </div>
      <ChannelModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default NoStation;
