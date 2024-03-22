import { Link } from "react-router-dom";
import "./style.css";
const RecommendList = ({ data }) => {
  return (
    <>
      <div className="video-list-recomended mt-2">
        {data &&
          data.map((item, i) => (
            <Link to={`/video/${item._id}`} key={i}>
              <div className="video-container row m-0 p-0 mb-2">
                <div className="col-lg-5 col-12 p-0 m-0">
                  <div className="recomended-video-image">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-flui"
                    />
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div className="d-flex align-items-center">
                    <div className="recommended-avatar">
                      <img src={item?.channelData?.owner?.avatar} alt="" />
                    </div>
                    <div className="video-name">
                      <h3 className="mt-2">{item.title}</h3>
                      <p className="text-[#737070]">
                        {item?.channelData?.channelName}
                      </p>
                      <p className="text-sm text-[#737070]">
                        {item.views} views 3 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default RecommendList;
