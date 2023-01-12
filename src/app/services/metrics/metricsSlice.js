import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoriesClicked,
  getMostPopular,
  getMostVisitedHour,
  postPostClicked,
} from "./metricsThunk";

const initialState = {
  categories: [],
  titles: [],
  counts_categories: [],
  counts_titles: [],
};

const metricsSlice = createSlice({
  name: "postClicked",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoriesClicked.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategoriesClicked.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.map((category) => {
          return category.post_category;
        });
        state.counts_categories = action.payload.map((category) => {
          return Number(category.count);
        });
      })
      .addCase(getCategoriesClicked.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getMostPopular.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMostPopular.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.titles = action.payload.map((category) => {
          return category.post_title;
        });
        state.counts_titles = action.payload.map((category) => {
          return Number(category.count);
        });
      })
      .addCase(getMostPopular.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getMostVisitedHour.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMostVisitedHour.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dates = action.payload.map((date) => {
          if (date.date_trunc.hours > 12) {
            return `${(date.date_trunc.hours - 12)} PM`;
          }
          return date.date_trunc.hours === undefined
            ? "12 AM"
            : `${date.date_trunc.hours} AM`;
        });
        state.counts_dates = action.payload.map((category) => {
          return Number(category.count);
        });
      })
      .addCase(getMostVisitedHour.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(postPostClicked.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postPostClicked.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.total_post += 1;
      })
      .addCase(postPostClicked.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default metricsSlice.reducer;
