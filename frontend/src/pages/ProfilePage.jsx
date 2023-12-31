import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAsync } from "../store/user";
import { GiGlobe } from "react-icons/gi";
import ProfileForm from "../components/ProfileForm";
import storage from "../utils/firebaseStorage";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const changeProfileHandler = (event) => {
    let file = event.target.files[0];
    console.log("hdhsigilsd", file);
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = addRef(storage, `/files/${file.name}`);
    console.log("storageref", storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          dispatch(userUpdateAsync({ profile: url, userId: user._id }));
        });
      }
    );
  };

  return (
    <div className="flex gap-20 mt-10 justify-center mx-80">
      <div className="">
        <div className="shadow-2xl shadow-black-300 h-64 w-80  rounded-2xl">
          <div className="flex col-span-2 bg-lightblue p-8 justify-center">
            <div>
              <label className="relative">
                <input
                  className="absolute justify-center w-full h-full opacity-0"
                  type="file"
                  accept="img/*"
                  name="profile"
                  onChange={changeProfileHandler}
                />
                <div>
                  <img
                    className="h-36 w-36 object-cover rounded-full"
                    src={user?.profile}
                    alt="place"
                  />
                </div>
              </label>
              <h2 className="flex font-bold mt-2 text-3xl justify-center">
                {user && user?.name.split(" ")[0]}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5">
        <div className="text-3xl font-bold">About me</div>
        <span className="my-6 flex items-center gap-2 text-lg text-gray-700">
          <GiGlobe className="h-6 w-6 " />
          Lives in {user?.address}
        </span>
        <div className="flex justify-around mt-2 mr-32 text-gray-800">
          {user?.aboutMe}
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="text-2xl font-bold mt-6">Email</div>

        <div className="text-gray-800">{user?.email}</div>
        <div className="text-2xl font-bold mt-6">Gender</div>
        <div className="text-gray-800">{user?.gender}</div>
        <div className="text-2xl font-bold mt-6">Phone</div>
        <div className="text-gray-800">{user?.phone}</div>
        <div className="mt-5">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
