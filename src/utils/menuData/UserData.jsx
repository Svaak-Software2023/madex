import Compass from "/assets/icons/compass.png";
import MiniClip from "/assets/icons/miniClips.png";
import Subscription from "/assets/icons/subscriptions.png";
import MyStation from "/assets/icons/myStation.png";

import Chronicle from "/assets/icons/chronicle.png";

import Videos from "/assets/icons/videos.png";

import WatchLater from "/assets/icons/watchLater.png";

import FavoriteVideo from "/assets/icons/favoriteVideo.png";

import Download from "/assets/icons/download.png";

import PLaylist from "/assets/icons/playlist.png";

import MarketPlace from "/assets/icons/marketPlace.png";

import Entertainment from "/assets/icons/entertainment.png";

import Cinema from "/assets/icons/cinema.png";

import LiveLens from "/assets/icons/livelensOnAir.png";
import MadeXElite from "/assets/icons/madeXElite.png";

import MadeXStudio from "/assets/icons/madeXStudio.png";

import MadeXMcueMusic from "/assets/icons/madeXMcueMusic.png";

import MadeXJunior from "/assets/icons/madeXJunior.png";

import StageSettings from "/assets/icons/stageSettings.png";

import ComplaintHistory from "/assets/icons/complaintHistory.png";
import AssistanceSupport from "/assets/icons/assistanceSupport.png";

import SendObservation from "/assets/icons/sendObservation.png";
import VideoStroll from "/assets/icons/videoStroll.png";
import Trends from "/assets/icons/trends.png";
import ShowMusic from "/assets/icons/showMusic.png";

import News from "/assets/icons/news.png";
import Live from "/assets/icons/live.png";
import GameON from "/assets/icons/gameOn.png";
import FanMade from "/assets/icons/fanMade.png";
import EducationAndTechnology from "/assets/icons/educationAndTechnology.png";
import Vloga from "/assets/icons/vloga.png";
import Politics from "/assets/icons/politics.png";
import FunBox from "/assets/icons/funBox.png";
import PrankBase from "/assets/icons/prankBase.png";
import ChatRoom from "/assets/icons/chatRoom.png";
import ClipGenesis from "/assets/icons/clipGenesis.png";
import InstantMessage from "/assets/icons/instantMessage.png";
// import  from "/assets/icons/.png";

// import My from "/assets/icons/my.png";

const menuData = [
  {
    id: 1,
    url: "/second-home",
    text: "Navigation",
    icon: Compass,
  },
  {
    id: 2,
    url: "/mini-clips",
    text: "Mini Clips",
    icon: MiniClip,
  },
  {
    id: 3,
    url: "/",
    text: "Fanscription",
    icon: Subscription,
  },
  {
    id: 4,
    url: "/",
    text: "Video Stroll",
    icon: VideoStroll,
    line: true,
  },

  {
    id: 5,
    url: "/your-channel",
    text: "My Stations",
    icon: MyStation,
    heading: "My >",
  },
  {
    id: 6,
    url: "/cronicle",
    text: "Chronicle",
    icon: Chronicle,
  },
  {
    id: 7,
    url: "/",
    text: "My Videos",
    icon: Videos,
  },

  {
    id: 8,
    url: "/watch-later",
    text: "Continue later",
    icon: WatchLater,
  },
  {
    id: 9,
    url: "/",
    text: "Favorite Video",
    icon: FavoriteVideo,
  },
  {
    id: 10,
    url: "/downloads",
    text: "Download",
    icon: Download,
  },
  {
    id: 11,
    url: "/playlist",
    text: "Playlist",
    icon: PLaylist,
    line: true,
  },
  {
    id: 12,
    signIn: true,
  },

  {
    id: 13,
    url: "/",
    text: "Trends",
    icon: Trends,
    heading: "Xplore",
  },
  {
    id: 14,
    url: "/",
    text: "Show Music",
    icon: ShowMusic,
  },
  {
    id: 15,
    url: "/",
    text: "News",
    icon: News,
  },
  {
    id: 16,
    url: "/",
    text: "Live",
    icon: Live,
  },
  {
    id: 17,
    url: "/",
    text: "Game on",
    icon: GameON,
  },
  {
    id: 18,
    url: "/",
    text: "FanMade",
    icon: FanMade,
  },
  {
    id: 19,
    url: "/",
    text: "Education & Technology",
    icon: EducationAndTechnology,
  },
  {
    id: 20,
    url: "/",
    text: "Vloga",
    icon: Vloga,
  },
  {
    id: 21,
    url: "/",
    text: "Politics",
    icon: Politics,
  },
  {
    id: 22,
    url: "/",
    text: "Fun Box",
    icon: FunBox,
  },
  {
    id: 23,
    url: "/",
    text: "PrankBase",
    icon: PrankBase,
  },
  {
    id: 24,
    url: "/",
    text: "Chatroom",
    icon: ChatRoom,
  },
  {
    id: 25,
    url: "/",
    text: "Clip Genesis",
    icon: ClipGenesis,
  },
  {
    id: 26,
    url: "/",
    text: "Instant Message",
    icon: InstantMessage,
    line: true,
  },
  {
    id: 27,
    url: "/",
    text: "Marketplace",
    icon: MarketPlace,
    heading: "Tour/Search",
  },
  {
    id: 28,
    url: "/",
    text: "Entertainment",
    icon: Entertainment,
  },
  {
    id: 29,
    url: "/",
    text: "Cinema",
    icon: Cinema,
  },
  {
    id: 30,
    url: "/",
    text: "Livelens/OnAir",
    icon: LiveLens,
    line: true,
  },
  {
    id: 31,
    url: "/",
    text: "MadeX Elite",
    icon: MadeXElite,
    heading: "More from MadeXtube",
  },
  {
    id: 32,
    url: "/",
    text: "MadeX Studio",
    icon: MadeXStudio,
  },
  {
    id: 33,
    url: "/",
    text: "MadeX Mcue Music",
    icon: MadeXMcueMusic,
  },
  {
    id: 34,
    url: "/",
    text: "MadeX Junior",
    icon: MadeXJunior,
    line: true,
  },
  {
    id: 35,
    url: "/pages/login",
    text: "Stage Settings",
    icon: StageSettings,
  },
  {
    id: 36,
    url: "/",
    text: "Complaint History",
    icon: ComplaintHistory,
  },
  {
    id: 37,
    url: "/",
    text: "Assistance/Support",
    icon: AssistanceSupport,
  },
  {
    id: 38,
    url: "/",
    text: "Send Observation",
    icon: SendObservation,
  },
];

export default menuData;
