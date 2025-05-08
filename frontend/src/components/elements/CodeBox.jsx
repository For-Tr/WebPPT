import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBox = ({ element, onDoubleClick, onContextMenu }) => {
  return (
    <div
      className=""
      style={{
        width: `100%`,
        height: element.size.height,
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