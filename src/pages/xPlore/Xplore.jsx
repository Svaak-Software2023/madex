import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getAllCategoryVideo } from "../../redux/features/videoSlice";
import VideoList from "../../components/videoList/VideoList";

const Xplore = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const location = useLocation();
  const params2 = new URLSearchParams(location.search);
  const image = params2.get("image");
  const text = params2.get("text");
  const categoryId = params.id || "";
  const xploreCategoryData = useSelector(
    (state) => state.video.categoryVideoData
  );

  useEffect(() => {
    dispatch(getAllCategoryVideo(categoryId));
  }, [categoryId, location, dispatch]);

  return (
    <>
      <div className="container">
        <div className="page-heading">
          <div className="heading-img-container">
            <img src={image} alt="" />
          </div>
          <h3 className="heading-name">{text}</h3>
        </div>

        {!xploreCategoryData && (
          <>
            <div className="text-center">
              <img
                src="/assets/messageImages/noVideos.jpg"
                alt=""
                style={{ height: "300px", margin: "auto" }}
              />
              <h4 className="mt-2 text-4xl font-bold text-gray-800">
                No Video yet, But Not for Long
              </h4>
              <p className="mt-2 text-gray-600">Excitement Ahead!</p>
            </div>
          </>
        )}
        <div className="my-3 w-100">
          <VideoList data={xploreCategoryData} />
        </div>
      </div>
    </>
  );
};

export default Xplore;
