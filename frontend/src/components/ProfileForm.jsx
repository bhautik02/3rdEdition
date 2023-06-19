import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAsync } from "../store/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileForm = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user?._id;
    dispatch(userUpdateAsync({ userId, address, gender, aboutMe, phone }));
    setAddress("");
    setGender("");
    setAboutMe("");
    setPhone("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          background: "#F5385D",
          color: "white",
          border: "none",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "none",
          },
        }}>
        Update me
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}>
        <DialogTitle className="flex justify-center">
          {"Update Your Profile"}
        </DialogTitle>
        <DialogContent>
          <div className="p-2">
            <form onSubmit={handleSubmit}>
              <label>About me</label>
              <textarea
                // type="textarea"
                value={aboutMe}
                rows={5}
                required
                placeholder="tell us about your self"
                onChange={(e) => setAboutMe(e.target.value)}
                className="block w-96"
              />
              <label>
                <br />
                Address:
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <br />
              <label>
                Gender:
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="tel"
                  required
                  value={phone}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <br />
              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white rounded-lg px-4 py-2 ">
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={handleClose}
              className="bg-grey rounded-lg px-4 py-2">
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileForm;
