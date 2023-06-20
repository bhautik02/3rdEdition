import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { CookiesProvider } from "react-cookie";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchUserAsync, userActions } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import PlacePage from "./pages/PlacePage";
import PagenotFound from "./pages/PagenotFound";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/ReservationDetailPage";

import MyAccount from "./pages/ProfilePage";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import MyPlaces from "./components/MyPlaces/MyPlaces";
import ReservationPages from "./pages/ReservationPage";
import AdminPage from "./pages/AdminPage";

axios.defaults.baseURL = "http://localhost:5000/api/v1/";
const URL = "http://localhost:5000/api/v1/users/profile";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!user) {
        dispatch(fetchUserAsync());
      }
    } catch (error) {}
    // eslint-disable-next-line
  }, []);

  return (
    <CookiesProvider>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        // position="bottom-right"
        hideProgressBar
      />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        {console.log("fromApp", user)}
        {user && user.isAdmin ? (
          <Route path="/" element={<AdminPage />}></Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/places/:id" element={<PlacePage />}></Route>

            <Route path="/forgetPassword" element={<BookingsPage />} />
            <Route path="/reservations" element={<ReservationPages />} />
            <Route path="/hostplace" element={<MyPlaces />} />
            <Route path="/profile" element={<MyAccount />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route
              path="/reservation/:id"
              element={<ReservationDetailPage />}></Route>
          </Route>
        )}
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;

/* //////////////////////////////////////////////// 
          {/* <Route path="/account/myAccount" element={<MyAccount />} />
          <Route path="/account/liked" element={<MyAccount />} />
          <Route path="/account/:param" element={<AccountPage />}></Route>
          <Route path="/account/bookings/:id" element={<BookingPage />}></Route>
          
          <Route
            path="/reservation/:id"
            element={<ReservationDetailPage />}></Route> 
          {/* /account/bookings/${bookingData._id} 
          {/* <Route path="/account/:param/:action" element={<AccountPage />}></Route> 
          {/* <Route
          path="/account/:param"
          element={
            user ? <AccountPage /> : <Navigate replace to="/login" />
          }></Route>
        <Route
          path="/account/:param/:action"
          element={
            user ? <AccountPage /> : <Navigate replace to="/login" />
          }></Route> */
