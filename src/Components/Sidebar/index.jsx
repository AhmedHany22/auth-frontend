// External Import
import {
  AiOutlineHome,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineCoffee,
  AiOutlineSecurityScan,
} from "react-icons/ai";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Internal Import
import AuthContext from "../../Context/AuthProvider";

const Sidebar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context    // axios to /logout endpoint
    setAuth({});
    navigate("/");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <AiOutlineHome className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/editor"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <AiOutlineEdit className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Editor</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <AiOutlineSecurityScan className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Admin</span>
            </Link>
          </li>

          <li>
            <Link
              to="/lounge"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <AiOutlineCoffee className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Lounge</span>
            </Link>
          </li>

          <li>
            <button
              onClick={logout}
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <AiOutlineLogout className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
