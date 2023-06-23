import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="mt-16 min-h-[85.5vh]">
        <Outlet />
      </main>
      <Footer className="absolute inset-x-0 bottom-0" />
    </div>
  );
};

export default Layout;
