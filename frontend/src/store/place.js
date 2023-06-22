import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPlacesAsync = createAsyncThunk(
  "place/getAllPlaces",
  async (Data) => {
    try {
      const { category, page, city } = Data;
      // console.log(setPage, jani);
      const response = await axios.post(
        `place/hostPlaces?page=${page}&search=${city}`,
        {
          // const response = await axios.post(`place/hostPlaces`, {
          category,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getPlaceAsync = createAsyncThunk(
  "place/getPlace",
  async (placeId) => {
    try {
      const response = await axios.get(`place/${placeId}`);
      const placeData = response.data.place;
      return placeData;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const InitialState = {
  allPlaces: null,
  placeData: null,
  bookedDatesOfPlace: null,
  totalPages: 1,
  showPhotos: false,
};

const placeSlice = createSlice({
  name: "place",
  initialState: InitialState,
  reducers: {
    getBookedDatesOfPlace(state, action) {
      state.bookedDatesOfPlace = action.payload;
      console.log("bookedDates", action.payload);
    },
    showPhotos(state, action) {
      state.showPhotos = !state.showPhotos;
      console.log("show", state.showPhotos);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlacesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlacesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlaces = action.payload.hostedPlace;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllPlacesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getPlaceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.placeData = action.payload;
      })
      .addCase(getPlaceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const placeActions = placeSlice.actions;
export default placeSlice.reducer;
