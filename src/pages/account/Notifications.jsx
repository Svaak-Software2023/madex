import Notification from "/assets/setting/notification.png";
// import Toggle from "react-toggle";

const Notifications = () => {
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
            Your emails are sent to username655@gmail.com. To fanscribe from an
            email, click the FunScribe link at the bottom of it. Learn more
            about emails from MadeXtube
          </span>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <p className="p-123">Permission</p>
          <div className="d-flex mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="71"
              height="37"
              viewBox="0 0 71 37"
              fill="none"
            >
              <rect y="5" width="68" height="29" rx="14.5" fill="#D9D9D9" />
              <circle cx="52.5" cy="18.5" r="18.5" fill="#065FD4" />
            </svg>
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
