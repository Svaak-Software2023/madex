import { useEffect, useRef, useState } from "react";
import "./style.css";
import { MdCloudUpload } from "react-icons/md";
import Loading from "../../assets/loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { videoUpload } from "../../redux/featurs/videoSlice";
import { getAllCategory } from "../../redux/featurs/categorySlice";
import ProgressBar from "./ProgressBar";
import { getChannel } from "../../redux/featurs/channelSlice";
import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

function UploadVideo() {
  // Create a state to count upload parcent
  const [percentage, setPercentage] = useState(0);

  // Define ref to trigger invisible input
  const fileInputRef = useRef(null);

  // Get video state from the store
  const video = useSelector((state) => state.video);

  // Get user state from the store
  const user = useSelector((state) => state.auth);

  const channel = useSelector((state) => state.channel);
  const accessToken = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Call API to fetch category data using reducer function
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getChannel(user.user._id));
  }, []);

  // Get category state from the store
  const category = useSelector((state) => state.category);

  // Create state to store the video file and thumbnail
  const [file, setFile] = useState({ videoFile: "", thumbnail: "" });

  // File onChange handler
  //   const fileHandler = (e) => {
  //     const name = e.target.name;
  //     const size = (e.target.files[0].size / 1024 / 1024).toFixed(2);
  //     if (size > 200) {
  //       alert("Video size is too large.");
  //     }
  //     setFile((prevFile) => ({
  //       ...prevFile,
  //       [name]: e.target.files[0],
  //     }));
  //   };

  // File onChange handler
  const fileHandler = (e) => {
    const name = e.target.name;
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return; // No file selected, do nothing
    }
    const size = (selectedFile.size / 1024 / 1024).toFixed(2);
    if (size > 200) {
      alert("Video size is too large.");
      return;
    }
    setFile((prevFile) => ({
      ...prevFile,
      [name]: selectedFile,
    }));
  };
  // Form submit handler function
  const submitHandler = (e) => {
    e.preventDefault();

    // Check if channelId and categoryId are present
    if (!channel.data || !channel.data._id) {
      console.error("Channel ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.user._id);
    formData.append("videoFile", file.videoFile);
    formData.append("thumbnail", file.thumbnail);
    formData.append("views", 0);
    formData.append("channelId", channel.data._id);

    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    // formData.append("categoryIds", e.target.categoryId.value);

    // Get selected category IDs from the form
    const selectedCategoryIds = Array.from(
      e.target["categoryIds"].selectedOptions
    ).map((option) => option.value);

    // Convert the selected category IDs to valid ObjectId strings
    // const categoryObjectIds = selectedCategoryIds.map((id) =>
    //   mongoose.Types.ObjectId(id)
    // );

    selectedCategoryIds.forEach((categoryId) => {
      formData.append("categoryIds", categoryId);
    });

    console.log("Video data:", formData);
    dispatch(
      videoUpload({
        formData,
        setPercentage,
        navigate,
        accessToken: accessToken.accessToken,
      })
    );
  };

  // Showing Loading
  if (category.loading) return <Loading />;

  // Showing Progress bar
  if (video.loading) return <ProgressBar percentage={percentage} />;
  //   const animatedComponents = makeAnimated();
  //   console.log("Category Data:", category.categoryData);

  return (
    <>
      <div className="mx-2">
        <h3 className="mt-3 mx-3">Upload Video</h3>
        <div className="row m-0 p-0">
          <div className="col-lg-6 col-12 my-3">
            <div
              className="upload-video-input"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="upload-vido-input-inner">
                <h3 className="text-center">Select Video To Upload</h3>
                <h2>
                  <MdCloudUpload />
                </h2>
                <h6>{file.videoFile.name}</h6>
                {/* showing error message  */}
                {!file && !file.videoFile && (
                  <p className="text-danger fw-bold text-center">
                    Video is required
                  </p>
                )}
                <p>maximum file size: 200 MB</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-3">
            <form onSubmit={submitHandler}>
              {/* select video input */}
              <input
                type="file"
                className="select-video-upload-video"
                ref={fileInputRef}
                name="videoFile"
                onChange={fileHandler}
              />

              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="video-upload-form-input">
                    <label htmlFor="videoTitle">Video Title</label>
                    <input
                      type="text"
                      className="w-100 video-upload-input-field"
                      id="videoTitle"
                      name="title"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-12">
                  <div className="video-upload-form-input">
                    <label htmlFor="videoDescription">Video Description</label>
                    <textarea
                      rows={5}
                      id="videoDescription"
                      type="text"
                      className="w-100 video-upload-input-field"
                      name="description"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-12">
                  <div className="video-upload-form-input">
                    <label htmlFor="videoCategories">Video Categories</label>

                    {/* <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue="Select Category"
                      isMulti
                      options={category?.categoryData?.map((item) => ({
                        value: item._id,
                        label: item.categoryName,
                      }))}
                                          name="categoryIds"
                                          value={}
                    /> */}
                    <select
                      type="text"
                      className="w-100 video-upload-input-field"
                      id="videoCategories"
                      name="categoryIds"
                      required
                      multiple
                    >
                      <option value="">Select Category</option>
                      {category.categoryData &&
                        category?.categoryData?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-12 col-12">
                  <div className="video-upload-form-input">
                    <label htmlFor="videoThumbnails">Video Thumbnails</label>
                    <input
                      type="file"
                      className="w-100 video-upload-input-field"
                      id="videoThumbnails"
                      name="thumbnail"
                      onChange={fileHandler}
                      required
                    />
                  </div>
                </div>

                <div className="upload-video-button">
                  <button type="submit">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
