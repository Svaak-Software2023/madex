import { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { sendFeedBack } from "../../redux/features/sendFeedback";
import { useNavigate } from "react-router-dom";

const SendObservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.data?.accessToken);

  const [feedBackDescription, setFeedbackDescription] = useState("");

  const handleTextChange = (event) => {
    setFeedbackDescription(event.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (accessToken) {
      dispatch(
        sendFeedBack({
          feedBackDescription: feedBackDescription,
          accessToken,
        })
      ).then(() => navigate("/"));
    } else {
      navigate("/login");
    }
    setFeedbackDescription("");
  };

  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/sendObservation.png" alt="" />
        </div>
        <h3 className="heading-name">Send Observation</h3>
      </div>
      <div className="container d-flex justify-content-center align-items-center  container-top">
        <div className="box_container  d-flex flex-column justify-content-center">
          <p className="feed_head">Send observation to Madextube</p>
          <div className="textarea-field">
            <span className="text-xs">Describe your observation</span>
            <textarea
              value={feedBackDescription}
              onChange={handleTextChange}
              rows={4}
              placeholder="Tell us what is your observation"
            />
          </div>

          <i className="text-secondary " style={{ fontSize: "0.8rem" }}>
            Some account and system information may be sent to madextube. We
            will use it to fix problems and improve our services, subject to our
            Privacy Policy and Terms of Service. We may email you for more
            information or updates. Go to Legal Help to ask for content changes
            for legal reasons.
          </i>
          <div className="d-flex justify-content-center">
            <button onClick={handleButtonClick} className="send_feed">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendObservation;
