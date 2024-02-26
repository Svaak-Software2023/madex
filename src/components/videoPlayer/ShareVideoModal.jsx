import Modal from "react-modal";
import {
  EmailShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookShareCount,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";

import "./shareVideo.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    paddingTop: "25px",
    paddingBottom: "50px",
    paddingInline: "40px",
  },
};
const ShareVideoModal = ({ closeModal, afterOpenModal, modalIsOpen }) => {
  const fullURL = window.location.href;
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Channel Modal"
      >
        <div className="share-container">
          <p>Share</p>
          <div className="social-media-list">
            <WhatsappShareButton title="Whatsapp" url={fullURL}>
              <WhatsappIcon size={64} round={true}></WhatsappIcon>
            </WhatsappShareButton>
            <FacebookShareButton url={fullURL}>
              <FacebookIcon size={64} round={true}></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={fullURL}>
              <XIcon size={64} round={true}></XIcon>
            </TwitterShareButton>

            <EmailShareButton url={fullURL}>
              <EmailIcon size={64} round={true}></EmailIcon>
            </EmailShareButton>
            <TelegramShareButton url={fullURL}>
              <TelegramIcon size={64} round={true}></TelegramIcon>
            </TelegramShareButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareVideoModal;
