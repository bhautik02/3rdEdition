import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MyDatePicker from "./DatePicker";
import { bookPlaceAsync } from "../store/booking";
import datesBetween from "dates-between";
import axios from "axios";
import { red } from "@mui/material/colors";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const formatDateForBookedDate = (date) => {
    const dateSlice = date.slice(0, 10);
    const dateArray = dateSlice.split("-");
    const day = +dateArray[2];
    const month = +dateArray[1];
    const year = +dateArray[0];

    return day + "/" + month + "/" + year;
  };

  const bookedDateArray = (startDate, EndDate) => {
    const result = [];
    const dates = Array.from(
      datesBetween(new Date(startDate), new Date(EndDate))
    );
    for (let i = 1; i < dates.length; i++) {
      const temp = formatDateForBookedDate(dates[i].toISOString());
      result.push(temp);
    }
    return result;
  };

  const formatDateForCountNights = (date) => {
    const tempDateArr = date.split("/");
    const formattedDate =
      tempDateArr[1] + "/" + tempDateArr[0] + "/" + tempDateArr[2];
    return formattedDate;
  };

  const setCheckInDate = (value) => {
    const formattedDate = formatDateForCountNights(value);
    setCheckIn(formattedDate);
  };

  const setCheckOutDate = (value) => {
    const formattedDate = formatDateForCountNights(value);
    setCheckOut(formattedDate);
  };
  const price = numberOfNights * place.price;

  const initPayment = (order) => {
    const options = {
      key: "rzp_test_rD7nY8ydONcLyG",
      amount: order.amount,
      currency: order.currency,
      name,
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post("/verify", response);

          if (data) {
            const bookedDates = bookedDateArray(checkIn, checkOut);
            const formData = {
              checkIn,
              checkOut,
              numberOfGuests,
              name,
              phone: user?.phone,
              bookBy: user._id,
              placeID: place._id,
              price,
              bookedDates,
              placeName: place.title,
              placeAddress: place.address,
              placePhoto: place.photo[0],
              checkInTime: place.checkIn,
              checkOutTime: place.checkOut,
              paid: false,
            };

            dispatch(bookPlaceAsync(formData));
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#F5385D",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  async function bookThisPlace() {
    if (!user) {
      return navigate("/login");
    }
    //payment
    try {
      const orderUrl = "/checkout";
      const { data } = await axios.post(orderUrl, { amount: price });
      console.log(data);
      initPayment(data.order);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <MyDatePicker setDate={setCheckInDate} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <MyDatePicker setDate={setCheckOutDate} />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            min={1}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <span> {user?.phone}</span>
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
