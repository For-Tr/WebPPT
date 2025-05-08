

const VideoBox = ({ element, onDoubleClick, onContextMenu }) => {
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
  