import PrivacyImage from "/assets/setting/privacy.png";

const Privacy = () => {
  return (
    <>
      <div className="privacy_container">
        <p className="p-12">Privacy</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <p className="p-12">Manage what you share on MadeXtube</p>
            <span className="span-12">
              Choose who can see your subscriptions
            </span>
            <p>
              Review <span>MadeXtube Terms of Service </span> and
              <span>Google Privacy Policy</span>
            </p>
          </div>
          <div className="accpunt_image-container">
            <img src={PrivacyImage} alt="" />
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
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
              <p className="p-1234">Keep all my subscriptions private</p>
              <span className="span-123">
                Your subscriptions won&apos;t be visible to others, unless you
                use features that make them public. Learn more about what could
                make your subscriptions visible or manage your subscriptions
                here.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
