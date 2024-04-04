import { useEffect, useState } from "react";
import VideoList from "../../components/videoList/VideoList";
import CategoryMenu from "../../components/categoreyMenu/CategoreyMenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo } from "../../redux/featurs/videoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../assets/loader/SkeletonLoader";
import CategorySlider from "../../components/categoreyMenu/CategorySlider";

function SecondHome() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const [hasMore, setHasMore] = useState(true);

  const fetchData = (pageValue) => {
    dispatch(getAllVideo(pageValue));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage - 1);
    }, 500);
  };

  // const video = useSelector((state) => state.video);
  const { videoData, pagination, categoryVideoData } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    if (videoData?.length < 12) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [videoData]);

  useEffect(() => {
    if (pagination) {
      setPage(pagination.totalPages);
    }
  }, [pagination?.totalPages]);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    if (videoData) {
      const newArray = shuffleArray(videoData);
      setData((prevData) => {
        if (page === pagination?.totalPages) {
          return newArray;
        } else {
          return [...prevData, ...newArray];
        }
      });
    }
  }, [videoData]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // useEffect(() => {
  //   if (videoData) {
  //     setData((prevData) => {
  //       if (page === 1) {
  //         return videoData;
  //       } else {
  //         return [...prevData, ...videoData];
  //       }
  //     });
  //   }
  // }, [videoData]);

  useEffect(() => {
    categoryVideoData && setData(categoryVideoData);
  }, [categoryVideoData]);

  return (
    <>
      <div>
        {/* <CategoryMenu /> */}
        <CategorySlider width="98%" />
        {data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            // loader={<h4 className="text-center my-3">Loading...</h4>}
          >
            <VideoList data={data} />;
          </InfiniteScroll>
        ) : (
          <div className="d-flex flex-wrap flex-row bd-highlight justify-content-center mx-auto">
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8], (item) => (
              <>
                <SkeletonLoader key={item._index} />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SecondHome;
