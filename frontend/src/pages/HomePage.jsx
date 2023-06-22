// // AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA
import { useDispatch, useSelector } from "react-redux";
import { getAllPlacesAsync } from "../store/place";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import DataNotFound from "../components/DataNotFound";
import { Pagination } from "@mui/material";
import { AiTwotoneStar } from "react-icons/ai";
import LoadingSpinner from "./../utils/LoadingSpinner";
import useDebounce from "../components/Debounce";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const debouncedValue = useDebounce(city, 500);

  const allplaces = useSelector((state) => state.place.allPlaces);
  const { loading } = useSelector((state) => state.place);
  const totalPages = useSelector((state) => state.place.totalPages);
  const dispatch = useDispatch();

  const handlePageChange = (event, page) => {
    setPage(+page);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllPlacesAsync({ page, city }));
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    console.log("useEffect called.....", page);
    dispatch(getAllPlacesAsync({ page, city: "" }));
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    // <div className="bg-gray-950 text-white ">
    <div>
      <Filters />
      <div className="flex justify-center">
        <div className="mt-4 -mb-4 w-[100vh] border-primary">
          <input
            type="text"
            placeholder="search for city"
            value={city}
            onChange={searchHandler}></input>
        </div>
      </div>
      {/* {console.log("grojgj", allplaces)} */}
      {!allplaces || allplaces.length === 0 ? (
        <DataNotFound />
      ) : (
        <div className="py-8 ">
          <div className="mx-auto md:px-10 sm:px-2 px-4 xsm:ml-20px ">
            <div className=" grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 ">
              {allplaces.map((place) => {
                return (
                  <Link
                    className="col-span-1 cursor-pointer group"
                    to={`/places/${place._id}`}
                    key={place._id}>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
                        <img
                          className=" object-cover h-full w-full group-hover:scale-110 transition "
                          src={place.photo[0]}
                          alt="Listing"
                        />
                        <div className="absolute top-3 right-3"></div>
                      </div>
                      <div className="mt-1">
                        <div className="font-semibold text-lg">
                          {place.address}
                        </div>
                        <div className="text-gray-600">
                          {place.totalRatings > 1
                            ? (
                                place.totalRatings / place.numberOfReview
                              ).toFixed(2)
                            : 0}
                          <AiTwotoneStar className="inline h-5 w-5 -mt-1" />
                        </div>

                        <div className="font-light text-neutral-500">
                          {place.category}
                        </div>
                        <div className="flex flex-row items-center gap-1">
                          <div className="font-semibold">{place.price} ₹</div>
                          <div className="font-light">night</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 flex justify-center">
        <Pagination
          count={totalPages}
          color="secondary"
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
