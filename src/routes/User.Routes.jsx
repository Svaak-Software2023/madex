import Error404 from "../components/Error/Error404";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Downloads from "../pages/downloads/Downloads";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import SecondHome from "../pages/second-home/SecondHome";
import Upload from "../pages/uploadVideo/Upload";
import SingleVideo from "../pages/videoPlayer/SingleVideo";
import WatchLater from "../pages/watchLater/WatchLater";
import YourChannel from "../pages/yourChannel/YourChannel";
import History from "../pages/history/History";

const UserRoutes = [
  { name: "404 Error", path: "*", element: <Error404 />, isPrivate: false },
  { name: "Home", path: "/", element: <Home />, isPrivate: false },
  {
    name: "Second Home",
    path: "/second-home",
    element: <SecondHome />,
    isPrivate: false,
  },
  {
    name: "Video Player",
    path: "/video/:videoId",
    element: <SingleVideo />,
    isPrivate: false,
  },
  { name: "Login", path: "/login", element: <Login />, isPrivate: false },
  {
    name: "Create Account",
    path: "/create-account",
    element: <CreateAccount />,
    isPrivate: false,
  },
  {
    name: "Your Channel",
    path: "/your-channel",
    element: <YourChannel />,
    isPrivate: true,
  },
  {
    name: "Upload Video",
    path: "/upload-video",
    element: <Upload />,
    isPrivate: true,
  },
  {
    name: "Watch Later",
    path: "/watch-later",
    element: <WatchLater />,
    isPrivate: true,
  },
  {
    name: "Downloads",
    path: "/downloads",
    element: <Downloads />,
    isPrivate: true,
  },
  { name: "History", path: "/cronicle", element: <History />, isPrivate: true },
];

export default UserRoutes;
