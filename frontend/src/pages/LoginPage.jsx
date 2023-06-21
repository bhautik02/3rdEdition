import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "../store/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  //to take input from user while login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  //submit handler for userlogin
  const onUserLogin = (event) => {
    event.preventDefault();

    dispatch(userLoginAsync({ email, password }));
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className="mt-36 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="mx-auto max-w-md" onSubmit={onUserLogin}>
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
          <button className="primary">login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have account?{" "}
            <Link to="/register" className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
