'use client'

import { useState } from "react";

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