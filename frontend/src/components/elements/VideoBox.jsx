

const VideoBox = ({ element, onDoubleClick, onContextMenu }) => {
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
        <iframe
          className="w-full h-full"
          src={element.videoUrl}
          allow={element.autoplay ? "autoplay" : ""}
          allowFullScreen
        />
      </div>
    );
  };

  export default VideoBox
  