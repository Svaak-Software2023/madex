import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./featurs/authSlice";
import videoSlice from "./featurs/videoSlice";
import categorySlice from "./featurs/categorySlice";
import channelSlice from "./featurs/channelSlice";
import downloads from "./featurs/downloads";
import watchLater from "./featurs/watchLater";
import GlobalFunctionSlice from "../utils/globalFunction/GlobalFunctionSlice";

import historySlice from "./featurs/historySlice";
import playlistSlice from "./featurs/playlistSlice";
import likeDislikeSlice from "./featurs/likeDislikeSlice";
import subscribeSlice from "./featurs/subscribeSlice";
import commentSlice from "./featurs/commentSlice";
import likesVideoSlice from "./featurs/likesVideo";
import shortsSlice from "./featurs/shortsSlice";
import searchVideoSlice from "./featurs/searchVideo";
const store = configureStore({
  reducer: {
    globalFunction: GlobalFunctionSlice,
    auth: authSlice,
    video: videoSlice,
    category: categorySlice,
    channel: channelSlice,
    downloads: downloads,
    watchLater: watchLater,
    history: historySlice,
    playlist: playlistSlice,
    likeDislike: likeDislikeSlice,
    subscriber: subscribeSlice,
    comment: commentSlice,
    likedVideos: likesVideoSlice,
    shorts: shortsSlice,
    search: searchVideoSlice,
  },
});

export default store;
