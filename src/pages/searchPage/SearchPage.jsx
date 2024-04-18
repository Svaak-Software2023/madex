import { Link, useParams } from "react-router-dom";
// import CategoreyMenu from "../../components/categoreyMenu/CategoreyMenu";
import "./style.css";
import { useEffect, useState } from "react";
// import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedData } from "../../redux/features/searchVideo";
// import { API } from "../../redux/api";

const SearchPage = () => {
  const { key } = useParams();
  const dispatch = useDispatch();

  const [foundVideo, setFoundVideo] = useState([]);
  const searchedData = useSelector((state) => state.search.searchedData);

  useEffect(() => {
    dispatch(getSearchedData({ searchTerm: key }));
    setFoundVideo(searchedData);
    // async function findTheVideo() {
    //   try {
    //     const res = await axios.post(
    //       "http://localhost:8000/api/v1/video/search-video",
    //       { searchTerm: key }
    //     );
    //     if (res.data) setFoundVideo(res.data);
    //   } catch (error) {
    //     console.error("Error fetching video:", error);
    //     setFoundVideo([]);
    //   }
    // }
    // findTheVideo();
  }, [key]);

  if (!searchedData) {
    return <p className="searchPage_notFound">Sorry, no videos found.</p>;
  }
  return (
    <div>
      {/* <CategoreyMenu /> */}
      {foundVideo?.length === 0 ? (
        <p className="searchPage_notFound">Sorry, no videos found.</p>
      ) : (
        foundVideo?.map((item, index) => (
          <Link to={`/video/${item?._id}`} key={index}>
            <div className="searchPage_mainDiv">
              <div className="searchPage_Div1">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="searchPage_Div2">
                <h3>{item.title}</h3>
                <p>
                  {item.views} Views • {moment(item.createdAt).fromNow()}
                </p>
                <div className="d-flex gap-2 align-items-center">
                  <img
                    src={item.channelData?.owner?.avatar}
                    alt={item?.channelData?.channelName}
                  />
                  {item?.channelData?.channelName}
                </div>
                <p>{item?.description.slice(0, 100)}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchPage;
