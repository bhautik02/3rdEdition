import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterAsync } from "../store/user";
import LoadingSpinner from "../utils/LoadingSpinner";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.loading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterUser = async (event) => {
    event.preventDefault();

    dispatch(userRegisterAsync({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user]);

  return (
    <div className="mt-36 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        {isLoading && (
          <div className=" top-20 bottom-20 left-0 right-0 fixed backdrop-brightness-75">
            <div className="mt-24">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <form className="mx-auto max-w-md" onSubmit={onRegisterUser}>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="email"
            id="email"
            placeholder="email@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="primary">register</button>
          <div className="text-center py-2 text-gray-500">
            Do have account?{" "}
            <Link to="/login" className="underline text-black">
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
