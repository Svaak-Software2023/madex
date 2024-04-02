/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./modal.css";
import { RxCross2 } from "react-icons/rx";

const TipBox = ({ modalIsOpen3, closeModal }) => {
  const localData = localStorage.getItem("accessToken");
  const name = JSON.parse(localData);

  return (
    <>
      {modalIsOpen3 && (
        <>
          <div className="modal_wrapper" onClick={closeModal}></div>

          <div className="tipBox_modal_container">
            <div className="d-flex">
              <h2> Thanks for Contributing </h2>
              <RxCross2 onClick={closeModal} className="tipBox_cursor" />
            </div>
            {localData ? (
              <>
                <p>
                  Your contribution helps us to grow and become more powerful...
                </p>
                <div className="tipBox_Gift">
                  <div className="tipBox_Gift_text"> Gift </div>
                  <img
                    src={name.user.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  <div>
                    <p className="fs-6 text-capitalize text-black fw-semibold">
                      {name.user.fullName}
                    </p>
                    $
                    <input type="text" className="border-0 w-75" value={5} />
                  </div>
                </div>
                <button className="tipBox_modal_btn" onClick={closeModal}>
                  Send Gift
                </button>
              </>
            ) : (
              <div>
                <p> You Need to Login First </p>
                <Link to={"/login"}>
                  <button className="tipBox_modal_btn" onClick={closeModal}>
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TipBox;
