import { useEffect, useState } from "react";
import VideoList from "../../components/videoList/VideoList";
import CategoryMenu from "../../components/categoreyMenu/CategoreyMenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo } from "../../redux/featurs/videoSlice";
import Loading from "../../assets/loader/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../assets/loader/SkeletonLoader";

function SecondHome() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = (pageValue) => {
    dispatch(getAllVideo(pageValue));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 500);
  };

  // const video = useSelector((state) => state.video);
  const { videoData, loading, categoryVideoData } = useSelector(
    (state) => state.video
  );
  console.log(videoData);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (videoData) {
      setData((prevData) => {
        if (page === 1) {
          return videoData;
        } else {
          return [...prevData, ...videoData];
        }
      });
    }
  }, [videoData]);

  useEffect(() => {
    categoryVideoData && setData(categoryVideoData);
  }, [categoryVideoData]);

  // useEffect(() => {
  //   if (video.videoData) {
  //     setData((prevData) => {
  //       if (page === 1) {
  //         return video.videoData;
  //       } else {
  //         return [...prevData, ...video.videoData];
  //       }
  //     });
  //   }
  // }, [video.videoData]);

  // useEffect(() => {
  //   video.categoryVideoData && setData(video.categoryVideoData);
  // }, [video.categoryVideoData]);

  return (
    <>
      <div>
        <CategoryMenu />
        {data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-center my-3">Loading...</h4>}
          >
            <VideoList data={data} />
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

        {/* {data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-center my-3">Loading...</h4>}
          >
            <VideoList data={data} />
          </InfiniteScroll>
        ) : (
          <h1>Loading</h1>
        )}
        {!videoData && (
          <h4 className="text-center mt-5">
            Sorry, the video data could not be found
          </h4>
        )} */}
      </div>
    </>
  );
}

export default SecondHome;
