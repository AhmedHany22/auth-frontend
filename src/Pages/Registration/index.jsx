import S from "./Registration.module.css";

// External Import
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Internal Import
import CheckMark from "../../Components/CheckMark";
import axios from "../../Api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,24}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const REGISTER_URL = "/register";

const Registration = () => {
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = NAME_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Incase it's hacked
    const v1 = NAME_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }));
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setUser("");
      setPwd("");
      setMatchPwd("");
      setSuccess(true);
    } catch (e) {
      if (!e?.response) setErrMsg("No server response");
      else if (e.response?.status == 409) setErrMsg("Username taken");
      else setErrMsg("Registration Failed");
      errRef.current.focus();
    }
  };

  if (success) {
    return (
      <div className={S.container}>
        <div className="container mx-auto">
          <div className={S.boundries}>
            <div className={S.box}>
              <div className={S.imgSuccess}></div>
              <div className="h-auto w-full bg-white rounded-lg md:rounded-l-none">
                <div className="mt-48 ml-12 h-72 text-2xl text-green-700">
                  SignedUp Successfully
                  <Link to="/login" className="block mt-3 text-sm text-blue-500 align-baseline hover:text-blue-800">
                    SignIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const nameLabelClass = !userFocus && user ? (validUser ? S.labelSuccess : S.labelFailure) : S.label;
  const pwdLabelClass = !pwdFocus && pwd ? (validPwd ? S.labelSuccess : S.labelFailure) : S.label;
  const matchLabelClass = !matchFocus && matchPwd ? (validMatch ? S.labelSuccess : S.labelFailure) : S.label;

  return (
    <div className={S.container}>
      <div className="container mx-auto">
        <div className={S.boundries}>
          <div className={S.box}>
            <div className={S.img}></div>
            <div className={S.list}>
              {errMsg ? (
                <div className={S.error} role="alert" ref={errRef}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" className="flex-shrink-0 inline w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert! </span>
                    {errMsg}
                  </div>
                </div>
              ) : null}
              <h3 className={S.title}>Create an Account!</h3>
              <form className={S.form} onSubmit={handleSubmit}>
                <div className={S.inputList}>
                  <div className={S.leftInput}>
                    <label className={nameLabelClass} htmlFor="user">
                      First Name
                    </label>
                    <div className="flex">
                      <input
                        autoFocus
                        id="user"
                        type="text"
                        autoComplete="off"
                        placeholder="First Name"
                        aria-describedby="uidnote"
                        value={user}
                        className={S.nameInput}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        aria-invalid={validUser ? false : true}
                        onChange={(e) => setUser(e.target.value)}
                      />
                      {user && !userFocus && <CheckMark state={validUser} />}
                    </div>
                    {user && !userFocus && !validUser ? (
                      <p id="uidnote" className={S.parag} aria-live="assertive">
                        4 to 24 characters allowed.
                        <br />
                        Must begin with a letter.
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* -------------------------- */}
                <div className={S.inputList}>
                  <div className={S.leftInput}>
                    <label className={pwdLabelClass} htmlFor="password">
                      Password
                    </label>
                    <div className="flex">
                      <input
                        id="password"
                        type="password"
                        aria-describedby="pwdnote"
                        placeholder="******************"
                        value={pwd}
                        className={S.nameInput}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? false : true}
                        onChange={(e) => setPwd(e.target.value)}
                      />
                      {pwd && !pwdFocus && <CheckMark state={validPwd} />}
                    </div>
                    {pwd && !pwdFocus && !validPwd ? (
                      <p ref={errRef} className={S.parag} aria-live="assertive" id="pwdnote">
                        8 to 24 characters.
                        <br />
                        Must include uppercase & lowercase letters, a number, and special character.
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* -------------------------- */}
                  <div className={S.rightInput}>
                    <label className={matchLabelClass} htmlFor="c_password">
                      Confirm Password
                    </label>
                    <div className="flex">
                      <input
                        id="c_password"
                        type="password"
                        aria-describedby="confirmnote"
                        placeholder="******************"
                        value={matchPwd}
                        className={S.nameInput}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        aria-invalid={validMatch ? false : true}
                        onChange={(e) => setMatchPwd(e.target.value)}
                      />
                      {matchPwd && !matchFocus && <CheckMark state={validMatch} />}
                    </div>
                    {matchPwd && !matchFocus && !validMatch ? (
                      <p ref={errRef} className={S.parag} aria-live="assertive" id="confirmnote">
                        Must match the original password.
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button className={S.btn} disabled={!validUser || !validPwd || !validMatch ? true : false}>
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a className={S.link} href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <Link className={S.link} to="/login">
                    Already have an account? Login!
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

export default Registration;
