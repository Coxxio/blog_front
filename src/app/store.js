import { configureStore } from "@reduxjs/toolkit";
import metricsSlice from "./services/metrics/metricsSlice";
import postSlice from "./services/post/postSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    metrics: metricsSlice,
  },
});
