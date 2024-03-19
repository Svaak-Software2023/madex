import { useEffect, useState } from "react";
import "./style.css";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../../redux/featurs/shortsSlice";
function ShortsPlayer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShorts());
  }, []);

  const shortVideo = useSelector((state) => state.shorts.data);

  const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoClick = (index) => {
    setPlayingIndex(index);
  };
  return (
    <>
      {shortVideo?.map((item, i) => (
        <div
          style={{ width: "100%" }}
          key={i}
          onMouseEnter={() => handleVideoClick(i)}
        >
          <div className="shorts-main mb-3">
            <ReactPlayer
              url={item?.videoFile}
              // controls
              playing={playingIndex === i}
              width={500}
              height={600}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default ShortsPlayer;
