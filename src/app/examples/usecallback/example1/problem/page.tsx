import React from 'react';

import App from './components/App';

export const metadata = {
  title: "useCallback Example 1 - Without useCallback",
  description: "Example 1 of webapp with issues that can be solved with React useCallback",
};

function useCallbackExample1Problem() {
  return(
    <App />
  )
}

export default useCallbackExample1Problem;