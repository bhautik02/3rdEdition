import { NavLink } from "react-router-dom";
import { TbChefHat } from "react-icons/tb";
import { BiBuildingHouse } from "react-icons/bi";
import {
  GiCampingTent,
  GiFamilyHouse,
  GiFishingBoat,
  GiHabitatDome,
} from "react-icons/gi";
import {
  FaChessRook,
  FaTree,
  FaUmbrellaBeach,
  FaWarehouse,
} from "react-icons/fa";
import {
  MdOutlineApartment,
  MdOutlineCabin,
  MdPool,
  MdHome,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { getAllPlacesAsync } from "../store/place";

const Filters = () => {
  const dispatch = useDispatch();

  const filterByCategory = (category) => {
    dispatch(getAllPlacesAsync({ category }));
  };

  return (
    <div className="flex mt-8 mx-10  gap-10 justify-between text-gray-700">
      <NavLink onClick={filterByCategory.bind(null, "")}>
        <div className="flex justify-center">
          <MdHome className="w-8 h-8" />
        </div>
        All
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "beachview")}>
        <div className="flex justify-center">
          <FaUmbrellaBeach className="w-8 h-8" />
        </div>
        Beach View
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "amazingpool")}>
        <div className="flex justify-center">
          <MdPool className="w-8 h-8" />
        </div>
        Amazing Pool
      </NavLink>

      <NavLink onClick={filterByCategory.bind(null, "campingsite")}>
        <div className="flex justify-center">
          <GiCampingTent className="w-8 h-8" />
        </div>
        Camping Site
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "cabin")}>
        <div className="flex justify-center">
          <MdOutlineCabin className="w-8 h-8" />
        </div>
        Cabin
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "historicalhomes")}>
        <div className="flex justify-center">
          <FaChessRook className="w-8 h-8" />
        </div>
        Historical Homes
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "treehouse")}>
        <div className="flex justify-center">
          <FaTree className="w-8 h-8" />
        </div>
        Tree House
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "mansions")}>
        <div className="flex justify-center">
          <GiFamilyHouse className="w-8 h-8" />
        </div>
        Mansions
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "housewithparking")}>
        <div className="flex justify-center">
          <FaWarehouse className="w-8 h-8" />
        </div>
        House With Parking
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "domehouse")}>
        <div className="flex justify-center">
          <GiHabitatDome className="w-8 h-8" />
        </div>
        Dome House
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "boathouse")}>
        <div className="flex justify-center">
          <GiFishingBoat className="w-8 h-8" />
        </div>
        Boat House
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "highrisetower")}>
        <div className="flex justify-center">
          <BiBuildingHouse className="w-8 h-8" />
        </div>
        Highrise Tower
      </NavLink>
      <NavLink onClick={filterByCategory.bind(null, "chefkitchen")}>
        <div className="flex justify-center">
          <TbChefHat className="w-8 h-8" />
        </div>
        Chef's Kitchen
      </NavLink>
    </div>
  );
};

export default Filters;
