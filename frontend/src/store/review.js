import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const createReviewAsync = createAsyncThunk(
  "review/createReview",
  async (reviewFormData) => {
    try {
      console.log("formData-------->", reviewFormData);
      const { name, place, user, profile, rating, review, bookingID } =
        reviewFormData;
      const response = await axios.post(`review/reviews/${bookingID}`, {
        name,
        place,
        user,
        rating,
        profile,
        review,
      });
      const reviewRes = response.data.review;
      toast.success("review added");
      return review;
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
  }
);

export const getAllHostedPlacesByUserAsync = createAsyncThunk(
  "place/getAllHostedPlacesByUser",
  async (userId) => {
    try {
      const response = await axios.get(`place/hostPlace/${userId}`);
      const getAllHostedPlacesByUser = response.data.hostedPlace;

      console.log(
        "getAllHostedPlacesByUser--------------->\n",
        getAllHostedPlacesByUser
      );
      return getAllHostedPlacesByUser;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

const InitialState = {};

const reviewSlice = createSlice({
  name: "review",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAsync.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        state.loading = true;
        state.allPlaces = action.payload;
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllHostedPlacesByUserAsync.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllHostedPlacesByUserAsync.fulfilled, (state, action) => {
        state.loading = true;

        console.log("------ state.yourHostedPlaces ------", action.payload);
        state.yourHostedPlaces = action.payload;
      })
      .addCase(getAllHostedPlacesByUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
