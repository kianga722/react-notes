import styles from "../page.module.css";

export default function Nav() {
  return (
    <section>
      <h2 className={styles.green}>Table of Contents</h2>

      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/#memo">memo</a>
        <a href="/#usememo">useMemo</a>
        <a href="/#usecallback">useCallback</a>
        <a href="/#context">Context Scenarios</a>
      </nav>
    </section>
  );
}
