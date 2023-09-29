import styles from "../page.module.css";

export default function Usememo() {
  return (
    <section>
      <h2 id="usememo">useMemo</h2>

      <p className={styles.summary}>
        The React useMemo function is used to avoid repeatedly performing
        potentially costly calculations
      </p>

      <article>
        <h3>Example 1 - Textarea Character Map with Explanation Toggle</h3>

        <a href="/examples/usememo/example1/problem" target="_blank">
          Example 1 without useMemo
        </a>

        <p>
          This example is the same as{" "}
          <a href="/examples/memo/example1/solution" target="_blank">
            Memo Example #1
          </a>{" "}
          except the explanation toggle is now passed down into the Character
          Map component
        </p>

        <pre>
          <code>
            {`
              export default function CharacterMap({ showExplanation, text }: { showExplanation: boolean, text: string }) {
                return(
                  <div>
                    {showExplanation &&
                      <p>
                        This display a list of the most common characters.
                      </p>
                    }
              
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
          React memo no longer solves the issue since the props of Character Map
          are changing across re-renders
        </p>

        <p>
          We can solve this issue with React <strong>useMemo</strong>
        </p>

        <a href="/examples/usememo/example1/solution" target="_blank">
          Example 1 with useMemo
        </a>

        <pre>
          <code>
            {`
                        const characters = useMemo(() => itemize(text), [text]); 
                    `}
          </code>
        </pre>

        <p>
          Try the same experiment with useMemo, and you will see the pause when
          toggling the explanation disappears. useMemo makes it so that a
          function runs only when the dependencies change
        </p>
      </article>

      <article>
        <h3>Example 2 - Counter with Magic Number and Random Numbers</h3>

        <a href="/examples/usememo/example2/problem" target="_blank">
          Example 2 without memo
        </a>

        <p>
          This example has a costly magic number calculation that is dependent
          on a incremental counter. There is also a separate random number
          generator
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
              
                const magicNum = calculateMagicNumber(count);
              
                return (
                  <div>
                    <div>
                      Counter: {count} | Magic number: {magicNum} &nbsp;
                      <button onClick={increaseCounter}>+</button>
                    </div>
              
                    <hr />
              
                    <div>
                      <ul>
                        {nums.map((num, i) => (
                          <li key={i}>{num}</li>
                        ))}
                      </ul>
                      <button onClick={addRandom}>Add random</button>
                    </div>
                  </div>
                );
              }
              
              // Costly calculation
              function calculateMagicNumber(n: number) {
                console.log("Costly calculation triggered.");
                let num = 1;
                for (let i = 0; i < n + 1000000000; i++) {
                  num += 123000;
                }
                return num - num * 0.22;
              }
            `}
          </code>
        </pre>

        <p>
          You will experience a pause when you try increasing the counter or try
          adding a random number. We can remove the pause from adding a random
          number, since it is separate functionality
        </p>

        <p>
          The issue is that React will re-do the costly calculation when the
          component&apos;s state is changed by adding a random number
        </p>

        <p>
          We can solve this issue with React <strong>useMemo</strong>
        </p>

        <a href="/examples/usememo/example2/solution" target="_blank">
          Example 2 with useMemo
        </a>

        <pre>
          <code>
            {`
              const magicNum = useMemo(() => calculateMagicNumber(count), [count]); 
            `}
          </code>
        </pre>

        <p>
          Try the same experiment with useMemo, and you will see the pause when
          adding random numbers disappears. useMemo only runs the costly magic
          number function if the count dependency changes
        </p>
      </article>

      <article>
        <h3>Example 3 - Prime Number Calculator with a Digital Clock</h3>

        <a href="/examples/usememo/example3/problem" target="_blank">
          Example 3 without memo
        </a>

        <p>
          This example is the same as{" "}
          <a href="/examples/memo/example2/solution" target="_blank">
            memo Example #2
          </a>{" "}
          except that all the component logic is inside of the App component
          instead of separate components.
        </p>

        <pre>
          <code>
            {`
              function App() {
                const [hydrated, setHydrated] = useState(false);
                const [selectedNum, setSelectedNum] = useState(100);
                
                const time = useTime();
                
                // Calculate all of the prime numbers.
                // (Unchanged from the earlier example.)
                const allPrimes = [];
                for (let counter = 2; counter < selectedNum; counter++) {
                  console.log('finding primes')
              
                  if (isPrime(counter)) {
                    allPrimes.push(counter);
                  }
                }
              
                useEffect(() => {
                  setHydrated(true);
                }, []);
              
                if (!hydrated) {
                  // Returns null on first render, so the client and server match
                  return null;
                }
                
                return (
                  <>
                    <p className="clock">
                      {format(time, 'hh:mm:ss a')}
                    </p>
                    <form>
                      <label htmlFor="num">Your number:</label>
                      <input
                        type="number"
                        value={selectedNum}
                        onChange={(event) => {
                          // To prevent computers from exploding,
                          // we'll max out at 100k
                          let num = Math.min(100_000, Number(event.target.value));
                          
                          setSelectedNum(num);
                        }}
                      />
                    </form>
                    <p>
                      There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
                      {' '}
                      <span className="prime-list">
                        {allPrimes.join(', ')}
                      </span>
                    </p>
                  </>
                );
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
              
              function isPrime(n: number){
                const max = Math.ceil(Math.sqrt(n));
                
                if (n === 2) {
                  return true;
                }
                
                for (let counter = 2; counter <= max; counter++) {
                  if (n % counter === 0) {
                    return false;
                  }
                }
              
                return true;
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
          We can solve this issue with React <strong>useMemo</strong>
        </p>

        <a href="/examples/usememo/example3/solution" target="_blank">
          Example 3 with useMemo
        </a>

        <pre>
          <code>
            {`
              const allPrimes = useMemo(() => {
                console.log('finding primes')
            
                const result = [];
                for (let counter = 2; counter < selectedNum; counter++) {
                  if (isPrime(counter)) {
                    result.push(counter);
                  }
                }
                return result;
              }, [selectedNum]);
            `}
          </code>
        </pre>

        <p>
          Every tick of the digital clock no longer causes the prime number
          calculation to run. useMemo only runs the costly prime number function
          now if the number input is changed.
        </p>
      </article>

      <article>
        <h3>Example 4 - Boxes</h3>

        <a href="/examples/usememo/example4/problem" target="_blank">
          Example 4 without useMemo
        </a>

        <p>
          This example has a Boxes display component and a separate text input
        </p>

        <pre>
          <code>
            {`
              function App() {
                const [name, setName] = useState('');
                const [boxWidth, setBoxWidth] = useState(1);
                
                const id = useId();
                
                // Try changing some of these values!
                const boxes = [
                  { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
                  { flex: 3, background: 'hsl(260deg 100% 40%)' },
                  { flex: 1, background: 'hsl(50deg 100% 60%)' },
                ];
                
                return (
                  <>
                    <Boxes boxes={boxes} />
                    
                    <section>


                      ...text input component


                    </section>
                  </>
                );
              }
              
              export default App;                  
            `}
          </code>
        </pre>

        <p>
          You will find that the Boxes component re-renders every time the text
          input is changed. This is because the box array is being redeclared
          everytime the name state changes
        </p>

        <p>
          We can solve this issue with React <strong>useMemo</strong>
        </p>

        <a href="/examples/usememo/example4/solution" target="_blank">
          Example 4 with useMemo
        </a>

        <pre>
          <code>
            {`
              const boxes = useMemo(() => {
                return [
                  { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
                  { flex: 3, background: 'hsl(260deg 100% 40%)' },
                  { flex: 1, background: 'hsl(50deg 100% 60%)' },
                ];
              }, [boxWidth]);
            `}
          </code>
        </pre>

        <p>
          Using useMemo, we are preserving the reference to the boxes array
          across re-renders so now when the state changes, the Boxes component
          does not re-render.
        </p>
      </article>
    </section>
  );
}
