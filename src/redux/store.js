import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import videoSlice from "./features/videoSlice";
import categorySlice from "./features/categorySlice";
import channelSlice from "./features/channelSlice";
import downloads from "./features/downloads";
import watchLater from "./features/watchLater";
import GlobalFunctionSlice from "../utils/globalFunction/GlobalFunctionSlice";

import historySlice from "./features/historySlice";
import playlistSlice from "./features/playlistSlice";
import likeDislikeSlice from "./features/likeDislikeSlice";
import subscribeSlice from "./features/subscribeSlice";
import commentSlice from "./features/commentSlice";
import likesVideoSlice from "./features/likesVideo";
import shortsSlice from "./features/shortsSlice";
import searchVideoSlice from "./features/searchVideo";
import complaintSlice from "./features/complaintSlice";
import feedbackSlice from "./features/sendFeedback";

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
    complaint: complaintSlice,
    feedBack: feedbackSlice,
  },
});

export default store;
