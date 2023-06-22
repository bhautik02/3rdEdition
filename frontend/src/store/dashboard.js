import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllUsersAsync = createAsyncThunk(
  "dash/getAllUsers",
  async ({ page, rowsPerPage }) => {
    try {
      const response = await axios.get(
        `admin/users?page=${page + 1}&limit=${rowsPerPage}`
      );
      const allUsers = response.data;
      //   toast.success("Place booked.");
      return allUsers;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const getAllPlacesAsync = createAsyncThunk(
  "dash/getAllPlaces",
  async ({ page, rowsPerPage }) => {
    try {
      const response = await axios.get(
        `admin/places?page=${page + 1}&limit=${rowsPerPage}`
      );
      const allPlaces = response.data;
      //   toast.success("Place booked.");
      return allPlaces;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

const InitialBookingState = {
  allUsers: null,
  allPlaces: null,
};

const dashSlice = createSlice({
  name: "dash",
  initialState: InitialBookingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllPlacesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlacesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(getAllPlacesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const dashActions = dashSlice.actions;
export default dashSlice.reducer;
