import Nav from "./components/Nav";
import KeyTakeaways from "./components/KeyTakeaways";
import Memo from "./components/Memo";
import Usememo from "./components/Usememo";
import Usecallback from "./components/Usecallback";
import Context from "./components/Context";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <h1>React Notes for memo, useMemo, and useCallback</h1>

      <Nav />

      <KeyTakeaways />

      <Memo />

      <Usememo />

      <Usecallback />

      <Context />
    </main>
  );
}
