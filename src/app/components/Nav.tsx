import Link from "next/link";

import styles from "../page.module.css";

export default function Nav() {
  return (
    <section>
      <h2 className={styles.green}>Table of Contents</h2>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="#memo">memo</Link>
        <Link href="#usememo">useMemo</Link>
        <Link href="#usecallback">useCallback</Link>
        <Link href="#context">Context Scenarios</Link>
      </nav>
    </section>
  );
}
