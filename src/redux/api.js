import axios from "axios";

const API = axios.create({
    // baseURL: "https://madextube.onrender.com/api/v1"
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
export const getAllCategoryVideo = (categoryId) => API.get(`/videos/category/${categoryId}`)



// Category API
export const getAllCategory = () => API.get("/category/get-category");

//Create a new Channel
export const createNewChannel = (formData) =>
  API.post("/channel/create-channel", formData);
export const getChannel = (userId) => API.get(`/channel/${userId}`);
