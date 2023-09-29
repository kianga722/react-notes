import { createContext, useState } from "react";

export const CustomCtx = createContext<CustomCtxType | null>(null);

export type CustomCtxType = {
    name: string;
    counter: number,
    increment: () => void
};

function ProviderWithoutMemo({ children }: { children: React.ReactElement }) {
  const [counter, setCounter] = useState(0);

  const value = {
    name: "ProviderWithoutMemo",
    counter,
    increment: () => setCounter((c) => c + 1)
  };

  return <CustomCtx.Provider value={value}>{children}</CustomCtx.Provider>;
}

export default ProviderWithoutMemo;
