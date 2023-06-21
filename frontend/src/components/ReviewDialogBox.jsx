import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { createReviewAsync } from "../store/review";

export default function ReviewDialogBox({ bookingData, userData }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // let formData;
  // let bookingID;

  const submitHandler = (event) => {
    event.preventDefault();
    setOpen(false);
    const reviewBy = bookingData.name;
    const bookingID = bookingData._id;
    const place = bookingData.place;
    const userId = bookingData.bookBy;

    // const formData = { name: reviewBy, place, user, rating, review };

    dispatch(
      createReviewAsync({
        bookingID,
        name: reviewBy,
        place,
        user: userId,
        profile: userData?.profile,
        rating,
        review,
      })
    );
  };

  return (
    <div>
      <button
        variant="outlined"
        onClick={handleClickOpen}
        className="px-4 py-2 bg-gray-200 rounded-md outline-black text-base"
      >
        Review it
      </button>
      {console.log("snvlksdnvknv", userData)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="review-dialog-title"
        aria-describedby="review-dialog-description"
      >
        <DialogTitle id="review-dialog-title" className="flex justify-center">
          {"Review Your Trip"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="review-dialog-description">
            <form className="flex-row  gap-2" onSubmit={submitHandler}>
              <div className="my-2 ">
                <label>Give a Rating</label>
                <input
                  type="Number"
                  min={1}
                  max={5}
                  placeholder={1}
                  onChange={(event) => setRating(event.target.value)}
                  required={true}
                />
              </div>
              <div className="my-2">
                <label>Give a Review</label>
                <textarea
                  type="text"
                  placeholder={"Write a Review"}
                  required={true}
                  rows={5}
                  onChange={(event) => setReview(event.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 rounded-md outline-black text-base"
                >
                  cancel
                </button>
                <button
                  type="submit"
                  autoFocus
                  className="px-4 py-2 bg-gray-200 rounded-md outline-black text-base"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
{
  /* <button
onClick={handleClose}
className="bg-grey rounded-lg px-4 py-2">
Cancel
</button>
<button
onClick={handleClose}
type="submit"
className="bg-primary text-white rounded-lg px-4 py-2 ">
Submit
</button> */
}
