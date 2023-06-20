import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllHostedPlacesByUserAsync } from "../store/review";
import DataNotFound from "../components/DataNotFound";

const ReservationPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const hostedData = useSelector((state) => state.review.yourHostedPlaces);

  useEffect(() => {
    if (user) {
      dispatch(getAllHostedPlacesByUserAsync(user._id));
    } // eslint-disable-next-line
  }, [user]);

  return (
    <div className="mb-10">
      <p className="flex text-3xl font-semibold  mt-10 justify-center uppercase">
        My Reservations
      </p>
      {hostedData ? (
        <div className="mx-auto mt-4 md:px-10 sm:px-2 px-4 xsm:ml-20px ">
          <div className=" grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 ">
            {hostedData.map((place) => {
              return (
                <Link
                  className="col-span-1 cursor-pointer group"
                  key={place._id}
                  to={`/reservation/${place._id}`}>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                      <img
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={place.photo[0]}
                        alt="Listing"
                      />
                      <div className="absolute top-3 right-3"></div>
                    </div>
                    <div className="mt-1">
                      <div className="font-semibold text-lg">{place.title}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default ReservationPages;

/* <div className="absolute w-full h-full bg-transparent backdrop-blur-[2px] top-0 left-0"> */

/* <div className="flex justify-center items-end  text-3xl">
                          {place.title}
                        </div>
                      </div> */
/*
                        element.style {
    position: absolute;
    backdrop-filter: blur(3px);
    background: rgb(0 0 255 / 0%);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}*/
