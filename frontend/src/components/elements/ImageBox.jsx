
const ImageBox = ({ element, onDoubleClick, onContextMenu }) => {
    console.log(2222)
    return (
      <div
        className="absolute cursor-move"
        style={{
          left: `${element.position.x}%`,
          top: `${element.position.y}%`,
          width: `${element.size.width}%`,
          height: `${element.size.height}%`,
        }}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
      >
        <img
          src={element.imageUrl}
          alt={element.altText}
          className="w-full h-full object-contain"
        />
      </div>
    );
  };
  export default ImageBox