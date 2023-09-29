"use client";

import { useState } from "react";
import "../styles.css";

import ProviderWithoutMemo, {
  CustomCtx as CtxWithoutMemo,
} from "./ProviderWithoutMemo";

import ProviderWithMemo, { CustomCtx as CtxWithMemo } from "./ProviderWithMemo";

import Child from "./Child";

export default function App() {
  const [, forceRender] = useState({});

  return (
    <div className="App">
      <ProviderWithoutMemo>
        <Child ctx={CtxWithoutMemo} />
      </ProviderWithoutMemo>

      <ProviderWithMemo>
        <Child ctx={CtxWithMemo} />
      </ProviderWithMemo>

      <button onClick={() => forceRender({})}>Rerender Parent</button>
    </div>
  );
}
