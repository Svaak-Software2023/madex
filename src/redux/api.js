import axios from "axios";

const API = axios.create({
    // baseURL: "https://moviefam.com/api/v1"
    baseURL: "http://localhost:8000/api/v1"
})





//User API's
export const login = (formData) => API.post("/users/login", formData);
export const createAccount = (formData) =>
  API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });





// Video API's 
export const getAllVideo = () => API.get("/videos/all-videos")
export const getSingleVideo = (videoId) => API.get(`/videos/get-single-video/${videoId}`)
export const videoUpload = ({formData,setPercentage}) => API.post("/videos/add-video", formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      setPercentage(percentage);
    },
  });

export const getAllChanelVideo = (channelId) => API.get(`/videos/getByChannelId/${channelId}`)
export const getAllCategoryVideo = (categoryId) => API.get(`/videos/getByCategoryId/${categoryId}`)





// Category API
export const getAllCategory = () => API.get("/category/get-category");




//Create a new Channel
export const createNewChannel = (formData) =>
  API.post("/channel/create-channel", formData);
export const getChannel = (userId) => API.get(`/channel/${userId}`);





// download apis 
export const getAllDownloads = (token) => API.get("/downloads/all-download-video",{
  headers:{
    Authorization:token
  }
});

export const createDownloads = ({ videoId, accessToken }) =>
  API.post(`/downloads/${videoId}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });


// Watch Later 
export const createWatchLater = ({videoId,accessToken}) => API.post(`/watchLater/add-watchLater/${videoId}`,null,{
  headers:{
    Authorization:accessToken
  }
});

export const getAllWatchLater = (token) => API.get("/watchLater/all-watchLater",{
  headers:{
    Authorization:token
  }
});

export const deleteWatchLater = ({accessToken,videoId}) => API.delete(`/watchLater/${videoId}`,{
  headers:{
    Authorization:accessToken
  }
});


//History API
export const getHistory = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await API.get("/history/get-all-history", { headers: headers });
    return res.data;
  } catch (err) {
    console.error("Error fetching history:", err);
    throw err;
  }
};

export const deleteSingleHistory = async ({ token, id }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await API.delete(`/history/deleteByHistoryId/${id}`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching history:", err);
    throw err;
  }
};

export const deleteAllHistory = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await API.delete(`/history/delete-all-history`, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error("Error Deleting All history:", err);
    throw err;
  }
};

// history
export const createHistory = async ({ videoId, accessToken }) => {
  console.log("AccessToken:", accessToken);
  const headers = {
    Authorization: accessToken,
  };
  try {
    const res = await API.post(
      `/history/${videoId}`,
      {},
      {
        headers: headers,
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};