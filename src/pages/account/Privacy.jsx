import PrivacyImage from "/assets/setting/privacy.png";

const Privacy = () => {
  return (
    <>
      <div className="privacy_container">
        <p className="p-1">Privacy</p>
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
            <div className="cl-toggle-switch">
              <label className="cl-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>
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
