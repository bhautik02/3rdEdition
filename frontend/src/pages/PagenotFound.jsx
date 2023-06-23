import Footer from "../components/Footer";
import Header from "../components/Header";

const PagenotFound = () => {
  return (
    <div className="-mt-4 pt-4">
      <Header />

      <div className="flex justify-center mt-44 items-center bg-white">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg"
          alt="Page Not Found! 404"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 ">
        <Footer />
      </div>
    </div>
  );
};

export default PagenotFound;
