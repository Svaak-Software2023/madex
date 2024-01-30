import React, { useEffect, useState } from 'react';
import VideoList from '../../components/videoList/VideoList';
import CategoryMenu from '../../components/categoreyMenu/CategoreyMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideo } from '../../redux/featurs/videoSlice';
import Loading from '../../assets/loader/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function SecondHome() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = (pageValue) => {
    dispatch(getAllVideo(pageValue));
    console.log("called", pageValue);
  };

  // Initial fetch
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 500);
  };

  const video = useSelector((state) => state.video);

  useEffect(() => {
    if (video.videoData) {
      setData((prevData) => [...prevData, ...video.videoData]);
    }
  }, [video.videoData]);

  // if(video.loading) return <Loading/>
  return (
    <>
      <div>
        <CategoryMenu />
        {data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4 className='text-center my-3'>Loading...</h4>}
          >
            <VideoList data={data} />
          </InfiniteScroll>
        ) : (
          <h4 className='text-center mt-5'>Sorry, the video data could not be found</h4>
        )}
      </div>
    </>
  );
}

export default SecondHome;
