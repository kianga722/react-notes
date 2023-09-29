'use client'

import React, { useReducer, useState } from 'react';

import CharacterMap from './CharacterMap';

function App() {
  const [text, setText] = useState('');
  const [showExplanation, toggleExplanation] = useReducer(state => !state, false)

  return(
    <div className="wrapper">
      <label htmlFor="text">
        <p>Your Text</p>
        <textarea
          id="text"
          name="text"
          rows={10}
          cols={100}
          onChange={event => setText(event.target.value)}
        >
        </textarea>
      </label>


      <div>
        <button onClick={toggleExplanation}>Show Explanation</button>
      </div>


      <CharacterMap showExplanation={showExplanation} text={text} />
    </div>
  )
}

export default App;