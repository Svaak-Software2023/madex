import axios from "axios";

export const API = axios.create({
  baseURL: "https://madextube700.com/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
});

//User API's
export const login = (formData) => API.post("/users/login", formData);
export const createAccount = (formData) =>
  API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Video API's
export const getAllVideo = (pageValue = 1, limit = 12) =>
  API.get(`/videos/all-videos?page=${pageValue}&limit=${limit}`);
export const getSingleVideo = (videoId) =>
  API.get(`/videos/get-single-video/${videoId}`);

// Upload New Video
export const videoUpload = ({ formData, setPercentage, accessToken }) =>
  API.post(
    "/videos/add-video",
    formData,
    {
      headers: {
        Authorization: accessToken,
      },
    },
    {
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setPercentage(percentage);
      },
    }
  );

export const getAllChanelVideo = (channelId) =>
  API.get(`/videos/getByChannelId/${channelId}`);
export const getAllCategoryVideo = (categoryId) =>
  API.get(`/videos/getByCategoryId/${categoryId}`);

// video like deslike api
export const getlikes = (videoId) => API.get(`/video/getAllLike/${videoId}`);
export const createLike = ({ userId, videoId, accessToken }) =>
  API.post(`/video/like/${videoId}/${userId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

export const createDisLike = ({ userId, videoId, accessToken }) =>
  API.post(`/video/dislike/${videoId}/${userId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

// shortsSlice
export const getShorts = () => API.get("/videos/shorts");
// video view api
export const viewCount = (videoId) => API.patch(`/videos/view/${videoId}`);

// subccribe api
// export const checkisSubscribe = ({ userId, channelId, accessToken }) =>
//   API.get(`/subscriptions/check-subscribe/${userId}/${channelId}`, {
//     headers: {
//       Authorization: accessToken,
//     },
//   });

export const subscribe = ({ userId, channelId, accessToken }) =>
  API.post(`/subscriptions/add-subscription/${userId}/${channelId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

export const unSubscribe = ({ userId, channelId, accessToken }) =>
  API.delete(`/subscriptions/unsubscribe/${userId}/${channelId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// Category API
export const getAllCategory = () => API.get("/category/get-category");

//Create a new Channel
export const createNewChannel = (formData) =>
  API.post("/channel/create-channel", formData);
export const getChannel = (userId) => API.get(`/channel/${userId}`);

// download apis
export const getAllDownloads = (token) =>
  API.get("/downloads/all-download-video", {
    headers: {
      Authorization: token,
    },
  });

export const createDownloads = ({ videoId, accessToken }) =>
  API.post(`/downloads/${videoId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

// Watch Later
export const createWatchLater = ({ videoId, accessToken }) =>
  API.post(`/watchLater/add-watchLater/${videoId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

export const getAllWatchLater = (accessToken) =>
  API.get("/watchLater/all-watchLater", {
    headers: {
      Authorization: accessToken,
    },
  });

export const deleteWatchLater = ({ accessToken, videoId }) =>
  API.delete(`/watchLater/${videoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

export const deleteAllWatchLater = ({ accessToken, userId }) =>
  API.delete(`/watchLater/delete-all/${userId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

//History API
// export const getHistory = async (token) =>
//   API.get("/history/get-all-history", {
//     headers: {
//       Authorization: token,
//     },
//   });

export const getHistory = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await API.get("/history/get-all-history", { headers: headers });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteSingleHistory = (accessToken, id) =>
  API.delete(`/history/deleteByHistoryId/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });

export const deleteAllHistory = (accessToken) =>
  API.delete(`/history/delete-all-history`, {
    headers: {
      Authorization: accessToken,
    },
  });

// history
export const createHistory = ({ videoId, accessToken }) =>
  API.post(`/history/${videoId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });

//PLaylist
export const createPaylist = ({ videoId, accessToken, formData }) =>
  API.post(`/playlists/videos/${videoId}`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });

//Get PLaylist Data
export const getPlaylist = ({ userId }) =>
  API.get(`/playlists/users/${userId}`);

//Add Video To Playlist
export const addVideoPLaylist = ({ playlistId, videoId, accessToken }) =>
  API.post(
    `/playlists/${playlistId}/videos`,
    { videoId },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

export const deletePLaylist = ({ playListId, accessToken }) =>
  API.delete(`/playlists/${playListId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

export const updatePLaylist = ({ playListId, formData, accessToken }) =>
  API.patch(`/playlists/${playListId}`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });

export const deletPLaylistVideo = ({ videoId, playListId, accessToken }) =>
  API.delete(`/playlists/${playListId}/videos/${videoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// -----------------------Comments -------------------- //

export const createComment = ({ content, videoId, userId, accessToken }) =>
  API.post(
    `/comments/users/${userId}/videos/${videoId}`,
    { content },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

export const getAllComments = ({ videoId }) =>
  API.get(`/comments/videos/${videoId}`);

export const updateComment = ({ commentId, accessToken, content }) => {
  console.log("id", commentId);
  console.log("Content", content);

  API.patch(
    `/comments/${commentId}`,
    { content },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const deleteComment = ({ commentId, accessToken }) =>
  API.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// Get Liked Videos for User Login
export const getLikedVideos = ({ userId, accessToken }) =>
  API.get(`/videos/liked-videos/users/${userId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// Get Channel List of user
export const getAllChannelList = ({ accessToken }) =>
  API.get("/subscriptions/subscribed-videos", {
    headers: {
      Authorization: accessToken,
    },
  });

export const getUserStationProfile = ({ username, accessToken }) =>
  API.get(`/users/channel/${username}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// update Video Details
export const updateVideoDetails = (formData, videoId, accessToken) =>
  API.patch(`/videos/update-single-video/${videoId}`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });
// Delete the Video
export const deleteVideo = ({ videoId, accessToken }) =>
  API.delete(`/videos/delete-single-video/${videoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

// Search Video
export const searchVideo = (searchTerm) =>
  API.post("/video/search-video", { searchTerm });

//Get All Complaint Category  list
export const getAllComplaintCategoryList = () => API.get("/report/all-reports");

// Create a new Complaint
export const createComplaint = (formData, accessToken) =>
  API.post("/video-report/create-video-report", formData, {
    headers: {
      Authorization: accessToken,
    },
  });

export const sendFeedBack = (feedBackDescription, accessToken) =>
  API.post(
    "/feedback/create-feedback",
    { feedBackDescription },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
