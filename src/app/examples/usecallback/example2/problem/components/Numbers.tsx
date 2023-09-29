import React, { memo, useMemo } from "react";

function Numbers({
  nums,
  addRandom,
}: {
  nums: number[];
  addRandom: () => void;
}) {
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
}

export default memo(Numbers);
