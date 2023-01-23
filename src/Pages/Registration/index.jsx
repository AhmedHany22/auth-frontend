import S from "./Registration.module.css";

const Registration = () => {
  return (
    <div className={S.container}>
      <div className="container mx-auto">
        <div className={S.boundries}>
          <div className={S.box}>
            <div className={S.img}></div>
            <div className={S.list}>
              <h3 className={S.title}>Create an Account!</h3>
              <form className={S.form}>
                <div className={S.inputList}>
                  <div className={S.leftInput}>
                    <label className={S.label} htmlFor="firstName">
                      First Name
                    </label>
                    <input className={S.nameInput} id="firstName" type="text" placeholder="First Name" />
                  </div>
                  <div className={S.rightInput}>
                    <label className={S.label} htmlFor="lastName">
                      Last Name
                    </label>
                    <input className={S.nameInput} id="lastName" type="text" placeholder="Last Name" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={S.label} htmlFor="email">
                    Email
                  </label>
                  <input className={S.longInput} id="email" type="email" placeholder="Email" />
                </div>
                <div className={S.inputList}>
                  <div className={S.leftInput}>
                    <label className={S.label} htmlFor="password">
                      Password
                    </label>
                    <input className={S.longInput} id="password" type="password" placeholder="******************" />
                    <p className={S.parag}>Please choose a password.</p>
                  </div>
                  <div className={S.rightInput}>
                    <label className={S.label} htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input className={S.longInput} id="c_password" type="password" placeholder="******************" />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button className={S.btn} type="button">
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
                  <a className={S.link} href="./index.html">
                    Already have an account? Login!
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

export default Registration;
