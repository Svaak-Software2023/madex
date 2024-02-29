import { useEffect } from "react";
// import VideoList from '../../components/videoList/VideoList'
import { useDispatch, useSelector } from "react-redux";
import { getDownload } from "../../redux/featurs/downloads";
import { Link } from "react-router-dom";
import NoDataFound from "../../components/Error/NoDataFound";
// import Loading from "../../assets/loader/Loading";

function Downloads() {
  const dispatch = useDispatch();

  const download = useSelector((state) => state.downloads.videoData);

  useEffect(() => {
    dispatch(getDownload());
  }, []);

  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);

  const style = {
    width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)",
  };

  if (!download || download.length === 0)
    return (
      <NoDataFound />
      // <h3 className="text-center pt-5 mt-5">Sorry, No Download Records !</h3>
    );
  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/download.png" alt="" />
        </div>
        <h3 className="heading-name">Download</h3>
      </div>
      <div className="video-list-main">
        {download.map((item, i) => (
          <div key={i} className="video-list" style={style}>
            <Link to={`/video/${item.video._id}`}>
              <div className="video-item">
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  className="img-fluid"
                />
                <span>{item.video.duration}</span>
              </div>
            </Link>
            <div className="video-details">
              {item.video.channelData && (
                <div className="video-logo-img">
                  <img src={item.video.channelData.owner.avatar} alt="" />
                </div>
              )}
              <div className="video-name">
                <Link to={`/video/${item._id}`}>
                  <h3>{item.video.title}</h3>
                </Link>
                {item.video.channelData && (
                  <p>{item.video.channelData.channelName}</p>
                )}
                <p>Time: {item.video.createdAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Downloads;
