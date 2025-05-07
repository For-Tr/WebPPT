import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBox = ({ element, onDoubleClick, onContextMenu }) => {
  return (
    <div
      className="absolute cursor-move"
      style={{
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        width: `${element.size.width}%`,
        height: `${element.size.height}%`,
        fontSize: `${element.fontSize}em`,
      }}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <SyntaxHighlighter
        language={element.language}
        style={dracula}
        className="h-full overflow-auto"
      >
        {element.code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBox