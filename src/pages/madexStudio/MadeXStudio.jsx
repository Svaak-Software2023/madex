import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./style.css";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../redux/featurs/commentSlice";

const SettingMenus = [
  {
    id: 1,
    name: "Video",
  },
  {
    id: 2,
    name: "Mini Clips",
  },
  {
    id: 3,
    name: "Live",
  },
  {
    id: 4,
    name: "Playlist",
  },
  {
    id: 5,
    name: "Podcasts",
  },
];
const MadeXStudio = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { data: channelData } = useSelector((state) => state.channel);
  const videos = useSelector((state) => state.video.channelVideoData);
  // const commentData = useSelector((state) => state.comment.commentData);
  // console.log(commentData);

  const dispatch = useDispatch();
  const videoId = videos && videos._id;

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    channelData && dispatch(getAllChanelVideo(channelData._id));
  }, [channelData]);
  useEffect(() => {
    dispatch(getAllComments({ videoId }));
  }, [dispatch]);

  const columns = [
    {
      name: "Video",
      selector: (row) => <img src={row.thumbnail} alt="" height={"50px"} />,
    },
    {
      name: "",
      selector: () => "Description",
    },
    {
      name: "Visibility",
      selector: (row) => row.year,
    },
    {
      name: "Restrictions",
      selector: () => "Private",
    },
    {
      name: "Date",
      selector: (row) => (row.createdAt ? row.createdAt.split("T")[0] : "N/A"),
    },
    {
      name: "Views",
      selector: (row) => row.views,
    },
    {
      name: "Opinions",
      selector: () => 46545,
    },
    {
      name: "Up-Vote/Down-Vote",
      selector: () => 35456,
    },
  ];

  return (
    <>
      <div className="container">
        <h3 className="mt-3">Station content</h3>
        <div className="menu-header">
          {SettingMenus.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleTabClick(item.id)}
                className={`menu-btn ${
                  activeTab === index + 1 && "menu-active-btn"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <DataTable columns={columns} data={videos} selectableRows pagination />
      </div>
    </>
  );
};

export default MadeXStudio;
