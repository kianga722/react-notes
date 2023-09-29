import styles from "../page.module.css";

export default function Context() {
  return (
    <section>
      <h2 id="context">Context Scenarios</h2>

      <p className={styles.summary}>
        React useMemo is typically recommended to memoize the value prop passed
        into the Context Provider component to prevent unecessary re-renders
      </p>

      <p className={styles.summary}>
        However, this only comes into play when some descendant of the Context
        Provider is wrapped with memo in an attempt to avoid re-renders
      </p>

      <article>
        <h3>Example 1 - Context Provider without useMemo vs with useMemo</h3>

        <a href="/examples/context/example1/problem" target="_blank">
          Example 1 without memo
        </a>

        <p>
          This example renders two Context Providers, one without useMemo and
          one with useMemo on the Provider value. There is no memo usage here
        </p>

        <pre>
          <code>
            {`
              export default function App() {
                const [, forceRender] = useState();
              
                return (
                  <div className="App">
                    <h1>Hello CodeSandbox</h1>
                    <h2>Start editing to see some magic happen!</h2>
              
                    <ProviderWithoutMemo>
                      <Child ctx={CtxWithoutMemo} />
                    </ProviderWithoutMemo>
              
                    <ProviderWithMemo>
                      <Child ctx={CtxWithMemo} />
                    </ProviderWithMemo>
              
                    <button onClick={() => forceRender({})}>Rerender Parent</button>
                  </div>
                );
              }              
            `}
          </code>
        </pre>

        <p>
          Notice when the Parent re-renders, both components re-render
          regardless if the Context Provider value is wrapped in useMemo. This
          is because all children of the parent are re-rendered. The only part
          that was memoized was saving the redeclaration of the value prop in
          ProviderWithMemo
        </p>

        <p>
          We need to wrap a descendant of the Context Provider component with{" "}
          <strong>memo</strong> in order for useMemo to prevent any re-rendering
        </p>

        <a href="/examples/context/example1/solution" target="_blank">
          Example 1 with memo
        </a>

        <pre>
          <code>
            {`
              export default memo(Child);
            `}
          </code>
        </pre>

        <p>
          You will see now that the Child component wrapped in memo with the
          Context Provider that is using useMemo for it's value prop does not
          re-render when the parent re-renders. Just using memo on the child
          itself will not prevent re-rendering, since the act of the Provider
          re-rendering redeclares the value prop and forces all the consumers of
          the Context to re-render.
        </p>
      </article>
    </section>
  );
}
