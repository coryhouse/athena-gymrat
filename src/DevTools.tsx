import { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import styles from "./DevTools.module.css";
import { User } from "./types";
import invariant from "invariant";

type DevToolsProps = {
  user: User | null;
  setUser: (user: User) => void;
};

export default function DevTools(props: DevToolsProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const _users = await getUsers();
      setUsers(_users);
    }
    fetchData();
  }, []);

  return (
    <section className={styles.root}>
      <label htmlFor="devtools-user">User</label>
      <br />
      <select
        id="devtools-user"
        value={props.user?.id}
        onChange={(event) => {
          const user = users.find(
            (user) => user.id.toString() === event.target.value
          );
          invariant(user !== undefined, "User not found.");
          props.setUser(user);
        }}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
    </section>
  );
}
