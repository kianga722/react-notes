"use client";

import { useState, useCallback } from "react";

import Numbers from "./Numbers";

export default function App() {
  const [nums, setNums] = useState<number[]>([]);
  const [count, setCount] = useState(1);

  const increaseCounter = () => {
    setCount(count + 1);
  };

  const addRandom = useCallback(() => {
    let randNum = Math.random() * 1000;
    setNums([...nums, randNum]);
  }, [nums]);

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
