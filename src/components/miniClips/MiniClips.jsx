import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryVideo } from "../../redux/featurs/videoSlice";
import VideoList from "../videoList/VideoList";
import { getAllCategory } from "../../redux/featurs/categorySlice";

const MiniClips = () => {
  const dispatch = useDispatch();
  const miniClips = useSelector((state) => state.category.categoryData);
  const miniClipVideo = useSelector((state) => state.video.categoryVideoData);

  const categoryId = miniClips?.find((i) => i.categoryName === "Shorts");

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllCategoryVideo(categoryId?._id));
  }, []);

  if (!miniClipVideo || miniClipVideo.length === 0) {
    return (
      <>
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/playlist.png" alt="" />
          </div>
          <h3 className="heading-name">Mini Clips</h3>
        </div>
        <h4 className="text-center mt-5">No Data found</h4>;
      </>
    );
  }

  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/miniClips.png" alt="" />
        </div>
        <h3 className="heading-name">Mini Clips</h3>
      </div>
      <div className="my-3 w-100">
        <VideoList data={miniClipVideo} />
      </div>
    </>
  );
};

export default MiniClips;
