import { useEffect, useState } from "react";
import "./style.css";
import { getAllCategory } from "../../redux/featurs/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryVideo } from "../../redux/featurs/videoSlice";
// import { useNavigate } from "react-router-dom";

function CategoreyMenu() {
  // dispach for call redux function
  const dispatch = useDispatch();

  // state to store category data
  const [data, setData] = useState([]);

  // get category data from store
  const category = useSelector((state) => state.category);

  // call get category api on first render
  useEffect(() => {
    !category.categoryData && dispatch(getAllCategory());
    category.categoryData && setData(category.categoryData);
  }, []);

  // set category data
  useEffect(() => {
    category.categoryData && setData(category.categoryData);
  }, [category.categoryData]);

  // call video api acording the category
  const handleClick = (categoryId) => {
    dispatch(getAllCategoryVideo(categoryId));
  };

  // call get all video api
  // const navigate=useNavigate()
  // const handlAllData = () => {
  //    const defaultRecommendData =
  //      video.videoData &&
  //      video.videoData.filter((item) => item._id !== video.singleVideo._id);
  // };

  return (
    <div className="categorey-menu-main mt-0">
      <div className="categotrey-menu-list">
        <div className="categorey-menu-item px-2">
          <span>All</span>
        </div>
        {data?.map((item) => (
          <div
            className="categorey-menu-item "
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            <span>{item.categoryName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoreyMenu;
