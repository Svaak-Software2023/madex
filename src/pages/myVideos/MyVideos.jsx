import { useEffect } from "react";
import VideoList from "../../components/videoList/VideoList";
import { getChannel } from "../../redux/featurs/channelSlice";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";
import { useDispatch, useSelector } from "react-redux";

const MyVideos = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: channelData } = useSelector((state) => state.channel);
  const channelVideoData = useSelector((state) => state.video.channelVideoData);

  useEffect(() => {
    user && dispatch(getChannel(user._id));

    channelData && dispatch(getAllChanelVideo(channelData._id));
  }, []);
  return (
    <>
      <div className="container">
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/myVideos.png" alt="" />
          </div>
          <h3 className="heading-name">My Videos</h3>
        </div>

        {!channelVideoData && (
          <>
            <div className="text-center">
              <img
                src="/assets/messageImages/noVideos.jpg"
                alt=""
                style={{ height: "300px", margin: "auto" }}
              />
              <h4 className="mt-2 text-4xl font-bold text-gray-800">
                No Video yet, But Not for Long
              </h4>
              <p className="mt-2 text-gray-600">Excitement Ahead!</p>
            </div>
          </>
        )}
        <div className="my-3 w-100">
          <VideoList data={channelVideoData} />
        </div>
      </div>
    </>
  );
};

export default MyVideos;
