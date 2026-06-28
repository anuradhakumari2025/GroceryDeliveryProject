import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; 

const Register = () => {
  const { setUser, axios, navigate } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setUser(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="lg:pt-20 pt-12 flex items-center text-sm text-gray-600">
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User </span> Sign Up
        </p>

        <div className="w-full">
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="user"
            className="border border-primary rounded w-full p-2 mt-1 outline-primary"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            name="email"
            // type="email"
            placeholder="user@example.com"
            className="border border-primary rounded w-full p-2 mt-1 outline-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <div className="relative w-full">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="user123"
              className="border border-primary rounded w-full p-2 pr-10 mt-1 outline-primary"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5 text-gray-500 hover:text-primary cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <p>
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            click here
          </span>
        </p>

        <button
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
