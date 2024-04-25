import ComplaintImage from "/assets/complaintHistory/complaintHistory.png";
import "./style.css";

const ComplaintHistory = () => {
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
        <div className="introduction-area w-75">
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
        {/* <div className="table-conatiner mt-5 w-100">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </>
  );
};

export default ComplaintHistory;
