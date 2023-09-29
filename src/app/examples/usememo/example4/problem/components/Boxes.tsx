import React, { memo } from 'react';

export type BoxType = {
    flex: number,
    background: string
}

function Boxes({ boxes }: {boxes: BoxType[]}) {
  console.log('render Boxes')

  return (
    <div className="boxes-wrapper">
      {boxes.map((boxStyles, index) => (
        <div
          key={index}
          className="box"
          style={boxStyles}
        />
      ))}
    </div>
  );
}

export default memo(Boxes);