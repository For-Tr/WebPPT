
const ImageBox = ({ element, onDoubleClick, onContextMenu }) => {
    console.log(2222)
    return (
      <div
        className=""
        style={{
          width: `100%`,
          height: element.size.height,
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