import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
function VideoList({ data }) {
  return (
    <>
      <div className="video-list-main">
      {data&&data.map((item, i) =>
        <div div key={i} className="video-list" >
            <Link to={`/video/${item._id}`}>
              <div className="video-item">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className='img-fluid'
                />
                <span>{item.duration}</span>
              </div>
            </Link>
            <div className="video-details">
              {item.channelData&&<div className="video-logo-img">
                <img
                  src={item.channelData.owner.avatar}
                  alt=""
                />
              </div>}
              <div className="video-name">
                <Link to={`/video/${item._id}`}>
                  <h3>
                    {item.title}
                  </h3>
                </Link>
                {item.channelData&&<p>{item.channelData.channelName}</p>}
                <p>{item.views} views 3 hours ago</p>
              </div>
            </div>
          </div>
          )}
      </div>
    </>
  );
}

export default VideoList;
