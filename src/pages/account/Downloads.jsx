const Downloads = () => {
  return (
    <>
      <div className="download_container">
        <p className="p-1">Downloads</p>
        <div className="mt-3">
          <p className="p-12">Control your download settings</p>
          <span className="span-1">
            Download settings apply to this browser only
          </span>
        </div>
        <p className="p-12345 mt-5">Download quality</p>

        <div className="d-flex flex-column mx-5">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label className="form-check-label mx-3" htmlFor="exampleRadios1">
              Ask every time
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
              checked
            />
            <label className="form-check-label mx-3" htmlFor="exampleRadios1">
              Standard (480p)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label className="form-check-label mx-3" htmlFor="exampleRadios1">
              Low (144p)
            </label>
          </div>
        </div>

        <div className="d-flex flex-column mt-5">
          <p className="p-1234">Uninstall downloads</p>
          <div className="d-flex justify-content-between">
            <span className="span-12">
              Uninstalling downloads will clear up space on your account
            </span>
            <button className="unistall_button">Uninstall downloads</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Downloads;
