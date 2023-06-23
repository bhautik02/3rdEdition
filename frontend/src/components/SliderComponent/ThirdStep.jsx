import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlaceActions,
  hostPlaceAsync,
  updateHostedPlaceAsync,
} from "../../store/addPlace";

function preInput(label) {
  return (
    <>
      <label className="text-xl mt-4">{label}</label>
    </>
  );
}

const ThirdStep = forwardRef((props, ref) => {
  useEffect(() => {
    if (props.editingPlaceInfo) {
      console.log("bed", props.editingPlaceInfo.noOfBedrooms);
      setNumberOfBedrooms(props.editingPlaceInfo.noOfBedrooms);
      setNumberOfBathrooms(props.editingPlaceInfo.noOfBathrooms);
      setNumberOfGuest(props.editingPlaceInfo.maxGuest);
      setPrice(props.editingPlaceInfo.price);
      setCheckInTime(props.editingPlaceInfo.checkIn);
      setCheckOutTime(props.editingPlaceInfo.checkOut);
    }
  }, []);

  const addPlace = useSelector((state) => state.addPlace.addPlace);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const [numberOFBedrooms, setNumberOfBedrooms] = useState(1);
  const [numberOFBathrooms, setNumberOfBathrooms] = useState(1);
  const [numberOFGuest, setNumberOfGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const [checkInTime, setCheckInTime] = useState(0);
  const [CheckOutTime, setCheckOutTime] = useState(0);

  const submitHandler = (event) => {
    event.preventDefault();

    const thirdSlideInput = {
      noOfBathrooms: numberOFBathrooms,
      noOfBedrooms: numberOFBedrooms,
      maxGuest: numberOFGuest,
      checkIn: checkInTime,
      checkOut: CheckOutTime,
      price,
    };
    // console.log(thirdSlideInput);
    dispatch(addPlaceActions.addPlaceData(thirdSlideInput));
    setReady(true);
  };

  useEffect(() => {
    const userId = user?._id;
    const formdata = { ...addPlace, userId };
    if (ready && !props.editingPlaceInfo) {
      dispatch(hostPlaceAsync(formdata));
      dispatch(addPlaceActions.clearPlaceData());
    }
    const placeId = props.editingPlaceInfo?._id;
    const updatedFormData = { ...addPlace, placeId };
    if (ready && props.editingPlaceInfo) {
      dispatch(updateHostedPlaceAsync(updatedFormData));
      dispatch(addPlaceActions.clearPlaceData());
    }
    // eslint-disable-next-line
  }, [ready]);

  return (
    <form className="p-4" onSubmit={submitHandler}>
      <div className="grid mt-2 gap-2 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 ">
        {preInput("Price per night")}
        <input
          type="number"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        {preInput("Number of Bedrooms")}
        <input
          type="number"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          placeholder="2"
          required
          onChange={(event) => setNumberOfBedrooms(event.target.value)}
          value={numberOFBedrooms}
          min="1"
          max="10"
        />

        {preInput("Number of Bathroom")}
        <input
          type="number"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          placeholder="2"
          required
          value={numberOFBathrooms}
          min="1"
          max="5"
          onChange={(event) => setNumberOfBathrooms(event.target.value)}
        />

        {preInput("Number of Guest Allowed")}
        <input
          type="number"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          placeholder="2"
          required
          value={numberOFGuest}
          min="1"
          max="10"
          onChange={(event) => setNumberOfGuest(event.target.value)}
        />

        {preInput("Prefered Check In time")}
        <input
          type="time"
          id="cit"
          required
          name="cit"
          value={checkInTime}
          placeholder="12:00"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          onChange={(event) => setCheckInTime(event.target.value)}
        />

        {preInput("Prefered Check Out time")}
        <input
          type="time"
          id="cot"
          name="cot"
          required
          value={CheckOutTime}
          placeholder="12:00"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          onChange={(event) => setCheckOutTime(event.target.value)}
        />
      </div>
      <button style={{ display: "none" }} type="submit" ref={ref}></button>
    </form>
  );
});

export default ThirdStep;
