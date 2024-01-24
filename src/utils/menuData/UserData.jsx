import {
  MdSensors,
  MdOutlineLibraryMusic,
  MdOutlineCardMembership,
  MdHistoryEdu,
  MdOutlineShoppingCart,
  MdHeadset,
  MdOutlineVideoSettings,
  MdReportGmailerrorred,
  MdOutlinePsychologyAlt,
  MdSearch,
} from "react-icons/md";

import { BiMessageError } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { TfiClip } from "react-icons/tfi";

const menuData = [
  {
    id: 1,
    url: "/second-home",
    text: "Navigation",
    icon: <FaRegCompass />,
  },
  {
    id: 2,
    url: "/",
    text: "Mini Clips",
    icon: <TfiClip />,
  },
  {
    id: 3,
    url: "/",
    text: "Subscriptions",
    icon: <MdOutlineCardMembership />,
    line: true,
  },
  {
    id: 4,
    url: "/your-channel",
    text: "You",
    icon: <MdOutlineLibraryMusic />,
  },
  {
    id: 5,
    url: "/",
    text: "Chronicle",
    icon: <MdHistoryEdu />,
    line: true,
  },
  {
    id: 6,
    signIn: true,
  },
  {
    id: 7,
    url: "/",
    text: "E-Commerce",
    icon: <MdOutlineShoppingCart />,
    heading: "Tour/Search",
  },
  {
    id: 8,
    url: "/",
    text: "Entertainment",
    icon: <MdHeadset />,
  },
  {
    id: 9,
    url: "/",
    text: "Cinema",
    icon: <FaFilm />,
  },
  {
    id: 10,
    url: "/",
    text: "Livelens/OnAir",
    icon: <MdSensors />,
    line: true,
  },
  {
    id: 11,
    url: "/pages/login",
    text: "Stage Settings",
    icon: <MdOutlineVideoSettings />,
  },
  {
    id: 12,
    url: "/",
    text: "Complaint History",
    icon: <MdReportGmailerrorred />,
  },
  {
    id: 13,
    url: "/",
    text: "Assistance/Support",
    icon: <MdOutlinePsychologyAlt />,
  },
  {
    id: 14,
    url: "/",
    text: "Send Observation",
    icon: <BiMessageError />,
  },
];

export default menuData;
