import { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import styles from "./DevTools.module.css";
import { User } from "./types";

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
        //onChange={(event) => setUser}
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
