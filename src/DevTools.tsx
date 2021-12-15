import { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import styles from "./DevTools.module.css";
import { User } from "./types";
import invariant from "invariant";
import { useUserContext } from "./UserContext";

type DevToolsProps = {
  setUser: (user: User) => void;
};

export default function DevTools({ setUser }: DevToolsProps) {
  const user = useUserContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const _users = await getUsers();
      setUsers(_users);

      // set the App's selected user to the first user by default
      setUser(_users[0]);
    }
    fetchData();
  }, [setUser]);

  if (users.length === 0) return null;

  return (
    <section className={styles.root}>
      <label htmlFor="devtools-user">User</label>
      <br />
      <select
        id="devtools-user"
        value={user?.email}
        onChange={(event) => {
          const user = users.find((user) => user.email === event.target.value);
          invariant(user !== undefined, "User not found.");
          setUser(user);
        }}
      >
        {users.map((user) => (
          <option key={user.id} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
    </section>
  );
}
