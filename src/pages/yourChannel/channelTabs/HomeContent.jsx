import { useSelector } from "react-redux";
import VideoList from "../../../components/videoList/VideoList";
import { Link } from "react-router-dom";

const HomeContent = () => {
  const channelVideoData = useSelector((state) => state.video.channelVideoData);

  return (
    <>
      {channelVideoData ? (
        <div className="my-3 w-100">
          <VideoList data={channelVideoData} />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/upload-video">
            <div className="create_content d-flex justify-content-center align-items-center">
              <div className="content_img">
                <img src="/assets/channel/create_content.svg" alt="" />
              </div>
              <h3>Create content on any device</h3>
              <p>
                Upload and record at home or on the go. Everything you make
                public will appear here.
              </p>
              <button>Create</button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeContent;
