import ST from "./Login.module.css";

// External Import
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Internal Import
import axios from "../../Api/axios";
import useAuth from "./../../Hooks/useAuth";
import useInput from "../../Hooks/useInput";
import useToggle from "../../Hooks/useToggle";

const LOGIN_URL = "/auth";

const LogIn = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, userReset, userAttributes] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);
  const [persist, persistToggle] = useToggle("persist", false);

  useEffect(() => setErrMsg(""), [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      // console.log("Data------",response.data);
      console.log("First Token------", response.data.accessToken);
      console.log("Response------", JSON.stringify(response.data));

      setAuth({ user, pwd, roles, accessToken });
      userReset("");
      setPwd("");
      navigate(from, { replace: true });
      // setSuccess("Signed in successfully");
    } catch (err) {
      if (!err?.response) setErrMsg("No server response");
      else if (err.response?.status == 400) setErrMsg("Missing username or password");
      else if (err.response?.status == 401) setErrMsg("Unauthorized access");
      else setErrMsg("LogIn Failed");
      console.log("Error------", err);
    }
  };

  return (
    <div className={ST.container}>
      <div className="container m-auto">
        <div className={ST.boundries}>
          <div className={ST.box}>
            <div className={ST.img}></div>
            <div className={ST.list}>
              {errMsg ? (
                <div className={ST.error} role="alert" aria-live="assertive">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert! </span>
                    {errMsg}
                  </div>
                </div>
              ) : null}
              {/* {success ? (
                <div className={ST.success} role="alert" aria-live="assertive">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert! </span>
                    Signed In Successfully
                  </div>
                </div>
              ) : null} */}
              <h3 className={ST.title}>Sign In</h3>
              <form className={ST.form} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className={ST.label} htmlFor="user">
                    First Name
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="user"
                      placeholder="First Name"
                      aria-describedby="uidnote"
                      autoFocus
                      className={ST.nameInput}
                      {...userAttributes}
                    />
                  </div>
                </div>
                {/* -------------------------- */}
                <div className="mb-6">
                  <label className={ST.label} htmlFor="password">
                    Password
                  </label>
                  <div className="flex">
                    <input
                      id="password"
                      type="password"
                      placeholder="******************"
                      value={pwd}
                      className={ST.nameInput}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        checked={persist}
                        onChange={persistToggle}
                        aria-describedby="remember"
                        type="checkbox"
                        className={ST.persist}
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-slate-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium hover:underline text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <div className="mb-6 text-center">
                  <button className={ST.btn} disabled={false}>
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link to="/register" className={ST.link}>
                    Need an account? SignUp!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
