import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllUsersDashAsync = createAsyncThunk(
  "dash/getAllUsers",
  async ({ page, rowsPerPage }) => {
    try {
      console.log("--------->called");
      const response = await axios.get(
        `admin/users?page=${page + 1}&limit=${rowsPerPage}`
      );
      const allUsers = response.data;
      // toast.success("Place booked.");
      console.log("dashboard", allUsers);
      return allUsers;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const getAllPlacesDashAsync = createAsyncThunk(
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
  totalUsers: 0,
  totalPlaces: 0,
  allPlaces: null,
};

const dashSlice = createSlice({
  name: "dash",
  initialState: InitialBookingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersDashAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersDashAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(getAllUsersDashAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllPlacesDashAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlacesDashAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlaces = action.payload.places;
        state.totalPlaces = action.payload.totalPlaces;
      })
      .addCase(getAllPlacesDashAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const dashActions = dashSlice.actions;
export default dashSlice.reducer;
