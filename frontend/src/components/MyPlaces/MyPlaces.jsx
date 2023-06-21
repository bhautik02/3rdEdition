import { Box, Modal } from "@mui/material";
import PlusSvg from "../../utils/svg/PlusSvg";
import { useEffect, useState } from "react";
import HostingSlider from "../HostingSlider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deletePlaceAsync,
  getAllHostedPlacesByUserAsync,
} from "../../store/addPlace";
import DataNotFound from "../DataNotFound";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const MyPlaces = (props) => {
  const user = useSelector((state) => state.user.user);
  const hostedData = useSelector((state) => state.addPlace.yourHostedPlaces);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingPlaceInfo, setEditingPlaceInfo] = useState();

  const handleOpen = () => {
    setEditingPlaceInfo(null);
    setOpen(true);
  };
  const editHandleOpen = (place) => {
    setOpen(true);
    setEditingPlaceInfo(place);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (user) {
      dispatch(getAllHostedPlacesByUserAsync(user._id));
    } // eslint-disable-next-line
  }, [user]);

  const setClose = () => {
    setOpen(false);
  };

  const deletePlaceHandler = (placeID) => {
    dispatch(deletePlaceAsync(placeID));
  };

  return (
    <>
      <div>
        <p className="flex text-3xl font-semibold  mt-10 justify-center uppercase">
          My Hosted Places
        </p>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-center ">
              {editingPlaceInfo ? (
                <div className="text-2xl">Edit Your Place</div>
              ) : (
                <div className="text-2xl">Host Your Place</div>
              )}
            </div>
            <div className="p-8">
              <HostingSlider
                setClose={setClose}
                editingPlaceInfo={editingPlaceInfo}
              />
            </div>
          </Box>
        </Modal>
      </div>
      <div className="text-center -mb-14 p-6">
        <button
          to="addPlaces"
          className="inline-flex gap-1  py-1 px-4 bg-primary rounded-full text-white"
          onClick={handleOpen}
        >
          <PlusSvg />
          Add Place
        </button>
      </div>
      {!hostedData ? (
        <DataNotFound />
      ) : (
        <div className="pt-10 mb-10">
          <div className="mx-auto md:px-10 sm:px-2 px-4 xsm:ml-20px ">
            <div className=" grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 ">
              {hostedData &&
                hostedData.map((place) => {
                  return (
                    <div key={place?._id}>
                      <Link
                        className="col-span-1 cursor-pointer group"
                        onClick={editHandleOpen.bind(null, place)}
                      >
                        <div className="flex flex-col gap-2 w-full">
                          <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
                            <img
                              className=" object-cover h-full w-full group-hover:scale-110 transition "
                              src={place?.photo[0]}
                              alt="Listing"
                            />
                            <div className="absolute top-3 right-3"></div>
                          </div>
                        </div>
                      </Link>
                      <div className="mt-1">
                        <div className="font-semibold text-lg">
                          {place?.address}
                        </div>
                        <div className="font-light text-neutral-500">Beach</div>
                        <div className="flex flex-row items-center gap-1">
                          <div className="font-semibold">{place?.price} ₹</div>
                          <div className="font-light">night</div>
                        </div>
                        <div className="flex justify-start mt-2">
                          {console.log("idddddd", place)}
                          <button
                            className="bg-primary text-white px-4 py-1 rounded-md"
                            onClick={deletePlaceHandler.bind(null, place?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPlaces;
