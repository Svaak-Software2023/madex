import { useEffect, useState } from "react";
import "./style.css";
import { getAllCategory } from "../../redux/features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryVideo } from "../../redux/features/videoSlice";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
function CategorySlider(props) {
  const { width } = props;
  // console.log(width);
  const dispatch = useDispatch();

  //   const path = useLocation();
  const loca = window.location.hash;

  const [data, setData] = useState([]);

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

  return (
    <div className="categorey-menu-main mt-0">
      <div className="categotrey-menu-list" style={{ width: width }}>
        <div className="slider-container">
          <Swiper
            slidesPerView={10}
            spaceBetween={2}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="categorey-menu-item">
                <span>All</span>
              </div>
            </SwiperSlide>
            {data?.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className="categorey-menu-item"
                  onClick={() => handleClick(item._id)}
                >
                  {item?.categoryImage && (
                    <img
                      src={item?.categoryImage}
                      alt=""
                      height={32}
                      width={30}
                    />
                  )}
                  <span>{item.categoryName}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CategorySlider;
