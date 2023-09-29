
import React, { memo, useMemo } from 'react';

// costly calculation
function itemize(text: string, transformer: (item: string) => string ){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection: {[key: string]: number}, item) => {
      const letter = transformer ? transformer(item) : item;
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return Object.entries(letters)
    .sort((a, b) => b[1] - a[1]);
}

function CharacterMap({ showExplanation, text, transformer }: { showExplanation: boolean, text: string, transformer: (item: string) => string }) {
  const characters = useMemo(() => itemize(text, transformer), [text, transformer]);
  
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }

      Character Map:
      {characters.map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

export default memo(CharacterMap);