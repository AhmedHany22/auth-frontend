import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      const response = await axios("./logout", { withCredentials: true });
    } catch (e) {
      console.error("Logout Error : ", e);
    }
  };

  return logout;
};

export default useLogout;
