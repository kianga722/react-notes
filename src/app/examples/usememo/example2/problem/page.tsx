import React from 'react';

import App from './components/App';

export const metadata = {
  title: "useMemo Example 2 - Without useMemo",
  description: "Example 2 of webapp with issues that can be solved with React useMemo",
};

function useMemoExample2Problem() {
  return(
    <App />
  )
}

export default useMemoExample2Problem;