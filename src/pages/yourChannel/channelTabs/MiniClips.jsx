import { useSelector } from "react-redux";
import VideoList from "../../../components/videoList/VideoList";
import { Link } from "react-router-dom";

const MiniClips = () => {
  const channelVideoData = useSelector((state) => state.video.channelVideoData);

  const onlyClips = channelVideoData?.filter((item) =>
    item.videoCategory.find((i) => i == "65af9c1d300e52cac8fa193e")
  );

  return (
    <>
      {channelVideoData ? (
        <div className="my-3 w-100">
          <VideoList data={onlyClips} />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/upload-video">
            <div className="create_content d-flex justify-content-center align-items-center">
              <div className="content_img">
                <img src="/assets/channel/noData.jpg" alt="" />
              </div>
              <p>
                Establish a hub here: Craft and share vides from any location.
                All your creations, once posted, will be Publicly Accessible
                right within this Platform.
              </p>
              <button>Create</button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default MiniClips;
