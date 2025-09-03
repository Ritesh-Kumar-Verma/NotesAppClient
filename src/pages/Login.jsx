import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ setUserDetails, setLoginStatus }) => {
  const [warning , setWarning] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Login Data:", loginForm);
    setUserDetails(loginForm);

    axios
      .post(`${apiUrl}/login`, loginForm)
      .then((res) => {
        console.log(res.data);
        setUserDetails(loginForm);
        setLoginStatus(true)
        navigate("/dashboard");
      })
      .catch((error) => {
        setWarning("Wrong username or password!!!")
        setTimeout(()=>setWarning(""),3000)
        console.log(error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log("Signup Data:", signupForm);

    axios
      .post(`${apiUrl}/signup`, signupForm)
      .then((res) => {
        console.log(res.data);
        setUserDetails(signupForm);
        setLoginStatus(true)
        navigate("/dashboard");
      })
      .catch((error) => {
        if(error.response.status==406){
          setWarning("Username Already Exists!!")
          setTimeout(()=>setWarning(""),3000)
        }
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-6 flex flex-col gap-6 ">
      <div className="text-center text-red-600 h-1">
      {warning}
      </div>
        <div className="flex justify-around">
          <button
            onClick={() => setTab("login")}
            className={`w-1/2 py-2 rounded-l-lg font-medium transition ${
              tab === "login"
                ? "bg-fuchsia-700 text-white"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`w-1/2 py-2 rounded-r-lg font-medium transition ${
              tab === "signup"
                ? "bg-fuchsia-700 text-white"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Signup
          </button>
        </div>

        {tab === "login" && (
          <form className="flex flex-col gap-3" onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) => handleChange(e, setLoginForm)}
              className="bg-neutral-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-fuchsia-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => handleChange(e, setLoginForm)}
              className="bg-neutral-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-fuchsia-700"
            />
            <button
              type="submit"
              className="bg-fuchsia-700 py-2 rounded-md font-medium hover:bg-fuchsia-800 transition"
            >
              Login
            </button>
          </form>
        )}

        {tab === "signup" && (
          <form className="flex flex-col gap-3" onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupForm.username}
              onChange={(e) => handleChange(e, setSignupForm)}
              className="bg-neutral-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-fuchsia-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={(e) => handleChange(e, setSignupForm)}
              className="bg-neutral-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-fuchsia-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={(e) => handleChange(e, setSignupForm)}
              className="bg-neutral-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-fuchsia-700"
            />
            <button
              type="submit"
              className="bg-fuchsia-700 py-2 rounded-md font-medium hover:bg-fuchsia-800 transition"
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
