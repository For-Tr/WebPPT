import React from 'react';

const TextBox = ({ element, onDoubleClick, onContextMenu }) => {
  console.log(element)
  return (
    <div
      className={`
        bg-white
        border border-gray-200
      `}
      style={{
        width: `100%`,
        height: element.size.height,
      }}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <div
        className="p-2 text-left"
        style={{
          fontSize: `${element.fontSize}em`,
          color: element.color,
        }}
      >
        {element.text}
      </div>
    </div>
  );
};

export default TextBox