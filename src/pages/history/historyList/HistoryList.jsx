/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import {
  deleteHistory,
  getAllHistory,
} from "../../../redux/featurs/historySlice";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const HistoryList = ({ historyData, token }) => {
  const dispatch = useDispatch();

  const deleteSingleVideo = (id) => {
    dispatch(deleteHistory({ token, id }));
    dispatch(getAllHistory(token));
  };

  const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);
  const style = {
    width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)",
  };

  // more option state
  const [more, setMore] = useState(null);

  // handle more option
  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else {
      setMore(null);
    }
  };

  return (
    <div>
      <div className="video-list-main">
        {historyData &&
          historyData.map((item, i) => (
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
                  <Link to={`/video/${item.video._id}`}>
                    <h3>{item.video.title}</h3>
                  </Link>
                  {item.video.channelData && (
                    <p>{item.video.channelData.channelName}</p>
                  )}
                  <p>{item.video.views} views 3 hours ago</p>
                </div>
                <div className="video-more-option-button">
                  <BsThreeDotsVertical onClick={() => openMore(i + 1)} />
                  {more === i + 1 && (
                    <div className="video-more-option">
                      <ul>
                        <li onClick={() => deleteSingleVideo(item._id)}>
                          Remove From History
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    // <>
    //   {historyData &&
    //     historyData.map((item, i) => (
    //       <div key={i} className="video-history-list">
    //         <IoMdClose
    //           className="hs-video-delete"
    //           onClick={() => deleteSingleVideo(item._id)}
    //         />
    //         <Link to={`/video/${item._id}`}>
    //           <div className="hs-video-item">
    //             <img
    //               src={item?.video.thumbnail}
    //               alt={item?.video.title}
    //               className="img-fluid"
    //             />
    //             <span>{item?.video.duration}</span>
    //           </div>
    //         </Link>
    //         <div className="hs-video-details">
    //           <div className="hs-video-name">
    //             <Link to={`/video/${item._id}`}>
    //               <h3>{item?.video.title}</h3>
    //             </Link>
    //             {/* {item?.video && <p>{item?.video.channelName}</p>} */}
    //             <p className="hs-video-view">
    //               {item?.video.views} views 3 hours ago
    //             </p>
    //             <div className="hs-video-description">
    //               {item?.video && <p>{item?.video.description}</p>}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    // </>
  );
};

export default HistoryList;
