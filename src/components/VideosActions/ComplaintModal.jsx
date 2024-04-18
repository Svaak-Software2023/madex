// import Modal from "react-modal";
import { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createNewComplaint } from "../../redux/features/complaintSlice";
import "./modal.css";
// import { toast } from "sonner";

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
// eslint-disable-next-line react/prop-types
const ComplaintModal = ({ modalIsOpen2, closeModal, videoId }) => {
  const dispatch = useDispatch();
  const complaintCategoryList = useSelector(
    (state) => state.complaint.complaintCategoryList
  );
  const accessToken = useSelector((state) => state.auth.data?.accessToken);

  const [formData, setFormData] = useState({
    reportId: null,
    videoId: videoId,
    reportContent: "",
  });

  const handleRadioChange = (event) => {
    setFormData({
      ...formData,
      reportId: event.target.value,
      reportContent: event.target.value,
    });
  };

  const handleTextareaChange = (event) => {
    setFormData({
      ...formData,
      reportContent: event.target.value,
    });
  };

  const handleComplaintSubmit = () => {
    dispatch(createNewComplaint({ formData, accessToken }));
    closeModal();
  };

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Complaint Modal"
      >
        <div className="complaint_modal">
          <p>Complaint Video</p>
          <ul>
            {complaintCategoryList?.map((item) => (
              <li key={item._id}>
                <input
                  type="radio"
                  name="complaintCategory"
                  value={item._id}
                  id={item._id}
                  checked={formData?.reportId === item._id}
                  onChange={handleRadioChange}
                />
                <label htmlFor={item._id}> {item.reportName}</label>
              </li>
            ))}
          </ul>
          <textarea
            name="reportContent"
            id=""
            cols={30}
            rows={4}
            placeholder="Description (optional)"
            onChange={handleTextareaChange}
          ></textarea>
          <div className="action-buttons">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleComplaintSubmit}>Submit</button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ComplaintModal;
