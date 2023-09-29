'use client'

import { useState, memo } from "react";

const Numbers = memo(({ nums, addRandom }: { nums: number[], addRandom: () => void }) => {
  console.log("Numbers rendered");

  return (
    <div>
      <ul>
        {nums.map((num, i) => (
          <li key={i}>{num}</li>
        ))}
      </ul>
      <button onClick={addRandom}>Add random</button>
    </div>
  );
});

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