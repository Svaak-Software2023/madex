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

import MarketPlace from "/assets/icons/marketplace.jpg";

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
// import InstantMessage from "/assets/icons/instantMessage.png";
import Sports from "/assets/icons/sports.png";
import unfiltered from "/assets/icons/unfiltered.png";
import filtered from "/assets/icons/filtered.png";
import liveHQ from "/assets/icons/liveHQ.png";
import podcast from "/assets/icons/podcast.png";
import MoviesAndEntertainment from "/assets/icons/movie&entertainment.png";
import My from "/assets/icons/my.png";
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
    url: "/fanscribe",
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
    text: "My Station",
    icon: MyStation,
    heading: "My ",
    headingIcon: My,
  },
  {
    id: 6,
    url: "/cronicle",
    text: "Chronicle",
    icon: Chronicle,
  },
  {
    id: 7,
    url: "/myVideos",
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
    url: "/favoriteVideo",
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
    url: "/xplore/65d462d2278dfe7ac59a0642",
    text: "Trends",
    icon: Trends,
    heading: "Xplore",
  },
  {
    id: 14,
    url: "/xplore/65d4746190902993aa291fc3",
    text: "Show Music",
    icon: ShowMusic,
  },
  {
    id: 15,
    url: "/xplore/65d479e3c735e4932c25df1b",
    text: "News",
    icon: News,
  },
  {
    id: 16,
    url: "/xplore/65d47a77c735e4932c25df1e",
    text: "The Epic Stream",
    icon: Live,
  },
  {
    id: 17,
    url: "/xplore/65d47b36c735e4932c25df27",
    text: "Game on",
    icon: GameON,
  },
  {
    id: 18,
    url: "/xplore/65d47cc2c735e4932c25df30",
    text: "FanMade",
    icon: FanMade,
  },
  {
    id: 19,
    url: "/xplore/65d47d7ac735e4932c25df33",
    text: "Education & Technology",
    icon: EducationAndTechnology,
  },
  {
    id: 20,
    url: "/xplore/65d47f82c735e4932c25df3c",
    text: "Vloga",
    icon: Vloga,
  },
  {
    id: 21,
    url: "/xplore",
    text: "Podcast",
    icon: podcast,
  },
  {
    id: 22,
    url: "/xplore/65d47fdec735e4932c25df3f",
    text: "Politics",
    icon: Politics,
  },
  {
    id: 23,
    url: "/xplore/65d480c3c735e4932c25df48",
    text: "Fun Box",
    icon: FunBox,
  },
  {
    id: 24,
    url: "/xplore/65d4822bc735e4932c25df4e",
    text: "PrankBase",
    icon: PrankBase,
  },
  {
    id: 25,
    url: "/chatRoom",
    text: "Chatroom",
    icon: ChatRoom,
  },
  {
    id: 26,
    url: "/livehQ",
    text: "LiveHQ",
    icon: liveHQ,
  },
  {
    id: 27,
    url: "/xplore/65a668d96104046df2544053",
    text: "Movie and Entertainment",
    icon: MoviesAndEntertainment,
  },
  {
    id: 28,
    url: "/xplore/65d48306c735e4932c25df58",
    text: "Clip Genesis",
    icon: ClipGenesis,
    line: true,
  },

  {
    id: 29,
    url: "/",
    text: "Marketplace",
    icon: MarketPlace,
    heading: "Tour/Search",
  },
  {
    id: 30,
    url: "/entertainment",
    text: "Entertainment",
    icon: Entertainment,
  },
  {
    id: 31,
    url: "/cinema",
    text: "Cinema",
    icon: Cinema,
  },
  {
    id: 32,
    url: "/liveLens",
    text: "Livelens/OnAir",
    icon: LiveLens,
    line: true,
  },
  {
    id: 33,
    url: "/madeXElite",
    text: "MadeX Elite",
    icon: MadeXElite,
    heading: "More from MadeXtube",
  },
  {
    id: 34,
    url: "/manage-video",
    text: "MadeX Studio",
    icon: MadeXStudio,
  },
  {
    id: 35,
    url: "/madeXmcue",
    text: "MadeX Mcue Music",
    icon: MadeXMcueMusic,
  },
  {
    id: 36,
    url: "/madeXJunior",
    text: "MadeX Junior",
    icon: MadeXJunior,
  },
  {
    id: 37,
    url: "/filtered",
    text: "filtered content",
    icon: filtered,
  },
  {
    id: 38,
    url: "/unfiltered",
    text: "Unfiltered content",
    icon: unfiltered,
  },
  {
    id: 39,
    url: "/madeXJunior",
    text: "Sports",
    icon: Sports,
    line: true,
  },
  {
    id: 40,
    url: "/setting",
    text: "Stage Settings",
    icon: StageSettings,
  },
  {
    id: 41,
    url: "/complaintHistory",
    text: "Complaint History",
    icon: ComplaintHistory,
  },
  {
    id: 42,
    url: "/assistant",
    text: "Assistance/Support",
    icon: AssistanceSupport,
  },
  {
    id: 43,
    url: "/sendObservation",
    text: "Send Observation",
    icon: SendObservation,
  },
];

export default menuData;
