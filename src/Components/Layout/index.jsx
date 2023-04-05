// External Import
import { Outlet } from "react-router-dom";

// Internal Import
import Header from "./../Header/index";
import Sidebar from "./../Sidebar/index";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const ContentLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
