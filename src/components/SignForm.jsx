import { useEffect, useState } from "react";
import { signInUser } from "../api";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { initSignIn } from "../utility/initialValue";

export default function SignInForm({ setSignInForm }) {

  const navigate = useNavigate();
  const onSwitch = () => {
    setSignInForm((prevState) => !prevState);
  };

  const { authLogin } = useAuth();

  const [user, SetUser] = useState(initSignIn);

  async function handleOnSubmit(event) {
    event.preventDefault();
    try{
        const { data } = await signInUser(user);
        authLogin({ AuthUser: data.result.email });
        Cookies.set("token", data.token, { expires: 1 });
        SetUser(initSignIn);
        navigate('/home')
    }catch(err){
        console.log("signin error", err.message)
    }
  }

  function handleOnChange(identifier, event) {
    SetUser((prevState) => ({
      ...prevState,
      [identifier]: event.target.value,
    }));
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div>
          <h1 className="text-white font-nunito text-3xl">
            Welcome Login System
          </h1>
          <p className="text-white font-poppins font-medium">
            Your gateway to seamless transactions and easy payments.
          </p>
        </div>
        <div className="mt-2 w-96">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Email
          </label>
          <div>
            <input
              id="email"
              type="email"
              required
              name="email"
              value={user.email}
              onChange={(e) => handleOnChange("email", e)}
              className="block w-full bg-white bg-opacity-25 border-white px-3 py-1.5 rounded-md text-white-600 text-opacity-25"
            ></input>
          </div>
        </div>
        <div className="mt-2 w-96">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            name="password"
            value={user.password}
            onChange={(e) => handleOnChange("password", e)}
            className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 rounded-md"
          ></input>
        </div>
        <div className="flex flex-row justify-between mt-2 w-96">
          <label className="text-white">
            <input type="checkbox" /> Remember me
          </label>
          <button type="button" className="text-white" onClick={onSwitch}>
            Sign up
          </button>
        </div>
        <div className="mt-2 w-96">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-white-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}
