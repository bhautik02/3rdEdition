import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const bookPlaceAsync = createAsyncThunk(
  "book/bookPlace",
  async (formData) => {
    try {
      const response = await axios.post(`book/bookings`, formData);
      const newBooking = response.data.hostedPlace;
      toast.success("Place booked.");
      return newBooking;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const getAllbookingAsync = createAsyncThunk(
  "book/getAllbooking",
  async (userId) => {
    try {
      const response = await axios.get(`book/bookings/${userId}`);
      console.log(response);
      const allBookings = response.data.bookings;
      return allBookings;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

const InitialBookingState = {
  allBookings: null,
  newBooking: null,
};

const bookingSlice = createSlice({
  name: "book",
  initialState: InitialBookingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookPlaceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookPlaceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.newBooking = action.payload;
      })
      .addCase(bookPlaceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllbookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllbookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(getAllbookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
