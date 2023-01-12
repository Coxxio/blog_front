import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import {
  fetchPost,
  postPost,
  putPost,
  deletePost,
  getOnePost,
} from "./postThunk";

const initialState = {
  post_list: [],
  post_actual: {},
  index: null,
  next: null,
  previous: null,
  total_post: 0,
  status: null,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setNewIndex: (state, action) => {
      state.index = action.payload;
      state.next = state.post_list[action.payload - 1]
        ? state.post_list[action.payload - 1].id
        : null;
      state.previous = state.post_list[action.payload + 1]
        ? state.post_list[action.payload + 1].id
        : null;
    },
    setNewPost: (state, action) => {
      state.post_actual = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post_list = action.payload.posts;
        state.total_post = Math.ceil(action.payload.total / 5);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getOnePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOnePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post_actual = action.payload;
      })
      .addCase(getOnePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(postPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.total_post += 1;
      })
      .addCase(postPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(putPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(putPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.total_post += 1;
      })
      .addCase(putPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.total_post += 1;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setNewIndex, setNewPost } = PostSlice.actions;

export default PostSlice.reducer;
