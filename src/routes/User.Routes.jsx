import Error404 from "../components/Error/Error404";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import SecondHome from "../pages/second-home/SecondHome";
import Upload from "../pages/uploadVideo/Upload";
import SingleVideo from "../pages/videoPlayer/SingleVideo";
import YourChannel from "../pages/yourChannel/YourChannel";

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
];

export default UserRoutes;
