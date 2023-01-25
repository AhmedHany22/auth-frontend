import ST from "./Login.module.css";

import { useState, useEffect, useRef, useContext } from "react";
import axios from "../../Api/axios";
import AuthContext from "../../Context/AuthProvider";

const LOGIN_URL = "/auth";

const LogIn = () => {
  const { setAuth } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user: firstName, pwd }));
      // console.log(response.data, " ------Data");
      // console.log(response.data.accessToken, " ------Token");
      // console.log(JSON.stringify(response), " ------Response");
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user: firstName, pwd, accessToken, roles });
      setFirstName("");
      setPwd("");
      setSuccess("Signed in successfully");
    } catch (e) {
      if (!e?.response) setErrMsg("No server response");
      else if (e.response?.status == 400) setErrMsg("Missing username or password");
      else if (e.response?.status == 401) setErrMsg("Unauthorized access");
      else setErrMsg("LogIn Failed");

      console.log("Error ------", e);
    }
  };

  return (
    <div className={ST.container}>
      <div className="container mx-auto">
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
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert! </span>
                    {errMsg}
                  </div>
                </div>
              ) : null}
              {success ? (
                <div className={ST.success} role="alert" aria-live="assertive" ref={msgRef}>
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert! </span>
                    Signed In Successfully
                  </div>
                </div>
              ) : null}
              <h3 className={ST.title}>Sign In</h3>
              <form className={ST.form} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className={ST.label} htmlFor="firstName">
                    First Name
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      aria-describedby="uidnote"
                      autoFocus
                      value={firstName}
                      className={ST.nameInput}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      aria-describedby="pwdnote"
                      placeholder="******************"
                      value={pwd}
                      className={ST.nameInput}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button className={ST.btn} disabled={false}>
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a className={ST.link} href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a className={ST.link} href="./index.html">
                    Need an account? SignUp!
                  </a>
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
