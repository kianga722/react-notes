import React from "react";

import App from "./components/App";

export const metadata = {
  title: "useMemo Example 1 - Without useMemo",
  description:
    "Example 1 of webapp with issues that can be solved with React useMemo",
};

function useMemoExample1Problem() {
  return <App />;
}

export default useMemoExample1Problem;
