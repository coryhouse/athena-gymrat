import styles from "./DevTools.module.css";

export function DevTools() {
  return (
    <section className={styles.root}>
      <select>
        <option value="1">c@h.com</option>
        <option value="2">no-exercises@nope.com</option>
      </select>
    </section>
  );
}
