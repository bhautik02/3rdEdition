import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { CookiesProvider } from "react-cookie";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchUserAsync } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import PlacePage from "./pages/PlacePage";
import PagenotFound from "./pages/PagenotFound";
import BookingsPage from "./pages/BookingsPage";
import MyAccount from "./pages/ProfilePage";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import MyPlaces from "./components/MyPlaces/MyPlaces";
import ReservationPages from "./pages/ReservationPage";
import Places from "./components/Dashboard/Places";
import LayoutDash from "./components/Dashboard/LayoutDash";
import { ProSidebarProvider } from "react-pro-sidebar";
import Users from "./components/Dashboard/Users";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

const PlacesDash = LayoutDash(Places);
const UsersDash = LayoutDash(Users);

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("EFFECT CALLED---------------->", user);
    try {
      if (!user) {
        console.log("EFFECT CALLED IF---------------->", user);
        dispatch(fetchUserAsync());
      }
    } catch (error) {}
    // eslint-disable-next-line
  }, []);

  return (
    <CookiesProvider>
      <ToastContainer theme="dark" autoClose={2000} hideProgressBar />
      <ProSidebarProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>

          {user && user.isAdmin ? (
            <Route>
              <Route path="/" element={<PlacesDash />}></Route>
              <Route path="/users" element={<UsersDash />}></Route>
            </Route>
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
      </ProSidebarProvider>
    </CookiesProvider>
  );
}

export default App;
