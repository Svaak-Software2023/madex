import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useEffect } from "react";
import { getAllChannelList } from "../../redux/featurs/channelSlice";
import { Link } from "react-router-dom";
const Fanscribe = () => {
  const user = useSelector((state) => state.auth);
  const accessToken = user.data.accessToken;

  const channelList = useSelector((state) => state.channel.channelList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChannelList({ accessToken }));
  }, []);

  return (
    <>
      <div className="container">
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/subscriptions.png" alt="" />
          </div>
          <h3 className="heading-name">Fanscribe</h3>
        </div>
        {channelList ? (
          <div className="stations_lists">
            {channelList &&
              channelList.map((item) => (
                <Link
                  key={item._id}
                  to={`/fanscribeStation/${item?.owner?.username}`}
                >
                  <div className="single_stations">
                    <div className="staion_profile">
                      <img src={item.owner?.avatar} alt="" />
                    </div>
                    <div className="station_info">
                      <h5>{item.channelName}</h5>
                      <span>@{item.owner?.username}</span>
                      <p>{item.description.slice(0, 200)}</p>
                    </div>
                    {/* <div className="fanscribe_button">
                  <button>fanscribed</button>
                </div> */}
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <>
            <div className="text-center">
              {/* <img
                src="/assets/messageImages/empty.jpg"
                alt=""
                style={{ height: "300px", margin: "auto" }}
              /> */}
              <h4 className="mt-2 text-4xl font-bold text-gray-800">
                No, Fanscription Yet
              </h4>
              <p className="mt-2 text-gray-600">Excitement Ahead!</p>
              {/* <h4 className="text-center mt-5">No History Found</h4> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Fanscribe;
