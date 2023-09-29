import React from 'react';

import App from './components/App';

export const metadata = {
  title: "useCallback Example 2 - Without useCallback",
  description: "Example 2 of webapp with issues that can be solved with React useCallback",
};

function useCallbackExample2Problem() {
  return(
    <App />
  )
}

export default useCallbackExample2Problem;