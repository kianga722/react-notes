'use client'

import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';

function App() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedNum, setSelectedNum] = useState(100);
  
  // `time` is a state variable that changes once per second,
  // so that it's always in sync with the current time.
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