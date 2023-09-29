import { createContext, useMemo, useState } from "react";

export const CustomCtx = createContext<CustomCtxType | null>(null);

export type CustomCtxType = {
  name: string;
  counter: number;
  increment: () => void;
};

function ProviderWithMemo({ children }: { children: React.ReactElement }) {
  const [counter, setCounter] = useState(0);

  const value = useMemo(
    () => ({
      name: "ProviderWithMemo",
      counter,
      increment: () => setCounter((c) => c + 1),
    }),
    [counter]
  );

  return <CustomCtx.Provider value={value}>{children}</CustomCtx.Provider>;
}

export default ProviderWithMemo;
