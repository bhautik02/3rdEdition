import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReviewDialogBox from "../components/ReviewDialogBox";
import { getAllbookingAsync } from "../store/booking";
import LoadingSpinner from "../utils/LoadingSpinner";

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.booking);
  const { allBookings } = useSelector((state) => state.booking);
  console.log(loading);
  useEffect(() => {
    if (user) {
      dispatch(getAllbookingAsync(user._id));
    }
    // eslint-disable-next-line
  }, [user]);

  const canReview = (date) => {
    if (new Date(date).getTime() < new Date().getTime()) {
      return true;
    }
    return false;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-16">
      <p className="flex text-3xl font-semibold  mt-10 justify-center uppercase">
        My Bookings
      </p>
      <div className="flex gap-10 justify-center items-center">
        <div className="w-5/12">
          {allBookings &&
            allBookings.map((booking) => (
              <div
                className="shadow-2xl shadow-black-300  m-10 -mb-4"
                key={booking._id}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 bg-lightblue p-8 pt-6">
                    <div>
                      <h2 className="inline font-medium text-2xl">
                        {booking.placeName}
                      </h2>
                      <p>
                        {booking.placeAddress} &#183; {booking.numberOfGuests}{" "}
                        guests
                      </p>
                    </div>

                    <div className="flex gap-6 mt-4">
                      <div>
                        <p>{booking.checkIn.slice(0, 10)}</p>
                        <p>{booking.checkInTime}</p>
                      </div>
                      <div className="mt-3">{">"}</div>
                      <div>
                        <p>{booking.checkOut.slice(0, 10)}</p>
                        <p>{booking.checkOutTime}</p>
                      </div>
                    </div>
                    <hr className="mt-5 border-black" />
                    <div className="flex gap-10 justify mt-4">
                      {canReview(booking.checkOut) && (
                        <ReviewDialogBox
                          bookingData={booking}
                          userData={user}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-span-1 bg-lightblue">
                    <img
                      className="h-full w-full object-cover"
                      src={booking.placePhoto}
                      alt="place"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default BookingsPage;
