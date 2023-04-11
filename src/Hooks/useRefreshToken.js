import axios from "../Api/axios";
import useAuth from "../Hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const refresh = async () => {
    const { data } = await axios.get("/refresh", { withCredentials: true });

    setAuth((prev) => {
      console.log("Prev Token----- ", JSON.stringify(prev));
      console.log(auth);
      console.log("New Token----- ", data.accessToken);
      console.log(auth);

      return { ...prev, accessToken: data.accessToken };
    });
    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
