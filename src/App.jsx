// External Import
import { Routes, Route } from "react-router-dom";

// Internal Import
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Admin from "./Pages/Admin/inde";
import Lounge from "./Pages/Lounge/index";
import Editor from "./Pages/Editor/index";
import NotFound from "./Pages/NotFound/index";
import Registration from "./Pages/Registration";
import RequireAth from "./Components/RequireAuth";
import Unauthorized from "./Pages/Unauthorized/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Registration />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* Protected Routes */}
          <Route element={<RequireAth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAth allowedRoles={[1984]} />}>
            <Route path="/editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAth allowedRoles={[5150]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAth allowedRoles={[1984, 5150]} />}>
            <Route path="/lounge" element={<Lounge />} />
          </Route>
          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
