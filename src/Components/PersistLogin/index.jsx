// External Import
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Internal Import
import useAuth from "../../Hooks/useAuth";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useLocalStorage from "../../Hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.log(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    console.log(persist);
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
