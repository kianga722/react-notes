import { useContext, memo } from "react";

export type CustomCtxType = {
    name: string;
    counter: number,
    increment: () => void
};

function Child({ ctx } : { ctx: React.Context<CustomCtxType | null> }) {
  const { counter, name, increment } = useContext(ctx) as CustomCtxType;

  console.log("child of", name);
  return (
    <div className="box">
      <p>Child of {counter}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default memo(Child);
