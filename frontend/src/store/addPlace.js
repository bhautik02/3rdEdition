import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const hostPlaceAsync = createAsyncThunk(
  "addPlace/hostPlaceAsync",
  async (formdata) => {
    try {
      const {
        title,
        address,
        description,
        noOfBathrooms,
        noOfBedrooms,
        maxGuest,
        checkIn,
        checkOut,
        price,
        perks,
        photo,
        userId,
        category,
      } = formdata;

      const response = await axios.post(`place/hostPlace/${userId}`, {
        title,
        address,
        description,
        noOfBathrooms,
        noOfBedrooms,
        maxGuest,
        checkIn,
        checkOut,
        price,
        perks,
        photo,
        category,
      });
      console.log("res", response);
      const hostedPlace = response.data.newHostedPlace;
      toast.success("Place Hosted Successfully.");
      return hostedPlace;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const getAllHostedPlacesByUserAsync = createAsyncThunk(
  "addPlace/getAllHostedPlacesByUser",
  async (userId) => {
    try {
      const response = await axios.get(`place/hostPlace/${userId}`);
      const getAllHostedPlacesByUser = response.data.hostedPlace;
      return getAllHostedPlacesByUser;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const updateHostedPlaceAsync = createAsyncThunk(
  "addPlace/updateHostedPlace",
  async (formData) => {
    const { placeId } = formData;
    try {
      const response = await axios.patch(
        `place/hostPlace/${placeId}`,
        formData
      );
      const editedHostedPlace = response.data.editedHostedPlace;
      return editedHostedPlace;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const deletePlaceAsync = createAsyncThunk(
  "addPlace/deletePlace",
  async (placeId) => {
    try {
      await axios.patch(`place/deletePlace/${placeId}`);
      toast.success("Hosted Place deleted Successfully.");
      return placeId;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const InitialState = {
  addPlace: {},
  allHostedData: null,
  yourHostedPlaces: null,
};

const addPlaceSlice = createSlice({
  name: "addPlace",
  initialState: InitialState,
  reducers: {
    addPlaceData(state, action) {
      state.addPlace = { ...state.addPlace, ...action.payload };
    },
    clearPlaceData(state, action) {
      state.addPlace = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hostPlaceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hostPlaceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.yourHostedPlaces = [...state.yourHostedPlaces, action.payload];
      })
      .addCase(hostPlaceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllHostedPlacesByUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHostedPlacesByUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.yourHostedPlaces = action.payload;
      })
      .addCase(getAllHostedPlacesByUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateHostedPlaceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHostedPlaceAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.yourHostedPlaces = state.yourHostedPlaces.map((place) =>
          place._id === action.payload._id ? action.payload : place
        );

        // state.yourHostedPlaces = [...state.yourHostedPlaces, action.payload];
      })
      .addCase(updateHostedPlaceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePlaceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaceAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.yourHostedPlaces = state.yourHostedPlaces.filter((place) => {
          if (place._id !== action.payload) return place;
        });
      })
      .addCase(deletePlaceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const addPlaceActions = addPlaceSlice.actions;
export default addPlaceSlice.reducer;
