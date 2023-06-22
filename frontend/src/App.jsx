import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import Analytics from "./components/Dashboard/Analytics";

axios.defaults.baseURL = "http://localhost:5000/api/v1/";

const PlacesDash = LayoutDash(Places);
const UsersDash = LayoutDash(Users);
const AnalyticsDash = LayoutDash(Analytics);
// const UserJobsHistoryHOC = LayoutDash(UserJobsHistory);
// const UserInfoDashboardHOC = LayoutDash(UserInfoDashboard);

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
      <ProSidebarProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          {console.log("fromApp", user)}

          {user && user.isAdmin ? (
            <Route>
              <Route path="/" element={<AnalyticsDash />}></Route>
              <Route path="/users" element={<UsersDash />}></Route>
              <Route path="/places" element={<PlacesDash />}></Route>
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
