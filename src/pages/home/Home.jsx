// import Splash from "./splash/Splash";
// import VideoList from '../../components/videoList/VideoList';
import { useDispatch } from "react-redux";
import Circle from "./Circle/Circle";
import { useEffect } from "react";
import { getAllVideo } from "../../redux/features/videoSlice";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideo());
  }, []);

  return (
    <>
      <div className=" circle-container">
        <Circle />
      </div>
    </>
  );
}

export default Home;
