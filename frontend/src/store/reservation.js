import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReservationsAsync = createAsyncThunk(
  "reservation/getAllReservations",
  async ({ placeId, page, rowsPerPage }) => {
    try {
      const response = await axios.get(
        `/reservation/${placeId}?page=${page + 1}&limit=${rowsPerPage}`
      );
      const allReservations = response.data;
      return allReservations;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const InitialReservationState = {
  totalReservations: 0,
  allReservations: [],
};

const reservationSlice = createSlice({
  name: "resevation",
  initialState: InitialReservationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReservationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allReservations = action.payload.reservations;
        state.totalReservations = action.payload.totalReservations;
      })
      .addCase(getAllReservationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
