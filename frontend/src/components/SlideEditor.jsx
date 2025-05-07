import { useState } from "react";
import ElementModal from './modals/ElementModal'
import ElementService from '../services/ElementServices';
import TextBox from "./elements/TextBox";
import ImageBox from "./elements/ImageBox";
import VideoBox from "./elements/VideoBox";
import CodeBox from "./elements/CodeBox";

const SlideEditor = ({ slide, onUpdate }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('text');

  return (
    <div className="relative w-full h-full">
      {/* Elements */}
      {slide.elements?.map(element => {
        // 将 key 从 props 中移除，其他属性保持不变
        const props = {
          element,
          onDoubleClick: () => {
            setSelectedElement(element);
            setModalType(element.type);
            setShowModal(true);
          },
          onContextMenu: (e) => {
            e.preventDefault();
            onUpdate({
              ...slide,
              elements: slide.elements.filter(el => el.id !== element.id)
            });
          }
        };

        console.log(1111111)
        console.log(element)
        switch (element.type) {
          case 'text': return <TextBox key={element.id} {...props} />;
          case 'image': return <ImageBox key={element.id} {...props} />;
          case 'video': return <VideoBox key={element.id} {...props} />;
          case 'code': return <CodeBox key={element.id} {...props} />;
          default: return null;
        }
      })}


      <div className="absolute top-4 right-4">
        <div className="bg-white bg-opacity-90 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setModalType('text');
                setShowModal(true);
              }}
              className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              title="Add Text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15h2m4 0h2M9 11h6" />
              </svg>
              <span className="sr-only">Add Text</span>
            </button>

            <button
              onClick={() => {
                setModalType('image');
                setShowModal(true);
              }}
              className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              title="Add Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="sr-only">Add Image</span>
            </button>

            <button
              onClick={() => {
                setModalType('video');
                setShowModal(true);
              }}
              className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              title="Add Video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="sr-only">Add Video</span>
            </button>

            <button
              onClick={() => {
                setModalType('code');
                setShowModal(true);
              }}
              className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              title="Add Code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="sr-only">Add Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ElementModal
        isOpen={showModal}
        type={modalType}
        onSave={(data) => {
          const newElement = ElementService.createElement(modalType, data);
          onUpdate({
            ...slide,
            elements: [...(slide.elements || []), newElement]
          });
          setShowModal(false);
        }}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SlideEditor;