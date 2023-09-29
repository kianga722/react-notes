import React, { memo } from 'react';

function MegaBoost({ handleClick }: { handleClick: () => void }) {
  console.log('Render MegaBoost');
  
  return (
    <button
      className="mega-boost-button"
      onClick={handleClick}
    >
      MEGA BOOST!
    </button>
  );
}

export default memo(MegaBoost);