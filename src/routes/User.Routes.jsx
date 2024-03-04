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
import Playlist from "../pages/playlist/Playlist";
import PlaylistVideo from "../pages/playlist/PlaylistVideo";
// import MiniClips from "../components/miniClips/MiniClips";
import FavoriteVideo from "../pages/favoriteVideo/FavoriteVideo";
import ShortsPlayer from "../components/shortsPlayer/ShortsPlayer";
import Fanscribe from "../pages/fanscribe/Fanscribe";
import Station from "../pages/yourChannel/channelTabs/Stations";
import MyVideos from "../pages/myVideos/MyVideos";

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
  {
    name: "Mini Clips",
    path: "/mini-clips",
    element: <ShortsPlayer />,
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
  {
    name: "Playlist",
    path: "/playlist",
    element: <Playlist />,
    isPrivate: true,
  },
  {
    name: "Playlist videos",
    path: "/playlistVideo/:playlistId",
    element: <PlaylistVideo />,
    isPrivate: true,
  },
  {
    name: "Favorite videos",
    path: "/favoriteVideo",
    element: <FavoriteVideo />,
    isPrivate: true,
  },
  {
    name: "Fanscribe",
    path: "/fanscribe",
    element: <Fanscribe />,
    isPrivate: true,
  },
  {
    name: "Yuor Channel",
    path: "/fanscribeStation/:username",
    element: <Station />,
    isPrivate: true,
  },
  {
    name: "My Video",
    path: "/myVideos",
    element: <MyVideos />,
    isPrivate: true,
  },
];

export default UserRoutes;
