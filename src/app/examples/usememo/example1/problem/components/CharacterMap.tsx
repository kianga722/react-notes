
import React, { memo } from 'react';

// costly calculation
function itemize(text: string){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection: {[key: string]: number}, item) => {
      const letter = item.toLowerCase();
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return Object.entries(letters)
    .sort((a, b) => b[1] - a[1]);
}

function CharacterMap({ showExplanation, text }: { showExplanation: boolean, text: string }) {
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }

      Character Map:
      {itemize(text).map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

export default memo(CharacterMap);