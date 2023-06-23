import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneStar } from "react-icons/ai";
import ShowAmenities from "../components/ShowAmenities";
import CheckInSvg from "../utils/svg/CheckInSvg";
import CheckOutSvg from "../utils/svg/CheckOutSvg";
import BatchSvg from "../utils/svg/BatchSvg";
import { getPlaceAsync, placeActions } from "../store/place";

const PlacePage = () => {
  const dispatch = useDispatch();
  const { placeData } = useSelector((state) => state.place);
  const [hostData, setHostData] = useState(null);
  const [ready, setReady] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { id: placeId } = useParams();

  useEffect(() => {
    if (!placeId) {
      return;
    }
    dispatch(getPlaceAsync(placeId));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (placeData) {
      // console.log(placeData.bookedDates);
      dispatch(placeActions.getBookedDatesOfPlace(placeData.bookedDates));
      setHostData(...placeData.host);
      setReviews(placeData.reviews);
      setReady(true);
    }
  }, [placeData]);

  // console.log(reviews);
  return (
    // <div className="text-white bg-black">
    <div>
      {ready && (
        <>
          <div className="mx-80 pt-4 ">
            <h1 className="mt-4 text-3xl font-medium">{placeData.title}</h1>
            <div className="font-medium flex items-center">
              <p className="text-gray-800 text-sm">
                {
                  <>
                    {placeData.totalRatings > 1
                      ? (
                          placeData.totalRatings / placeData.numberOfReview
                        ).toFixed(2)
                      : 0}
                    <AiTwotoneStar className="inline h-4 w-4 -mt-1" /> &#183;{" "}
                  </>
                }
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </p>
              &nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <AddressLink className="ml-4">{placeData.address}</AddressLink>
            </div>
            {console.log(placeData)}
            <div className="mt-6">
              <PhotoGallery place={placeData} />
            </div>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
              <div className="relative">
                <div className="flex my-4 ">
                  <div>
                    <h2 className="inline font-medium text-2xl">
                      Hosted By {hostData.name}
                    </h2>
                    <br />
                    <p>
                      {placeData.maxGuest} Guests &#183;{" "}
                      {placeData.noOfBedrooms} bedroom &#183;{" "}
                      {placeData.noOfBathrooms} bathroom
                    </p>
                  </div>
                  <img
                    src={placeData?.host[0].profile}
                    alt=""
                    className="w-14 h-14 absolute object-cover top-3 end-0 border-grey-800 rounded-full bg-gray-200"
                  />
                </div>
                <hr className="mt-5 " />
                <div className="mt-5">{placeData.description}</div>
                <hr className="mt-5 " />
                <div className="mt-5">
                  <p className="text-gray-800 font-medium text-2xl">
                    What this place offers
                  </p>

                  <div className="flex gap-36">
                    <ShowAmenities perks={placeData.perks} />
                  </div>
                </div>
                <hr className="mt-5 " />
                <div className="mt-8 items-center">
                  <div className="mt-4">
                    <CheckInSvg />
                    <p className="inline ml-4 mt-4">
                      Check-in : {placeData.checkIn}
                      {+placeData.checkIn.split(":")[0] < 12 ? " AM" : " PM"}
                    </p>
                    <br />
                  </div>

                  <div className="mt-4">
                    <CheckOutSvg />
                    <p className="inline ml-4 ">
                      Check-out : {placeData.checkOut}{" "}
                      {+placeData.checkIn.split(":")[0] < 12 ? " AM" : " PM"}
                    </p>
                    <br />
                  </div>
                </div>
              </div>
              <div>
                <BookingWidget place={placeData} />
              </div>
            </div>
            <hr className="mt-4"></hr>
            <div className="mt-5 flex items-center">
              <div className="">
                {reviews ? (
                  <>
                    <p className=" text-gray-800 font-medium text-2xl">
                      {placeData.totalRatings > 1 && (
                        <>
                          {(
                            placeData.totalRatings / placeData.numberOfReview
                          ).toFixed(2)}{" "}
                          <AiTwotoneStar className="inline h-5 w-5 -mt-1" />{" "}
                          &#183;{" "}
                        </>
                      )}
                      {reviews.length} Reviews
                    </p>
                    <div className=" ">
                      {reviews.map((review, index) => {
                        return (
                          <div className="">
                            <div className="flex mt-10 object-cover gap-4">
                              <img
                                src={review?.profile}
                                alt=""
                                className="w-12 h-12  top-0 left-0 rounded-full"
                              />
                              <div>
                                <h1 className="text-lg font-medium">
                                  {review.name}
                                </h1>
                                <p className="text-slate-500 text-sm">
                                  {review.createdAt.slice(0, 10)}
                                </p>
                              </div>
                            </div>
                            <div className="flex mt-4 gap-2">
                              <p className="text-gray-600 text-base">
                                {review.review}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  "No Reviews"
                )}
              </div>
            </div>
            <hr className="mt-4"></hr>
            <div className="mt-5">
              <div className="">
                <div className="flex mt-10 gap-4">
                  <img
                    src={placeData?.host[0].profile}
                    alt=""
                    className="  w-14 h-14  top-0 left-0 rounded-full object-cover bg-red-500"
                  />
                  <div>
                    <h1 className="font-medium text-2xl">
                      Hosted By {hostData.name}
                    </h1>
                    <p className="text-slate-500 text-sm">
                      Joined in {hostData.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4 gap-2">
                  <BatchSvg />
                  <p className="text-gray-800 text-base">Identity verified</p>
                </div>
                <div className="mt-8 text-gray-800">
                  <p className="my-3">Policy number: {hostData._id}</p>
                  <p className="my-3">Languages: English, हिन्दी</p>
                </div>
                <div className="my-10">
                  Contact host: {placeData?.host[0]?.phone}
                </div>
              </div>
            </div>
            {/* <div className="my-4" /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacePage;
