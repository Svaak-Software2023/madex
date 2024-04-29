import AccountImage from "/assets/setting/account.png";
import AccountUser from "/assets/login/logout_user.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Account = ({ handleTabClick }) => {
  const user = useSelector((state) => state.auth.user);
  const channel = useSelector((state) => state.channel.data);
  console.log(channel);

  return (
    <>
      <div className="account_container">
        <div className="account-heading d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <p className="p-1">Account</p>
            <div>
              <p className="p-12">
                Choose how you appear and what you see on MadeXtube
              </p>
              <span className="span-1">Signed in as {user?.email}</span>
            </div>
          </div>

          <div className="accpunt_image-container">
            <img src={AccountImage} alt="" />
          </div>
        </div>

        <div className="d-flex flex-column mt-3">
          <p className="p-123">Your MadeXtube Rooms/Stations</p>
        </div>
        <span className="span-12">
          This is your public presence on MadeXtube. You need a station to
          upload your own videos, share options on videos or create playlists.
        </span>
        <div className="d-flex mt-4">
          <p className="p-1234">Your Stations</p>
          <div className="d-flex flex-column mx-5">
            <div className="d-flex justify-content-center align-items-center">
              <img src={AccountUser} alt="" className="mx-2" />
              <p className="p-12345">{channel?.channelName} </p>
            </div>
            <div className="p-links mt-3">
              <p> Rooms/Stations status and features</p>
              <Link>
                <p>Create a new Room/Station</p>
              </Link>
              <Link>
                <p>View advanced settings</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <p className="p-12345">Your Account</p>
          <p className="p-123456">Your signed in by connecting your email</p>
          <div className="d-flex flex-column align-items-center">
            <p className="p-1234">Your account at a glance:</p>
            <div>
              <p className="p-0">Chatrooms</p>
              <p className="p-0">Instant Messaging</p>
              <p className="p-0">pveHd</p>
              <p className="p-0">MadeXMcue Music</p>
              <p className="p-0">MadeXtube</p>
              <p className="p-0">Madexbet</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
