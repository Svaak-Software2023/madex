import ComplaintImage from "/assets/complaintHistory/complaintHistory.png";
import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaintByUserID } from "../../redux/features/complaintSlice";
import DataTable from "react-data-table-component";

const ComplaintHistory = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.data?.accessToken);
  const { AllComplaintListByUserId } = useSelector((state) => state.complaint);

  const columns = [
    {
      name: "Type",
      selector: () => "Video",
      width: "100px",
    },
    {
      name: "content",
      selector: (row) => row.videoId.title,
      width: "400px",
    },
    {
      name: "Reporting Reason",
      selector: (row) => row.reportId.reportName,
      width: "200px",
    },
    {
      name: "status",
      selector: () => "live",
      width: "100px",
    },
  ];

  useEffect(() => {
    dispatch(getAllComplaintByUserID({ accessToken }));
  }, []);
  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/sendObservation.png" alt="" />
        </div>
        <h3 className="heading-name">Complaint History</h3>
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <div className="introduction-area w-75 border-bottom pb-3">
          <div className="text-area">
            <h4>Thank you for your report.</h4>
            <p>
              Any member of the MadxTube community can flag content to us that
              they believe violates our Community Guidelines. When something is
              flagged, it&apos;s not automatically taken down. Flagged content
              is reviewed according to the following guidelines:
            </p>
            <ul>
              <li>
                Content that violates our Community Guidelines is removed from
                MadxTube.
              </li>
              <li>
                Content that may not be suitable for all audiences may be
                age-restricted.
              </li>
              <li>
                Reports filed for content that has been deleted by the creator
                cannot be addressed.
              </li>
            </ul>
            <p>
              For more information about reporting content on MadxTube, please
              consult our guidelines.
            </p>
          </div>
          <div className="img-area">
            <img src={ComplaintImage} alt="Comlaint-History" />
          </div>
        </div>

        <div className="table-conatiner mt-5 w-75">
          {AllComplaintListByUserId ? (
            <DataTable
              columns={columns}
              data={AllComplaintListByUserId}
              pagination
            />
          ) : (
            <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
              No video reported yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ComplaintHistory;
