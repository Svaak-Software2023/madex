import "./style.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
function ShortsPlayer() {
  const shortVideo = useSelector((state) => state.video.singleVideo);
  console.log("Short Video:", shortVideo);
  return (
    <>
      <div style={{ width: "100%" }}>
        <ReactPlayer
          url={shortVideo?.videoFile}
          controls
          playing
          width={300}
          height={500}
        />
      </div>
    </>
  );
}

export default ShortsPlayer;
