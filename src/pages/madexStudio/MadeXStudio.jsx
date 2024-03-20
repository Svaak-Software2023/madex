import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./style.css";
import { getAllChanelVideo } from "../../redux/featurs/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../redux/featurs/commentSlice";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import UpdateVideoModal from "./UpdateVideoModal";
import DeleteVideoModal from "./DeleteVideoModal";
import { Toaster } from "sonner";
import { getPlaylistData } from "../../redux/featurs/playlistSlice";

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
  const playlistData = useSelector((state) => state.playlist.playlistData);

  console.log(playlistData);

  // const commentData = useSelector((state) => state.comment.commentData);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  const [delVideoId, setDelVideoId] = useState(null);

  const [singleVideo, setSingleVideo] = useState(null);

  const onlyVideos = videos?.filter((item) =>
    item.videoCategory.find((i) => i != "65af9c1d300e52cac8fa193e")
  );

  const onlyClips = videos?.filter((item) =>
    item.videoCategory.find((i) => i == "65af9c1d300e52cac8fa193e")
  );

  function openModal(id) {
    const findSingleVideo = videos.find((item) => item._id === id);
    setSingleVideo(findSingleVideo);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal2(id) {
    setDelVideoId(id);

    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

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

  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if (userId) {
      dispatch(getPlaylistData({ userId }));
    }
  }, [userId]);

  const playlistColumns = [
    {
      name: "Playlist",
      selector: (row) => (
        <div className="video_details">
          <div className="video_img">
            <img src={row.videos[0].thumbnail} alt="" height={"70px"} />
          </div>
          <div className="video_actions">
            <div className="title_desc">
              <p>{`${row.name?.substring(0, 20)}...`}</p>
              <p>{`${row.description?.substring(0, 25)}...`}</p>
            </div>
            <div className="actions_icon">
              <div className="icons" onClick={() => openModal(row._id)}>
                <MdOutlineModeEdit />
              </div>
              <div className="icons" onClick={() => openModal2(row._id)}>
                <MdDeleteOutline />
              </div>
            </div>
          </div>
        </div>
      ),
      width: "300px",
    },
    {
      name: "Visibility",
      selector: () => (
        <select name="cars" id="cars">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      ),
    },
    {
      name: "Last Update",
      selector: (row) => (row.createdAt ? row.createdAt.split("T")[0] : "N/A"),
    },
    {
      name: "Video Count",
      selector: () => 155,
    },
  ];

  const columns = [
    {
      name: "Video",
      selector: (row) => (
        <div className="video_details">
          <div className="video_img">
            <img src={row.thumbnail} alt="" height={"70px"} />
          </div>
          <div className="video_actions">
            <div className="title_desc">
              <p>{`${row.title?.substring(0, 20)}...`}</p>
              <p>{`${row.description?.substring(0, 25)}...`}</p>
            </div>
            <div className="actions_icon">
              <div className="icons" onClick={() => openModal(row._id)}>
                <MdOutlineModeEdit />
              </div>
              <div className="icons" onClick={() => openModal2(row._id)}>
                <MdDeleteOutline />
              </div>
            </div>
          </div>
        </div>
      ),
      width: "300px",
    },
    {
      name: "Visibility",
      selector: () => (
        <select name="cars" id="cars">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      ),
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

  if (!videos) {
    return (
      <>
        <h1>No Video Available</h1>
      </>
    );
  }

  const changeTableHandler = () => {
    switch (activeTab) {
      case 1:
        return (
          <DataTable
            columns={columns}
            data={onlyVideos}
            selectableRows
            pagination
          />
        );
      case 2:
        return (
          <DataTable
            columns={columns}
            data={onlyClips}
            selectableRows
            pagination
          />
        );
      case 4:
        return (
          <DataTable
            columns={playlistColumns}
            data={playlistData}
            selectableRows
            pagination
          />
        );
      default:
        return (
          <DataTable
            columns={columns}
            data={videos}
            selectableRows
            pagination
          />
        );
    }
  };

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
        {changeTableHandler()}
        {/* <DataTable columns={columns} data={videos} selectableRows pagination /> */}
      </div>
      <UpdateVideoModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        videoDetails={singleVideo}
        channelId={channelData._id}
      />
      <DeleteVideoModal
        modalIsOpen={modalIsOpen2}
        openModal={openModal2}
        closeModal={closeModal2}
        videoId={delVideoId}
        channelId={channelData._id}
      />
      <Toaster position="top-center" richColors />
    </>
  );
};

export default MadeXStudio;
