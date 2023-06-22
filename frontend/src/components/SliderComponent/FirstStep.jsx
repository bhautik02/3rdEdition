import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaceActions } from "../../store/addPlace";

function preInput(header) {
  return (
    <>
      <label className="text-2xl mt-4 block">{header}</label>
    </>
  );
}

function errorinInput(errorMessage) {
  return (
    <>
      <p className="text-red-500">*{errorMessage}</p>
    </>
  );
}

const FirstStep = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.editingPlaceInfo) {
      setTitle(props.editingPlaceInfo.title);
      setAddress(props.editingPlaceInfo.address);
      setDescription(props.editingPlaceInfo.description);
      setCategory(props.editingPlaceInfo.category);
    }
  }, [props.editingPlaceInfo]);

  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");
  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [address, setAddress] = useState("");
  const [addressIsTouched, setAddressIsTouched] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);

  const titleIsInvalid = title.trim().length === 0;
  const titleInputIsInvalid = titleIsInvalid && titleIsTouched;

  const addressIsInvalid = address.trim().length === 0;
  const addressInputIsInvalid = addressIsInvalid && addressIsTouched;

  const descriptionIsInvalid = description.trim().length === 0;
  const descriptionInputIsInvalid =
    descriptionIsInvalid && descriptionIsTouched;

  const onclickHandler = (event) => {
    event.preventDefault();
    setTitleIsTouched(true);
    setAddressIsTouched(true);
    setDescriptionIsTouched(true);

    if (titleIsInvalid || addressIsInvalid || descriptionIsInvalid) {
      return;
    }

    const firstSlideInput = {
      title,
      address,
      description,
      category,
    };
    console.log(firstSlideInput);
    dispatch(addPlaceActions.addPlaceData(firstSlideInput));

    setTitleIsTouched(false);
    setAddressIsTouched(false);
    setDescriptionIsTouched(false);
    setTitle("");
    setAddress("");
    setDescription("");
  };

  return (
    <form className="p-4" onSubmit={onclickHandler}>
      {preInput("Select a category")}
      <div className="w-full mt-4">
        <select
          id="category"
          required
          name="category"
          select={category}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full h-10 rounded-2xl bg-white pl-4 border-gray-200">
          <option value="">Select</option>
          <option value="beachview">Beach View</option>
          <option value="amazingpool">Amazing Pool</option>
          <option value="campingsite">Camping Site</option>
          <option value="cabin">Cabin</option>
          <option value="historicalhomes">Historical Homes</option>
          <option value="treehouse">Tree House</option>
          <option value="mansions">Mansions</option>
          <option value="housewithparking">House With Parking</option>
          <option value="domehouse">Dome House</option>
          <option value="boathouse">Boat House</option>
          <option value="highrisetower">Highrise Tower</option>
          <option value="chefkitchen">Chef's Kitchen</option>
        </select>
      </div>
      {preInput("Title")}
      <input
        type="text"
        value={title}
        required
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => setTitleIsTouched(true)}
        placeholder="Title for your place."
      />
      {titleInputIsInvalid && errorinInput("Title must not be empty!")}
      {preInput("Address")}
      <input
        type="text"
        value={address}
        required
        onChange={(event) => setAddress(event.target.value)}
        onBlur={() => setAddressIsTouched(true)}
        placeholder="Address to this place"
      />
      {addressInputIsInvalid && errorinInput("Address must not be empty!")}
      {preInput("Description")}
      <textarea
        value={description}
        required
        onChange={(event) => setDescription(event.target.value)}
        onBlur={() => setDescriptionIsTouched(true)}
        placeholder="Description of the place"
        rows="4"
        cols="75"
        className="w-full border my-1 py-2 px-3 rounded-2xl"
      />
      {descriptionInputIsInvalid &&
        errorinInput("Description must not be empty!")}
      <button style={{ display: "none" }} type="submit" ref={ref}></button>
    </form>
  );
});

export default FirstStep;
