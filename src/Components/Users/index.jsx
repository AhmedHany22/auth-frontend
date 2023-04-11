// External Import
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Internal Import
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("/users", { signal: controller.signal });
        isMounted && setUsers(data);
        console.log(data);
      } catch (e) {
        console.log(e);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    console.log(isMounted);
    getUsers();
    console.log(isMounted);

    return () => {
      isMounted = false;
      controller.abort();
      console.log(isMounted);
    };
  }, []);

  return (
    <article>
      <h3 className="text-center">Users List</h3>
      <br />
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
    </article>
  );
};

export default Users;
