import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { IoMdClose } from "react-icons/io";
import { deleteHistory, getAllHistory } from "../../redux/featurs/historySlice";

const HistoryList = ({ historyData, token }) => {
  const dispatch = useDispatch();

  const deleteSingleVideo = (id) => {
    dispatch(deleteHistory({ token, id }));
    dispatch(getAllHistory(token));
  };

  return (
    <>
      {historyData &&
        historyData.map((item, i) => (
          <div key={i} className="video-history-list">
            <IoMdClose
              className="hs-video-delete"
              onClick={() => deleteSingleVideo(item._id)}
            />
            <Link to={`/video/${item._id}`}>
              <div className="hs-video-item">
                <img
                  src={item?.video.thumbnail}
                  alt={item?.video.title}
                  className="img-fluid"
                />
                <span>{item?.video.duration}</span>
              </div>
            </Link>
            <div className="hs-video-details">
              <div className="hs-video-name">
                <Link to={`/video/${item._id}`}>
                  <h3>{item?.video.title}</h3>
                </Link>
                {/* {item?.video && <p>{item?.video.channelName}</p>} */}
                <p className="hs-video-view">
                  {item?.video.views} views 3 hours ago
                </p>
                <div className="hs-video-description">
                  {item?.video && <p>{item?.video.description}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HistoryList;
