'use client'

import React, { useState, useCallback } from 'react';

import MegaBoost from './MegaBoost';

function App() {
  const [count, setCount] = useState(0);

  const handleMegaBoost = useCallback(() => {
    setCount((currentValue) => currentValue + 1234);
  }, []);

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