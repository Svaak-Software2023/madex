const AdvancedSetting = () => {
  return (
    <>
      <div className="advanced_setting">
        <p className="p-1">Advanced Setting</p>
        <p className="p-12 mt-5">Set up MadeXtube exactly how you want it</p>
        <div className="d-flex justify-content-between flex-column">
          <div className="d-flex justify-content-between mt-5">
            <p className="p-123">User ID</p>
            <div className="d-flex ">
              <div className="input-container d-flex justify-content-between mx-5">
                <input type="text" className="" value="2-19iy8vOFx6B_KY4W5w" />
                <button className="copy_button ">Copy</button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <p className="p-123">Station Username</p>
            <div className="d-flex ">
              <div className="input-container d-flex justify-content-between mx-5">
                <input
                  type="text"
                  className=""
                  value="UC2-19iy8Fx6B_KY4WAG5w"
                />
                <button className="copy_button ">Copy</button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <p className="p-123">Convert Station </p>
            <div className="d-flex flex-column">
              <p className="blue-text">Convert Station to a Business </p>

              <span className="span-123">
                You can convert your station to a business account
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <p className="p-123">Erase Station</p>
            <div className="d-flex flex-column">
              <p className="blue-text"> Erase Station</p>
              <span className="span-123">
                Erasing and deleting all Stations and content off site is
                permanent. This can not be undone!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSetting;
