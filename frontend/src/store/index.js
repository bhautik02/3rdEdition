import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import addPlaceReducer from "./addPlace";
import placeSlice from "./place";
import bookingReducer from "./booking";
import reviewReducer from "./review";
import reservationReducer from "./reservation";
import dashReducer from "./dashboard";

const store = configureStore({
  reducer: {
    user: userReducer,
    addPlace: addPlaceReducer,
    place: placeSlice,
    booking: bookingReducer,
    review: reviewReducer,
    reservation: reservationReducer,
    dashboard: dashReducer,
  },
});

export default store;
