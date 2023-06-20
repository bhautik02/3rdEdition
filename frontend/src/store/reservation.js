import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReservationsAsync = createAsyncThunk(
  "reservation/getAllReservations",
  async (placeId) => {
    try {
      const response = await axios.get(`/reservation/${placeId}`);
      const allReservations = response.data.reservations;
      return allReservations;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const InitialReservationState = {
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
        state.allReservations = action.payload;
      })
      .addCase(getAllReservationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
