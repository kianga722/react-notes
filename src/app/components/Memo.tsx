import styles from "../page.module.css";

export default function Memo() {
  return (
    <section>
      <h2 id="memo">memo</h2>

      <p className={styles.summary}>
        The React memo function is used to prevent re-renders on a component
        when a parent changes but the props on the child component do not change
      </p>

      <article>
        <h3>Example 1 - Textarea Character Map with Explanation Toggle</h3>

        <a href="/examples/memo/example1/problem" target="_blank">
          Example 1 without memo
        </a>

        <p>
          This example has a textarea input and a separate Character Map
          component that maps each character to the number of times it is used
          in the textarea. There is also a toggle that shows a small text
          explanation.
        </p>

        <pre>
          <code>
            {`
            export default function CharacterMap({ text }: { text: string }) {
              return(
                <div>
                  Character Map:
                  {itemize(text).map(character => (
                    <div key={character[0]}>
                      {character[0]}: {character[1]}
                    </div>
                  ))}
                </div>
              )
            }   
          `}
          </code>
        </pre>

        <p>
          For larger text entries, you can see the Character map takes longer to
          update due to the computations required
        </p>

        <p>
          Try pasting in a large text entry, and then typing a letter to see the
          pause before the Character map updates
        </p>

        <p>
          Try toggling the explanation when there is a large text entry, and you
          will experience a pause as well. We do not want this to happen because
          we are just toggling a small amount of text
        </p>

        <p>
          The issue is that React will re-render the entire component tree when
          the parent&apos;s state is changed by the toggle
        </p>

        <p>
          We can solve this issue with React <strong>memo</strong>
        </p>

        <a href="/examples/memo/example1/solution" target="_blank">
          Example 1 with memo
        </a>

        <pre>
          <code>
            {`
            function CharacterMap({ text }: { text: string }) {
              return(
                <div>
                  Character Map:
                  {itemize(text).map(character => (
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
          Try the same experiment with memo, and you will see the pause when
          toggling the explanation disappears. memo performs a shallow
          comparison of props and will only re-render the component when the
          props change
        </p>
      </article>

      <article>
        <h3>Example 2 - Prime Number Calculator with a Digital Clock</h3>

        <a href="/examples/memo/example2/problem" target="_blank">
          Example 2 without memo
        </a>

        <p>
          This example has a costly prime number calculation and a separate
          digital clock
        </p>

        <pre>
          <code>
            {`
            function App() {
              const [hydrated, setHydrated] = useState(false);
              const time = useTime();
            
              const backgroundColor = getBackgroundColorFromTime(time);
            
              useEffect(() => {
                setHydrated(true);
              }, []);
            
              if (!hydrated) {
                // Returns null on first render, so the client and server match
                return null;
              }
            
              return (
                <div style={{ backgroundColor }}>
                  <Clock time={time} />
                  <PrimeCalculator />
                </div>
              );
            }
            
            const getBackgroundColorFromTime = (time: Date) => {
              const hours = getHours(time);
              
              if (hours < 12) {
                // A light yellow for mornings
                return 'hsl(50deg 100% 90%)';
              } else if (hours < 18) {
                // Dull blue in the afternoon
                return 'hsl(220deg 60% 92%)'
              } else {
                // Deeper blue at night
                return 'hsl(220deg 100% 80%)';
              }
            }
            
            function useTime() {
              const [time, setTime] = useState(new Date());
              
              useEffect(() => {
                const intervalId = window.setInterval(() => {
                  setTime(new Date());
                }, 1000);
              
                return () => {
                  window.clearInterval(intervalId);
                }
              }, []);
              
              return time;
            }
            
            export default App;
          `}
          </code>
        </pre>

        <p>
          The issue is that React will re-do the costly prime calculation every
          time the digital clock updates
        </p>

        <p>
          We can solve this issue with React <strong>memo</strong>
        </p>

        <a href="/examples/memo/example2/solution" target="_blank">
          Example 2 with memo
        </a>

        <pre>
          <code>
            {`
            export default memo(PrimeCalculator); 
          `}
          </code>
        </pre>

        <p>
          The prime number calculator no longer re-renders on every tick of the
          digital clock. memo performs a shallow comparison of props and will
          re-render only when props change
        </p>
      </article>
    </section>
  );
}
