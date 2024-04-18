import { Link } from "react-router-dom";

const Support = () => {
  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/sendObservation.png" alt="" />
        </div>
        <h3 className="heading-name">Assistance/Support</h3>
      </div>
      <div className="container w-75 ">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Create a new Station in Madextube
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                By creating a new station on <code>MadexTube</code>, you gain
                the ability to upload your content and share it with the
                platform 's audience
                <br />
                <strong>Steps for creating Madextube Station :</strong>
                <ol>
                  <li>
                    First, you have to create a account in
                    <Link to="/create-account">
                      <span style={{ color: "blue", marginLeft: "5px" }}>
                        Madextube
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <span style={{ color: "blue", marginRight: "5px" }}>
                        Login
                      </span>
                    </Link>
                    to your account.
                  </li>
                  <li>Then click on profile on top right side</li>
                  <li>Click Develop Station</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How Delete your MadexTube Station or content
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Closing your <code>Madextube</code> station will permanently
                delete your content, including videos, opinions, messages,
                playlists, and history. <br />
                <strong>Delete your Madextube Station :</strong>
                <ol>
                  <li>Login to Madextube</li>
                  <li>Go to sidebar stage setting</li>
                  <li>click on advanced setting</li>
                  <li>then click on erase station</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How to uplaod new content on station
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Content uploaded to MadexTube stations becomes visible to the
                platform's audience.
                <br />
                <strong>Steps 1 for creating Madextube Station :</strong>
                <ol>
                  <li>
                    First , you have to create a account in
                    <Link to="/create-account">
                      <span style={{ color: "blue", marginLeft: "5px" }}>
                        Madextube
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <span style={{ color: "blue", marginRight: "5px" }}>
                        Login
                      </span>
                    </Link>
                    to your account.
                  </li>
                  <li>Then click on profile on top right side</li>
                  <li>Click Develop Station</li>
                  <li>then click on upload content</li>
                </ol>
                <strong>Steps 2 for creating Madextube Station :</strong>
                <br />
                You can upload content on your station by clicking on navbar
                camera icon which is on right side.
                <br />
                <strong>Please note:</strong>Before uploading content, ensure
                that you have created a station.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Delete Content from station
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>Delete content from Madextube Station :</strong>
                <ol>
                  <li>
                    <Link to="/login">
                      <span style={{ color: "blue", marginRight: "5px" }}>
                        Login
                      </span>
                    </Link>
                    to Madextube
                  </li>
                  <li>In the sidebar go to madex studio</li>
                  <li>
                    You can view a list of the uploaded contents, select a
                    video, and click on the bin icon to delete it.
                  </li>
                  <li>
                    Once you confirm permission, your video will be deleted.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                How to Update video details
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                You have the option to update details such as the title, and
                description.
                <br />
                <strong>Update video infomation :</strong>
                <ol>
                  <li>
                    <Link to="/login">
                      <span style={{ color: "blue", marginRight: "5px" }}>
                        Login
                      </span>
                    </Link>
                    to Madextube
                  </li>
                  <li>In the sidebar go to madex studio</li>
                  <li>
                    You can view a list of the uploaded contents, select a
                    video, and click on the edit icon to update details.
                  </li>
                  <li>
                    You are now directed to the Edit Video detail page, where
                    you can make edits.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
