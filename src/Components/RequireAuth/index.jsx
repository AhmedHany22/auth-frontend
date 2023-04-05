// External Import
import { Navigate, useLocation } from "react-router-dom";

// Internal Import
import useAuth from "../../Hooks/useAuth";

import { ContentLayout } from "../Layout";

const RequireAth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log(auth);

  // This will replace the location the user want to go to with the login if there is no user
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <ContentLayout />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAth;
