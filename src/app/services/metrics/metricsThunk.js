import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postPostClicked = createAsyncThunk(
  "Metrics/postPostClicked",
  async (form, { rejectWithValue }) => {
    return await axios
      .post("metrics/post_clicked", form)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const getCategoriesClicked = createAsyncThunk(
  "Metrics/getCategoriesClicked",
  async (form, { rejectWithValue }) => {
    return await axios
      .get("metrics")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const getMostPopular = createAsyncThunk(
  "Metrics/getMostPopular",
  async (form, { rejectWithValue }) => {
    return await axios
      .get("metrics-most-popular")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const getMostVisitedHour = createAsyncThunk(
  "Metrics/getMostVisitedHour",
  async (form, { rejectWithValue }) => {
    return await axios
      .get("metrics-most-rate-hour")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
