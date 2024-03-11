import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChannel } from "../../redux/featurs/channelSlice";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";

const CustomizeStation = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: channelData } = useSelector((state) => state.channel);
  const { playlistData } = useSelector((state) => state.playlist);
  console.log(playlistData);

  const dispatch = useDispatch();
  useEffect(() => {
    user && dispatch(getChannel(user._id));

    channelData && dispatch(getAllChanelVideo(channelData._id));
  }, []);

  return (
    <>
      <div className="customize-conatiner">
        <div className="customize-header mt-3 ">
          <h5 className="mb-4">Station customisation</h5>
          <div className="header-actions d-flex justify-content-between mb-2">
            <p className="text-danger">Basic Info</p>
            <div className="action-button">
              <Link to="/your-channel" className="text-primary">
                <button>View Sation</button>
              </Link>
              <Link to="/your-channel" className="text-primary">
                <button>Cancel</button>
              </Link>
              <button>Publish</button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="field-container d--flex flex-column mb-3">
            <h6>Name</h6>
            <p className="desc-detail">
              Choose a channel name that represents you and your content.
              Changes made to your name and picture are only visible on
              MadeXtube and not on other Google services. You can change your
              name twice in 14 days.
            </p>
            <div className="editor-container">
              <input
                type="text"
                placeholder="Station Name"
                aria-label=""
                aria-describedby="basic-addon1"
                value={channelData?.channelName}
              />
            </div>
          </div>
          <div className="field-container mb-3">
            <h6>Handle</h6>
            <p className="desc-detail">
              Choose your unique handle by adding letters and numbers.You can
              change your handle back within 14 days.Handles can be changed
              twice every 14 days.
            </p>
            <div className="editor-container ">
              <input
                type="text"
                placeholder="Handler Name"
                aria-label=""
                aria-describedby="basic-addon1"
                value={`@${user.username}`}
              />
            </div>
          </div>
          <div className="field-container mb-3">
            <div className="editor-container">
              <label htmlFor="exampleFormControlTextarea1">
                <h6>Description</h6>
              </label>
              <textarea
                id="exampleFormControlTextarea1"
                rows="3"
                value={channelData?.description}
              ></textarea>
            </div>
          </div>
          <div className="field-container mb-3">
            <h6>Channel URL</h6>
            <p className="desc-detail">
              This is the standard web address for your channel. It includes
              your unique channel ID, which is the numbers and letters at the
              end of the URL
            </p>
            <div className="editor-container ">
              <input
                type="text"
                placeholder="https://madeXtube.com/station/UC2-19iyjuOF6B_KY4WV5w"
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizeStation;
