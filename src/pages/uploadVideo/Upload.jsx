import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import Loading from "../../assets/loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { videoUpload } from "../../redux/featurs/videoSlice";
import { getAllCategory } from "../../redux/featurs/categorySlice";
import ProgressBar from "./ProgressBar";
import { getChannel } from "../../redux/featurs/channelSlice";
import { useNavigate } from "react-router-dom";

function Upload() {
  // Create a state to count upload parcent
  const [percentage, setPercentage] = useState(0);

  // Define ref to triger invisible input
  const myref = useRef();
  const selectVideoHandler = () => {
    myref.current.click();
  };

  // Get video state from the store
  const video = useSelector((state) => state.video);

  // Get user state from the store
  const user = useSelector((state) => state.auth);

  const channel = useSelector((state) => state.channel);
  const accessToken = useSelector((state) => state.auth.data);

  // Call api to featch categorey data using reducer function
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getChannel(user.user._id));
  }, []);

  // Get categorey state from the store
  const category = useSelector((state) => state.category);

  //Create state to store the video file and thumbnail
  const [file, setFile] = useState({ videoFile: "", thumbnail: "" });

  //Import from react use hook for handling form and vailidate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //File on change handler
  const fileHandler = (e) => {
    const name = e.target.name;
    const size = (e.target.files[0].size / 1024 / 1024).toFixed(2);
    if (size > 200) {
      alert("Video size is to large.");
    }
    setFile((prevFile) => ({
      ...prevFile,
      [name]: e.target.files[0],
    }));
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  //Form submit handler function
  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("userId", user.user._id);
    formData.append("videoFile", file.videoFile);
    formData.append("thumbnail", file.thumbnail);
    formData.append("views", 0);
    formData.append("channelId", channel.data._id);

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    dispatch(
      videoUpload({
        formData,
        setPercentage,
        navigate,
        accessToken: accessToken.accessToken,
      })
    );
  };

  //Showing Loading
  if (category.loading) return <Loading />;

  //Showing Progress bar
  if (video.loading) return <ProgressBar percentage={percentage} />;

  return (
    <>
      <div className="mx-2">
        <h3 className="mt-3 mx-3">Upload Video</h3>
        <div className="row m-0 p-0">
          <div className="col-lg-6 col-12 my-3">
            <div className="upload-video-input" onClick={selectVideoHandler}>
              <div className="upload-vido-input-inner">
                <h3 className="text-center">Select Video To Upload</h3>
                <h2>
                  {" "}
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
            {/* <h5 className='fw-bold'>Video Details</h5> */}
            <form onSubmit={handleSubmit(submitHandler)}>
              {/* select video input */}
              <input
                type="file"
                className="select-video-upload-video"
                ref={myref}
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
                      {...register("title", { required: true })}
                    />
                    {errors.videoTitle && (
                      <p className="text-danger">Video Title is required</p>
                    )}
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
                      {...register("description", { required: true })}
                    />
                    {errors.videoDescription && (
                      <p className="text-danger">
                        Video Description is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-12">
                  <div className="video-upload-form-input">
                    <label htmlFor="videoCategories">Video Categories</label>
                    <select
                      type="text"
                      className="w-100 video-upload-input-field"
                      id="videoCategories"
                      {...register("categoryId", { required: true })}
                    >
                      <option value="">Select Category</option>
                      {category.categoryData &&
                        category?.categoryData?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                    </select>
                    {errors.videoCategories && (
                      <p className="text-danger">
                        Video Categories is required
                      </p>
                    )}
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
                    />
                    {errors.videoThumbnails && (
                      <p className="text-danger">
                        Video Thumbnails is required
                      </p>
                    )}
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
export default Upload;
