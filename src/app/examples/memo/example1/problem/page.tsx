import React from 'react';

import App from './components/App';

export const metadata = {
  title: "Memo Example 1 - Without memo",
  description: "Example 1 of webapp with issues that can be solved with React memo",
};

function MemoExample1Problem() {
  return(
    <App />
  )
}

export default MemoExample1Problem;