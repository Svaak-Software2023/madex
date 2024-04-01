import { useEffect, useRef, useState } from "react";
import "./style.css";
import { getAllCategory } from "../../redux/featurs/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryVideo } from "../../redux/featurs/videoSlice";
// import { useNavigate } from "react-router-dom";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

function CategoreyMenu() {
  const dispatch = useDispatch();

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

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="categorey-menu-main mt-0">
      <button className="arrow-button" onClick={previous}>
        <MdKeyboardArrowLeft />
      </button>
      <div className="categotrey-menu-list">
        <div className="slider-container">
          <Slider
            {...settings}
            ref={(slider) => {
              sliderRef = slider;
            }}
          >
            <div className="categorey-menu-item">
              <span>All</span>
            </div>
            {data?.map((item) => (
              <div
                className="categorey-menu-item"
                key={item._id}
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
            ))}
          </Slider>
        </div>
      </div>

      <button className="arrow-button" onClick={next}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
}

export default CategoreyMenu;
