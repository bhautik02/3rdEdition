import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

const AdminPage = () => {
  return (
    <div>
      <div className="z-10">
        <Dashboard />
      </div>
      <div className="-mt-[110] ml-72 z-20">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;
