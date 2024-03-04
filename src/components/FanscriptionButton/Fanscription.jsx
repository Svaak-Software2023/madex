/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscribe,
  createSubscribe,
  unSubscribe,
} from "../../redux/featurs/subscribeSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Fanscription = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.data?.accessToken);

  const isSubscribe = (userId, channelId, accessToken) => {
    if (user) {
      dispatch(checkSubscribe({ userId, channelId, accessToken })).then(() => {
        setSubscribed(subscribeState.isSubscribed);
      });
    } else {
      setSubscribed(null);
    }
  };

  const [subscribed, setSubscribed] = useState(null);
  const subscribeState = useSelector((state) => state.subscriber);

  useEffect(() => {
    subscribeState.isSubscribed && setSubscribed(subscribeState.isSubscribed);
  });

  useEffect(() => {
    user && isSubscribe(user?._id, data.channelData._id, accessToken);
  }, []);

  // handle subscribe function
  const handlesubscribe = () => {
    subscribeState.isSubscribed && setSubscribed(subscribeState.isSubscribed);
    if (!user) navigate("/login");
    else
      dispatch(
        createSubscribe({
          userId: user._id,
          channelId: data.channelData._id,
          accessToken,
        })
      ).then(() => {
        setSubscribed(true);
      });
  };

  // handle unSubscribe function
  const handleUnsubscribe = () => {
    if (!user) navigate("/login");
    else
      dispatch(
        unSubscribe({
          userId: user._id,
          channelId: data.channelData._id,
          accessToken,
        })
      ).then(() => {
        setSubscribed(false);
      });
  };

  return (
    <>
      {subscribed ? (
        <div className="subscribe-button">
          <p onClick={handleUnsubscribe}>Fanscribed</p>
        </div>
      ) : (
        <div className="subscribe-button">
          <p onClick={handlesubscribe}>Fanscribe</p>
        </div>
      )}
    </>
  );
};

export default Fanscription;
