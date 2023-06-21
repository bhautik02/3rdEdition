import { forwardRef, useEffect, useState } from "react";
import PrivateEntrance from "../../utils/svg/PrivateEntransSvg";
import PetsSvg from "../../utils/svg/PetsSvg";
import RadioSvg from "../../utils/svg/RadioSvg";
import WifiSvg from "../../utils/svg/WifiSvg";
import ParkingSvg from "../../utils/svg/ParkingSvg";
import TvSvg from "../../utils/svg/TvSvg";
import { useDispatch } from "react-redux";
import { addPlaceActions } from "../../store/addPlace";
import { TiDelete } from "react-icons/ti";
import LoadingSpinner from "./../../utils/LoadingSpinner";
import storage from "../../utils/firebaseStorage";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import UploadSvg from "../../utils/svg/UploadSvg";
import { Button } from "@mui/material";

function inputHeader(text) {
  return <h2 className="text-2xl mt-4">{text}</h2>;
}

function inputDescription(text) {
  return <p className="text-gray-500 text-sm">{text}</p>;
}

function preInput(header, description) {
  return (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );
}

const SecondStep = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [checkData, setCheckData] = useState({});
  const [uploading, setUploading] = useState("");

  const [remove, setRemove] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();

  useEffect(() => {
    if (props.editingPlaceInfo) {
      const perks = props.editingPlaceInfo.perks;

      let obj = {};
      perks.map((perk) => {
        obj[perk] = true;
      });
      setImages(props.editingPlaceInfo.photo);
      setCheckData({ ...obj });
      console.log("----->", obj);
    }
  }, [props.editingPlaceInfo]);

  const uploadPhoto = (event) => {
    setLoading((prev) => !prev);

    let file = event.target.files;
    if (!file) {
      alert("Please upload an image first!");
    }

    setUploading("Uploading");
    for (let i = 0; i < file.length; i++) {
      const storageRef = addRef(storage, `/files/${file[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, file[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImages((prevImages) => [...prevImages, url]);

            if (i === file.length - 1) {
              setLoading(false);
            }
          });
        }
      );
    }
    setUploading("Done");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let Perks = [];

    for (const key in checkData) {
      if (!checkData[key]) {
        delete checkData[key];
      } else {
        Perks.push(key);
      }
    }

    const secondSlideInput = {
      perks: Perks,
      photo: images,
    };

    dispatch(addPlaceActions.addPlaceData(secondSlideInput));
  };

  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    setCheckData({ ...checkData, [name]: checked });
  }

  const deletePhotoFromPhotoArray = (mainIndex) => {
    const imgs = [...images];
    const updatedImages = imgs.filter((img, index) => index !== mainIndex);
    setImages(updatedImages);
  };

  return (
    // <form className="p-4 h-96 overflow-scroll" onSubmit={submitHandler}>
    <form className="p-4" onSubmit={submitHandler}>
      {preInput("Perks", "select all the perks of your place")}
      <div className="grid mt-2 gap-2 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checkData["wifi"] === true}
            name="wifi"
            onChange={handleCbClick}
          />
          <WifiSvg />
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="parking"
            checked={checkData["parking"] === true}
            onChange={handleCbClick}
          />
          <ParkingSvg />
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="tv"
            checked={checkData["tv"] === true}
            onChange={handleCbClick}
          />
          <TvSvg />
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="radio"
            checked={checkData["radio"] === true}
            onChange={handleCbClick}
          />
          <RadioSvg />
          <span>Radio</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checkData["pets"] === true}
            name="pets"
            onChange={handleCbClick}
          />
          <PetsSvg />
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checkData["entrance"] === true}
            name="entrance"
            onChange={handleCbClick}
          />
          <PrivateEntrance />
          <span>Private entrance</span>
        </label>
      </div>
      <div>
        {preInput("Photos", "add one or more photos of your place")}
        <label className="h-16 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 mt-2">
          {loading ? (
            <>
              UpLoading
              <LoadingSpinner />
            </>
          ) : (
            <>
              <input
                type="file"
                multiple
                minLength={5}
                className="hidden"
                accept="image/*"
                onChange={uploadPhoto}
              />
              <UploadSvg />
              Upload
            </>
          )}
        </label>
        {props.editingPlaceInfo &&
          props.editingPlaceInfo.photo &&
          images.map((image, index) => {
            // console.log("images", hostedPlaceInfo.photo);
            return (
              <div
                className="inline-flex gap-2 -ml-5 max-w-max max-h-max justify-center items-center"
                key={image}
                onMouseEnter={() => {
                  setRemove(true);
                  setHoverIndex(index);
                }}
                onMouseLeave={() => {
                  setRemove(false);
                }}
              >
                <img
                  src={image}
                  style={{
                    height: "75px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                  key={image}
                  className="rounded-xl inline m-5 mb-0 gap-3 bg-gray-200"
                  alt="uploaded place"
                />
                {remove && hoverIndex === index && (
                  <Button
                    onClick={deletePhotoFromPhotoArray.bind(null, index)}
                    sx={{
                      position: "absolute",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <TiDelete className="h-14 w-14 fill-white" />
                  </Button>
                )}
              </div>
            );
          })}
        {!props.editingPlaceInfo &&
          uploading === "Done" &&
          images.map((image) => {
            return (
              <div className="inline gap-2 mt-5" key={image}>
                <img
                  src={image}
                  style={{
                    height: "75px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                  key={image}
                  className="rounded-xl inline m-5 mb-0 gap-3 bg-gray-200"
                  alt="uploaded place"
                />
              </div>
            );
          })}
      </div>
      <button style={{ display: "none" }} type="submit" ref={ref}></button>
    </form>
  );
});

export default SecondStep;
