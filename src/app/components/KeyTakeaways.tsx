export default function KeyTakeaways() {
  return (
    <section>
      <h2>Key Takeaways</h2>

      <ul>
        <li>
          Use only when there is a clear need because each hook has a
          performance cost
        </li>

        <li>
          You should try restructuring your app first before attempting these
          optimization techniques
        </li>

        <li>
          <strong>memo</strong> to prevent a component from re-rendering if
          their props do not change
        </li>

        <li>
          <strong>useMemo</strong> to prevent value from being re-calculated if
          no dependencies change
        </li>

        <li>
          <strong>useCallback</strong> to preserve function across re-renders.
          It is essentially the same as useMemo except for functions. Functions
          are by default redeclared on re-rerenders and are considered different
          even if the function code is exactly the same
        </li>
      </ul>
    </section>
  );
}
