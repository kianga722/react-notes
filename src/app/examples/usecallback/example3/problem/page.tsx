import React from 'react';

import App from './components/App';

export const metadata = {
  title: "useCallback Example 3 - Without useCallback",
  description: "Example 3 of webapp with issues that can be solved with React useCallback",
};

function useCallbackExample3Problem() {
  return(
    <App />
  )
}

export default useCallbackExample3Problem;