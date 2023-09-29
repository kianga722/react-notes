import styles from "../page.module.css";

export default function Usecallback() {
  return (
    <section>
      <h2 id="usecallback">useCallback</h2>

      <p className={styles.summary}>
        The React useCallback function is used to preserve functions across
        re-renders. It is basically the same as useMemo except for functions.
      </p>

      <article>
        <h3>Example 1 - Textarea Character Map with Explanation Toggle</h3>

        <a href="/examples/usecallback/example1/problem" target="_blank">
          Example 1 without useCallback
        </a>

        <p>
          This example is the same as{" "}
          <a href="/examples/usememo/example1/solution" target="_blank">
            useMemo Example #1
          </a>{" "}
          except now a transformer function is passed down into the Character
          Map component
        </p>

        <pre>
          <code>
            {`
              function itemize(text: string, transformer: (item: string) => string ){
                const letters = text.split('')
                  .filter(l => l !== ' ')
                  .reduce((collection: {[key: string]: number}, item) => {
                    const letter = transformer ? transformer(item) : item;
                    return {
                      ...collection,
                      [letter]: (collection[letter] || 0) + 1
                    }
                  }, {})
                return Object.entries(letters)
                  .sort((a, b) => b[1] - a[1]);
              }
              
              function CharacterMap({ showExplanation, text, transformer }: { showExplanation: boolean, text: string, transformer: (item: string) => string }) {
                const characters = useMemo(() => itemize(text, transformer), [text, transformer]);
                
                return(
                  <div>
                    {showExplanation &&
                      <p>
                        This display a list of the most common characters.
                      </p>
                    }
              
                    Character Map:
                    {characters.map(character => (
                      <div key={character[0]}>
                        {character[0]}: {character[1]}
                      </div>
                    ))}
                  </div>
                )
              }
              
              export default memo(CharacterMap);
            `}
          </code>
        </pre>

        <p>
          You will find the pause returns when toggling the explanation, since
          the transformer function in the parent is being redeclared
        </p>

        <p>
          We can solve this issue with React <strong>useCallback</strong>
        </p>

        <a href="/examples/usecallback/example1/solution" target="_blank">
          Example 1 with useCallback
        </a>

        <pre>
          <code>
            {`
              const transformer = useCallback((item: string) => item.toLowerCase(), []);
            `}
          </code>
        </pre>

        <p>
          Try the same experiment with useCallback, and you will see the pause
          when toggling the explanation disappears. useCallback makes it so that
          a function is only redeclared when the dependencies change
        </p>
      </article>

      <article>
        <h3>Example 2 - Counter with Random Numbers</h3>

        <a href="/examples/usecallback/example2/problem" target="_blank">
          Example 2 without useCallback
        </a>

        <p>
          This example is the same as{" "}
          <a href="/examples/usememo/example2/solution" target="_blank">
            useMemo Example #2
          </a>{" "}
          except now there is no magic number and the random numbers have been
          made into their own component with the addRandom function passed down
          as a prop. Since you will no longer experience a pause for heavy
          calculations, you will have to resort to another strategy like console
          logging to see the unnecessary re-rendering
        </p>

        <pre>
          <code>
            {`
              export default function App() {
                const [nums, setNums] = useState<number[]>([]);
                const [count, setCount] = useState(1);
              
                const increaseCounter = () => {
                  setCount(count + 1);
                };
              
                const addRandom = () => {
                  let randNum = Math.random() * 1000;
                  setNums([...nums, randNum]);
                };
              
                return (
                  <div>
                    <div>
                      Count: {count} &nbsp;
                      <button onClick={increaseCounter}>+</button>
                    </div>
              
                    <hr />
              
                    <Numbers nums={nums} addRandom={addRandom} />
                  </div>
                );
              }
            `}
          </code>
        </pre>

        <p>
          You will find the Numbers component re-renders every time the counter
          increases, since the addRandom function is being redeclared when the
          state changes
        </p>

        <p>
          We can solve this issue with React <strong>useCallback</strong>
        </p>

        <a href="/examples/usecallback/example2/solution" target="_blank">
          Example 2 with useCallback
        </a>

        <pre>
          <code>
            {`
              const addRandom = useCallback(() => {
                let randNum = Math.random() * 1000;
                setNums([...nums, randNum]);
              }, [nums]);
            `}
          </code>
        </pre>

        <p>
          Try the same experiment with useCallback, and you will see the pause
          when adding random numbers disappears. useCallback makes it so that a
          function is only redeclared when the dependencies change
        </p>
      </article>

      <article>
        <h3>Example 3 - Counter with Megaboost</h3>

        <a href="/examples/usecallback/example3/problem" target="_blank">
          Example 3 without useCallback
        </a>

        <p>
          This example has a counter input with a Megaboost button that
          increases the count by a large amount
        </p>

        <pre>
          <code>
            {`
              function App() {
                const [count, setCount] = useState(0);
              
                function handleMegaBoost() {
                  setCount((currentValue) => currentValue + 1234);
                }
              
                return (
                  <>
                    Count: {count}
                    <button
                      onClick={() => {
                        setCount(count + 1)
                      }}
                    >
                      Click me!
                    </button>
                    
                    <MegaBoost handleClick={handleMegaBoost} />
                  </>
                );
              }
              
              export default App;
            `}
          </code>
        </pre>

        <p>
          You will find the Megaboost component re-renders every time the count
          changes because the handleMegaBoost function is redeclared every time
          the count state changes
        </p>

        <p>
          We can solve this issue with React <strong>useCallback</strong>
        </p>

        <a href="/examples/usecallback/example3/solution" target="_blank">
          Example 3 with useCallback
        </a>

        <pre>
          <code>
            {`
              const handleMegaBoost = useCallback(() => {
                setCount((currentValue) => currentValue + 1234);
              }, []);
            `}
          </code>
        </pre>

        <p>
          You will see the MegaBoost component no longer re-renders when the
          count changes. useCallback makes it so that the handleMegaBoost
          function is preserved between re-renders
        </p>
      </article>
    </section>
  );
}
