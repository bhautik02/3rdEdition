import React from "react";
import { Link } from "react-router-dom";

const DataNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <h1 className="text-2xl font-medium">Oops! No data found.</h1>
      <br></br>
      <p className="text-md">
        The data you're looking for may not be available or has been removed.
      </p>
    </div>
  );
};

export default DataNotFound;
