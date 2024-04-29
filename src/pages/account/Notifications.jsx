import { useSelector } from "react-redux";
import Notification from "/assets/setting/notification.png";
// import Toggle from "react-toggle";

const Notifications = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="notification_container">
        <div className="d-flex align-items-center ">
          <img src={Notification} alt="" />
          <p className="p-1 mx-3">Notifications</p>
        </div>
        <div className="mt-3">
          <p className="p-12">Email notifications</p>
          <span className="span-1">
            Your emails are sent to {user?.email}. To fanscribe from an email,
            click the FunScribe link at the bottom of it. Learn more about
            emails from MadeXtube
          </span>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <p className="p-123">Permission</p>
          <div className="d-flex mx-5">
            <div className="cl-toggle-switch">
              <label className="cl-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>
            <div className="mx-3">
              <p className="p-1234">
                Send me emails about my MadeXtube activity and updates that I
                requested
              </p>
              <span className="span-1">
                If this setting is turned off, MadeXtube may still send you
                messages regarding your account, required service announcements,
                legal notifications and privacy matters
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
