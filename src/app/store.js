import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./services/post/postSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});
