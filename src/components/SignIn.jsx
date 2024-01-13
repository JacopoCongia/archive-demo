import { useState } from "react";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { parseErrors } from "../helpers/parse-errors";

const auth = getAuth();

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [user, loading] = useAuthState(auth);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    logIn();
    setFormData({ email: "", password: "" });
  }

  async function logIn() {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      setError(error);
    }
  }

  async function logOut() {
    await signOut(auth);
    setError(null);
  }

  return (
    <div className="flex flex-col gap-[2em] px-[2em] mx-auto">
      {!user ? (
        <div>
          <form className="flex flex-col items-center gap-[1em] pt-[3em]">
            <h1 className="font-bold text-[1.2rem]">Account</h1>
            <input
              className="w-[250px] text-[0.8rem] text-center"
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="w-[250px] text-[0.8rem] text-center"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-[250px] bg-[#202020] text-white font-semibold text-[0.8rem] cursor-pointer hover:bg-[#3f3f3f] py-[0.5em]"
            >
              Log In
            </button>
          </form>
          {error && (
            <p className="p-5 text-red-600 font-semibold text-[0.9rem] text-center">
              {parseErrors(error.message)}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[1em] pt-[3em] text-center">
          <div className="bg-gray-500 flex items-center justify-center w-[80px] h-[80px] rounded-[50%]">
            <h1 className="text-white text-[2.8rem]">
              {user.email[0].toUpperCase()}
            </h1>
          </div>
          <h1>User Logged in with email: {user?.email}</h1>
          <button
            onClick={(e) => logOut(e)}
            className="w-full bg-[#202020] text-white font-semibold text-[0.8rem] cursor-pointer hover:bg-[#3f3f3f] py-[0.5em]"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
