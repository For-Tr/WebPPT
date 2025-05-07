import React from 'react';

const TextBox = ({ element, onDoubleClick, onContextMenu }) => {
  console.log(element)
  return (
    <div
      className={`
        absolute cursor-move bg-white
        border border-gray-200
      `}
      style={{
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        width: `${element.size.width}%`,
        height: `${element.size.height}%`,
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